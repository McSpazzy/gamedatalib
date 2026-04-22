import { Struct, StructType, StructPayloadByType, ScalarStructType, ArrayStructType } from "./Types";
import { StructEntry } from "./StructEntry";
import { scalarCodecs, arrayCodecs } from "./Codecs";

const scratchDataView = new DataView(new ArrayBuffer(1024));

export class GameDataRecord<T extends Struct<StructType>, TType extends StructType> {
  #structType: TType;

  constructor(structType: TType) {
    this.#structType = structType;
  }

  [hash: number]: T;

  public addNew(hash: number, value?: StructPayloadByType<TType>): T {
    const entry = new StructEntry(scratchDataView, this.#structType, hash, 0) as unknown as T;

    if (scalarCodecs[this.#structType as ScalarStructType]) {
      (entry as any).value = value;
    }
    if (arrayCodecs[this.#structType as ArrayStructType]) {
      (entry as any).values = value;
    }

    this[hash] = entry;
    return entry;
  }
}

export class BaseGameData {
  Bool: GameDataRecord<Struct<StructType.Bool>, StructType.Bool> = new GameDataRecord(StructType.Bool);
  BoolArray: GameDataRecord<Struct<StructType.BoolArray>, StructType.BoolArray> = new GameDataRecord(StructType.BoolArray);
  Int: GameDataRecord<Struct<StructType.Int>, StructType.Int> = new GameDataRecord(StructType.Int);
  IntArray: GameDataRecord<Struct<StructType.IntArray>, StructType.IntArray> = new GameDataRecord(StructType.IntArray);
  Float: GameDataRecord<Struct<StructType.Float>, StructType.Float> = new GameDataRecord(StructType.Float);
  FloatArray: GameDataRecord<Struct<StructType.FloatArray>, StructType.FloatArray> = new GameDataRecord(StructType.FloatArray);
  Enum: GameDataRecord<Struct<StructType.Enum>, StructType.Enum> = new GameDataRecord(StructType.Enum);
  EnumArray: GameDataRecord<Struct<StructType.EnumArray>, StructType.EnumArray> = new GameDataRecord(StructType.EnumArray);
  Vector2: GameDataRecord<Struct<StructType.Vector2>, StructType.Vector2> = new GameDataRecord(StructType.Vector2);
  Vector2Array: GameDataRecord<Struct<StructType.Vector2Array>, StructType.Vector2Array> = new GameDataRecord(StructType.Vector2Array);
  Vector3: GameDataRecord<Struct<StructType.Vector3>, StructType.Vector3> = new GameDataRecord(StructType.Vector3);
  Vector3Array: GameDataRecord<Struct<StructType.Vector3Array>, StructType.Vector3Array> = new GameDataRecord(StructType.Vector3Array);
  String16: GameDataRecord<Struct<StructType.String16>, StructType.String16> = new GameDataRecord(StructType.String16);
  String16Array: GameDataRecord<Struct<StructType.String16Array>, StructType.String16Array> = new GameDataRecord(StructType.String16Array);
  String32: GameDataRecord<Struct<StructType.String32>, StructType.String32> = new GameDataRecord(StructType.String32);
  String32Array: GameDataRecord<Struct<StructType.String32Array>, StructType.String32Array> = new GameDataRecord(StructType.String32Array);
  String64: GameDataRecord<Struct<StructType.String64>, StructType.String64> = new GameDataRecord(StructType.String64);
  String64Array: GameDataRecord<Struct<StructType.String64Array>, StructType.String64Array> = new GameDataRecord(StructType.String64Array);
  Binary: GameDataRecord<Struct<StructType.Binary>, StructType.Binary> = new GameDataRecord(StructType.Binary);
  BinaryArray: GameDataRecord<Struct<StructType.BinaryArray>, StructType.BinaryArray> = new GameDataRecord(StructType.BinaryArray);
  UInt: GameDataRecord<Struct<StructType.UInt>, StructType.UInt> = new GameDataRecord(StructType.UInt);
  UIntArray: GameDataRecord<Struct<StructType.UIntArray>, StructType.UIntArray> = new GameDataRecord(StructType.UIntArray);
  Int64: GameDataRecord<Struct<StructType.Int64>, StructType.Int64> = new GameDataRecord(StructType.Int64);
  Int64Array: GameDataRecord<Struct<StructType.Int64Array>, StructType.Int64Array> = new GameDataRecord(StructType.Int64Array);
  UInt64: GameDataRecord<Struct<StructType.UInt64>, StructType.UInt64> = new GameDataRecord(StructType.UInt64);
  UInt64Array: GameDataRecord<Struct<StructType.UInt64Array>, StructType.UInt64Array> = new GameDataRecord(StructType.UInt64Array);
  WString16: GameDataRecord<Struct<StructType.WString16>, StructType.WString16> = new GameDataRecord(StructType.WString16);
  WString16Array: GameDataRecord<Struct<StructType.WString16Array>, StructType.WString16Array> = new GameDataRecord(StructType.WString16Array);
  WString32: GameDataRecord<Struct<StructType.WString32>, StructType.WString32> = new GameDataRecord(StructType.WString32);
  WString32Array: GameDataRecord<Struct<StructType.WString32Array>, StructType.WString32Array> = new GameDataRecord(StructType.WString32Array);
  WString64: GameDataRecord<Struct<StructType.WString64>, StructType.WString64> = new GameDataRecord(StructType.WString64);
  WString64Array: GameDataRecord<Struct<StructType.WString64Array>, StructType.WString64Array> = new GameDataRecord(StructType.WString64Array);
  Bool64bitKey: GameDataRecord<Struct<StructType.Bool64bitKey>, StructType.Bool64bitKey> = new GameDataRecord(StructType.Bool64bitKey);
}
