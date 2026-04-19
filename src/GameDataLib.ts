import { createEmptyParsedGameData, KNOWN_STRUCT_TYPES, ParsedGameData, StructMetadata, StructType, STRUCT_TYPE_METADATA } from "./Types";
import { StructEntry } from "./StructEntry";
import { ParseError } from "./ParseError";
import "./prototypes";

export class GameDataLib {
  public static fromArrayBuffer(buffer: ArrayBufferLike): ParsedGameData {
    const data = new DataView(buffer);

    if (data.byteLength < 0x20) {
      throw new ParseError("Invalid file. Too Small.");
    }

    if (data.getUint32(0, true) !== 0x01020304) {
      throw new Error("Invalid File. Magic Mismatch.");
    }

    const dataOffset = data.getUint32(0x8, true);

    if (dataOffset < 0x20 || dataOffset > data.byteLength) {
      throw new ParseError(`Invalid File: dataOffset out of bounds (${dataOffset})`);
    }
    if (dataOffset % 4 !== 0) {
      throw new ParseError("Invalid File: dataOffset must be 4-byte aligned");
    }

    let offset = 0x20;
    const gameData = createEmptyParsedGameData();
    let currentStruct: StructType | null = StructType.Bool;
    let currentSection: Record<number, StructEntry<StructType>> | null = null;
    let currentStructType: StructMetadata | null = null;
    let skippingUnknownSection = false;

    while (offset + 8 <= dataOffset) {
      const hashKey = data.getUint32(offset, true);
      const hashOffset = offset + 4;
      const hashObjectValue = data.getUint32(hashOffset, true);

      offset += 8;

      if (hashKey === 0) {
        const sectionType = hashObjectValue as StructType;
        currentStruct = sectionType;
        currentStructType = STRUCT_TYPE_METADATA[currentStruct];

        if (!KNOWN_STRUCT_TYPES.has(sectionType)) {
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
      currentSection[hashKey] = new StructEntry(data, currentStruct, hashKey, entryOffset);
    }

    if (offset !== dataOffset) {
      throw new ParseError("Invalid File: incomplete struct entry at end");
    }

    return gameData;
  }


}

