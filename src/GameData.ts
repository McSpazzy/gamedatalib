import { KNOWN_STRUCT_TYPES, StructMetadata, StructType, STRUCT_TYPE_METADATA, Struct } from "./Types";
import { StructEntry } from "./StructEntry";
import { ParseError } from "./ParseError";
import { BaseGameData } from "./BaseGameData";
import "./prototypes";

export class GameData extends BaseGameData {
  #dataBuffer: ArrayBufferLike;
  #dataView: DataView;
  constructor() {
    super();
    this.#dataBuffer = new ArrayBuffer();
    this.#dataView = new DataView(this.#dataBuffer);
  }

  public static toArrayBuffer(gameData: GameData): ArrayBufferLike {
    return gameData.#dataView.buffer;
  }

  public static fromArrayBuffer(buffer: ArrayBufferLike): GameData {
    const gameData = new GameData();
    gameData.#dataBuffer = buffer;
    gameData.#dataView = new DataView(buffer);

    if (gameData.#dataView.byteLength < 0x20) {
      throw new ParseError("Invalid file. Too Small.");
    }

    if (gameData.#dataView.getUint32(0, true) !== 0x01020304) {
      throw new Error("Invalid File. Magic Mismatch.");
    }

    const dataOffset = gameData.#dataView.getUint32(0x8, true);

    if (dataOffset < 0x20 || dataOffset > gameData.#dataView.byteLength) {
      throw new ParseError(`Invalid File: dataOffset out of bounds (${dataOffset})`);
    }
    if (dataOffset % 4 !== 0) {
      throw new ParseError("Invalid File: dataOffset must be 4-byte aligned");
    }

    let offset = 0x20;

    let currentStruct: StructType | null = StructType.Bool;
    let currentSection: Record<number, StructEntry<StructType>> | null = null;
    let currentStructType: StructMetadata | null = null;
    let skippingUnknownSection = false;

    while (offset + 8 <= dataOffset) {
      const hashKey = gameData.#dataView.getUint32(offset, true);
      const hashOffset = offset + 4;
      const hashObjectValue = gameData.#dataView.getUint32(hashOffset, true);

      offset += 8;

      if (hashKey === 0) {
        currentStruct = hashObjectValue as StructType;
        currentStructType = STRUCT_TYPE_METADATA[currentStruct];

        if (!KNOWN_STRUCT_TYPES.has(currentStruct)) {
          currentSection = null;
          skippingUnknownSection = true;
          continue;
        }

        skippingUnknownSection = false;
        currentSection = gameData[currentStructType.section] as Record<number, StructEntry<StructType>>;
        continue;
      }

      if (skippingUnknownSection || currentStruct === null || currentSection === null || currentStructType === null) {
        continue;
      }

      const entryOffset = currentStructType.storage === "value" ? hashOffset : hashObjectValue;
      currentSection[hashKey] = new StructEntry(gameData.#dataView, currentStruct, hashKey, entryOffset);
    }

    if (offset !== dataOffset) {
      throw new ParseError("Invalid File: incomplete struct entry at end");
    }

    return gameData;
  }
}
