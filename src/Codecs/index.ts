export { boolCodec } from "./Bool";
export { boolArrayCodec } from "./BoolArray";
export { intCodec } from "./Int";
export { uintCodec } from "./UInt";
export { uintCodec as enumCodec } from "./UInt";
export { uintArrayCodec as enumArrayCodec } from "./UIntArray";
export { floatCodec } from "./Float";
export { int64Codec } from "./Int64";
export { uint64Codec } from "./UInt64";
export { intArrayCodec } from "./IntArray";
export { uintArrayCodec } from "./UIntArray";
export { floatArrayCodec } from "./FloatArray";
export { int64ArrayCodec } from "./Int64Array";
export { uint64ArrayCodec } from "./UInt64Array";
export { vector2Codec } from "./Vector2";
export { vector2ArrayCodec } from "./Vector2Array";
export { vector3Codec } from "./Vector3";
export { vector3ArrayCodec } from "./Vector3Array";
export { wString16Codec } from "./WString16";
export { wString16ArrayCodec } from "./WString16Array";
export { wString32Codec } from "./WString32";
export { wString32ArrayCodec } from "./WString32Array";
export { wString64Codec } from "./WString64";
export { wString64ArrayCodec } from "./WString64Array";
export { binaryCodec } from "./Binary";
export { binaryArrayCodec } from "./BinaryArray";
export { string16Codec } from "./String16";
export { string16ArrayCodec } from "./String16Array";
export { string32Codec } from "./String32";
export { string32ArrayCodec } from "./String32Array";
export { string64Codec } from "./String64";
export { string64ArrayCodec } from "./String64Array";

import { StructCodec, StructType, ScalarStructType, ArrayStructType } from "../Types";
import { boolCodec } from "./Bool";
import { boolArrayCodec } from "./BoolArray";
import { intCodec } from "./Int";
import { uintCodec } from "./UInt";
import { uintArrayCodec as enumArrayCodec } from "./UIntArray";
import { uintCodec as enumCodec } from "./UInt";
import { floatCodec } from "./Float";
import { int64Codec } from "./Int64";
import { uint64Codec } from "./UInt64";
import { intArrayCodec } from "./IntArray";
import { uintArrayCodec } from "./UIntArray";
import { floatArrayCodec } from "./FloatArray";
import { int64ArrayCodec } from "./Int64Array";
import { uint64ArrayCodec } from "./UInt64Array";
import { vector2Codec } from "./Vector2";
import { vector2ArrayCodec } from "./Vector2Array";
import { vector3Codec } from "./Vector3";
import { vector3ArrayCodec } from "./Vector3Array";
import { wString16Codec } from "./WString16";
import { wString16ArrayCodec } from "./WString16Array";
import { wString32Codec } from "./WString32";
import { wString32ArrayCodec } from "./WString32Array";
import { wString64Codec } from "./WString64";
import { wString64ArrayCodec } from "./WString64Array";
import { binaryCodec } from "./Binary";
import { binaryArrayCodec } from "./BinaryArray";
import { string16Codec } from "./String16";
import { string16ArrayCodec } from "./String16Array";
import { string32Codec } from "./String32";
import { string32ArrayCodec } from "./String32Array";
import { string64Codec } from "./String64";
import { string64ArrayCodec } from "./String64Array";

export const scalarCodecs: Partial<Record<ScalarStructType, StructCodec<unknown>>> = {
  [StructType.Bool]: boolCodec,
  [StructType.Enum]: enumCodec,
  [StructType.Int]: intCodec,
  [StructType.Float]: floatCodec,
  [StructType.UInt]: uintCodec,
  [StructType.Int64]: int64Codec,
  [StructType.UInt64]: uint64Codec,
  [StructType.Vector2]: vector2Codec,
  [StructType.Vector3]: vector3Codec,
  [StructType.Binary]: binaryCodec,
  [StructType.String16]: string16Codec,
  [StructType.String32]: string32Codec,
  [StructType.String64]: string64Codec,
  [StructType.WString16]: wString16Codec,
  [StructType.WString32]: wString32Codec,
  [StructType.WString64]: wString64Codec,
};

export const arrayCodecs: Partial<Record<ArrayStructType, StructCodec<unknown>>> = {
  [StructType.BoolArray]: boolArrayCodec,
  [StructType.EnumArray]: enumArrayCodec,
  [StructType.IntArray]: intArrayCodec,
  [StructType.FloatArray]: floatArrayCodec,
  [StructType.UIntArray]: uintArrayCodec,
  [StructType.Int64Array]: int64ArrayCodec,
  [StructType.UInt64Array]: uint64ArrayCodec,
  [StructType.Vector2Array]: vector2ArrayCodec,
  [StructType.Vector3Array]: vector3ArrayCodec,
  [StructType.BinaryArray]: binaryArrayCodec,
  [StructType.String16Array]: string16ArrayCodec,
  [StructType.String32Array]: string32ArrayCodec,
  [StructType.String64Array]: string64ArrayCodec,
  [StructType.WString16Array]: wString16ArrayCodec,
  [StructType.WString32Array]: wString32ArrayCodec,
  [StructType.WString64Array]: wString64ArrayCodec,
};
