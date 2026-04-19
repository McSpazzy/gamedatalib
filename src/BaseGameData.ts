import { Struct, StructType } from "./Types";

export class BaseGameData {
  Bool: Record<number, Struct<StructType.Bool>> = {};
  BoolArray: Record<number, Struct<StructType.BoolArray>> = {};
  Int: Record<number, Struct<StructType.Int>> = {};
  IntArray: Record<number, Struct<StructType.IntArray>> = {};
  Float: Record<number, Struct<StructType.Float>> = {};
  FloatArray: Record<number, Struct<StructType.FloatArray>> = {};
  Enum: Record<number, Struct<StructType.Enum>> = {};
  EnumArray: Record<number, Struct<StructType.EnumArray>> = {};
  Vector2: Record<number, Struct<StructType.Vector2>> = {};
  Vector2Array: Record<number, Struct<StructType.Vector2Array>> = {};
  Vector3: Record<number, Struct<StructType.Vector3>> = {};
  Vector3Array: Record<number, Struct<StructType.Vector3Array>> = {};
  String16: Record<number, Struct<StructType.String16>> = {};
  String16Array: Record<number, Struct<StructType.String16Array>> = {};
  String32: Record<number, Struct<StructType.String32>> = {};
  String32Array: Record<number, Struct<StructType.String32Array>> = {};
  String64: Record<number, Struct<StructType.String64>> = {};
  String64Array: Record<number, Struct<StructType.String64Array>> = {};
  Binary: Record<number, Struct<StructType.Binary>> = {};
  BinaryArray: Record<number, Struct<StructType.BinaryArray>> = {};
  UInt: Record<number, Struct<StructType.UInt>> = {};
  UIntArray: Record<number, Struct<StructType.UIntArray>> = {};
  Int64: Record<number, Struct<StructType.Int64>> = {};
  Int64Array: Record<number, Struct<StructType.Int64Array>> = {};
  UInt64: Record<number, Struct<StructType.UInt64>> = {};
  UInt64Array: Record<number, Struct<StructType.UInt64Array>> = {};
  WString16: Record<number, Struct<StructType.WString16>> = {};
  WString16Array: Record<number, Struct<StructType.WString16Array>> = {};
  WString32: Record<number, Struct<StructType.WString32>> = {};
  WString32Array: Record<number, Struct<StructType.WString32Array>> = {};
  WString64: Record<number, Struct<StructType.WString64>> = {};
  WString64Array: Record<number, Struct<StructType.WString64Array>> = {};
  Bool64bitKey: Record<number, Struct<StructType.Bool64bitKey>> = {};
}
