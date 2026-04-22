import { KNOWN_STRUCT_TYPES, Struct, StructMetadata, StructType, STRUCT_TYPE_METADATA } from "./Types";
import { StructEntry } from "./StructEntry";
import { ParseError } from "./ParseError";
import { BaseGameData } from "./BaseGameData";
import { arrayCodecs, scalarCodecs } from "./Codecs";
import "./prototypes";

export class GameData extends BaseGameData {
  #parsedByteLength: number | undefined;
  version: number = 0;

  constructor(version: number = 1) {
    super();
    this.version = version;
  }

  public static toArrayBuffer(gameData: GameData): ArrayBufferLike {
    const structTypes = Object.keys(STRUCT_TYPE_METADATA)
      .map((type) => Number(type))
      .filter((type) => Number.isFinite(type))
      .sort((left, right) => left - right) as StructType[];

    const entriesPerStruct = new Map<StructType, [number, Struct<StructType>][]>();
    let indexEntryCount = 0;
    let dataSize = 0;

    for (const type of structTypes) {
      const metadata = STRUCT_TYPE_METADATA[type];
      const section = gameData[metadata.section] as unknown as Record<number, Struct<StructType>>;
      const entries = Object.keys(section)
        .map((key) => Number(key))
        .filter((key) => Number.isFinite(key))
        .map((hash) => [hash, section[hash]] as [number, Struct<StructType>]);

      entries.sort((left, right) => {
        const leftIndex = (left[1] as StructEntry<StructType>).readIndex;
        const rightIndex = (right[1] as StructEntry<StructType>).readIndex;
        if (leftIndex === undefined && rightIndex === undefined) {
          return 0;
        }
        if (leftIndex === undefined) {
          return 1;
        }
        if (rightIndex === undefined) {
          return -1;
        }
        return leftIndex - rightIndex;
      });

      entriesPerStruct.set(type, entries);
      indexEntryCount += 1 + entries.length;

      if (metadata.storage === "offset") {
        for (const [, entry] of entries) {
          if (type === StructType.Bool64bitKey) {
            const values = (entry as any).values as unknown as bigint[] | undefined;
            if (values?.length === 0) {
              continue;
            }
          }

          dataSize += entry.getSize();
        }
      }
    }

    const indexSize = indexEntryCount * 8;
    const headerSize = 0x20;
    const dataOffset = headerSize + indexSize;
    const baseLength = dataOffset + dataSize;
    const buffer = new ArrayBuffer(baseLength);
    const view = new DataView(buffer);

    view.setUint32(0, 0x01020304, true);
    view.setUint32(4, gameData.version, true);

    view.setUint32(0x8, dataOffset, true);

    let indexCursor = headerSize;
    let dataCursor = dataOffset;

    for (const type of structTypes) {
      const metadata = STRUCT_TYPE_METADATA[type];
      const entries = entriesPerStruct.get(type) ?? [];

      view.setUint32(indexCursor, 0, true);
      view.setUint32(indexCursor + 4, type, true);
      indexCursor += 8;

      for (const [hash, entry] of entries) {
        view.setUint32(indexCursor, hash, true);

        const scalarCodec = scalarCodecs[type as never] as
          | {
              write(view: DataView, offset: number, value: unknown): void;
            }
          | undefined;
        const arrayCodec = arrayCodecs[type as never] as
          | {
              write(view: DataView, offset: number, value: unknown): void;
            }
          | undefined;

        if (scalarCodec) {
          if (metadata.storage === "offset") {
            view.setUint32(indexCursor + 4, dataCursor, true);
            scalarCodec.write(view, dataCursor, (entry as any).value);
            dataCursor += entry.getSize();
          } else {
            scalarCodec.write(view, indexCursor + 4, (entry as any).value);
          }
        } else if (arrayCodec) {
          const codec = arrayCodecs[type as never] as
            | {
                write(view: DataView, offset: number, value: unknown): void;
              }
            | undefined;
          if (!codec) {
            throw new Error(`Missing array codec for struct type: ${type}`);
          }

          if (type === StructType.Bool64bitKey) {
            const values = (entry as any).values as unknown as bigint[] | undefined;
            if (!values || values.length === 0) {
              view.setUint32(indexCursor + 4, 0, true);
              indexCursor += 8;
              continue;
            }
          }

          view.setUint32(indexCursor + 4, dataCursor, true);
          codec.write(view, dataCursor, (entry as any).values);
          dataCursor += entry.getSize();
        } else {
          throw new Error(`Missing codec for struct type: ${type}`);
        }

        indexCursor += 8;
      }
    }

    if (gameData.#parsedByteLength !== undefined && gameData.#parsedByteLength > baseLength) {
      const padded = new ArrayBuffer(gameData.#parsedByteLength);
      const out = new Uint8Array(padded);
      out.set(new Uint8Array(buffer), 0);
      return padded;
    }

    return buffer;
  }

  public static fromArrayBuffer(buffer: ArrayBufferLike): GameData {
    const gameData = new GameData();
    const view = new DataView(buffer);
    gameData.#parsedByteLength = view.byteLength;

    if (view.byteLength < 0x20) {
      throw new ParseError("Invalid file. Too Small.");
    }

    if (view.getUint32(0, true) !== 0x01020304) {
      throw new Error("Invalid File. Magic Mismatch.");
    }

    const version = view.getUint32(4, true);
    gameData.version = version;

    const dataOffset = view.getUint32(0x8, true);

    if (dataOffset < 0x20 || dataOffset > view.byteLength) {
      throw new ParseError(`Invalid File: dataOffset out of bounds (${dataOffset})`);
    }
    if (dataOffset % 4 !== 0) {
      throw new ParseError("Invalid File: dataOffset must be 4-byte aligned");
    }

    let offset = 0x20;

    let currentStruct: StructType | null = StructType.Bool;
    let currentSection: Record<number, Struct<StructType>> | null = null;
    let currentStructType: StructMetadata | null = null;
    let skippingUnknownSection = false;
    let currentReadIndex = 0;

    while (offset + 8 <= dataOffset) {
      const hashKey = view.getUint32(offset, true);
      const hashOffset = offset + 4;
      const hashObjectValue = view.getUint32(hashOffset, true);

      offset += 8;

      if (hashKey === 0) {
        currentStruct = hashObjectValue as StructType;
        currentStructType = STRUCT_TYPE_METADATA[currentStruct];

        if (!KNOWN_STRUCT_TYPES.has(currentStruct)) {
          currentSection = null;
          skippingUnknownSection = true;
          currentReadIndex = 0;
          continue;
        }

        skippingUnknownSection = false;
        currentSection = gameData[currentStructType.section] as unknown as Record<number, Struct<StructType>>;
        currentReadIndex = 0;
        continue;
      }

      if (skippingUnknownSection || currentStruct === null || currentSection === null || currentStructType === null) {
        continue;
      }

      const entryOffset = currentStructType.storage === "value" ? hashOffset : hashObjectValue;
      currentSection[hashKey] = new StructEntry(view, currentStruct, hashKey, entryOffset, currentReadIndex) as unknown as Struct<StructType>;
      currentReadIndex += 1;
    }

    if (offset !== dataOffset) {
      throw new ParseError("Invalid File: incomplete struct entry at end");
    }

    return gameData;
  }
}
