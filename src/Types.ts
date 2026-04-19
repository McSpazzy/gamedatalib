import { GameData } from "./GameData";

export enum StructType {
  Bool = 0x00,
  BoolArray = 0x01,
  Int = 0x02,
  IntArray = 0x03,
  Float = 0x04,
  FloatArray = 0x05,
  Enum = 0x06,
  EnumArray = 0x07,
  Vector2 = 0x08,
  Vector2Array = 0x09,
  Vector3 = 0x0a,
  Vector3Array = 0x0b,
  String16 = 0x0c,
  String16Array = 0x0d,
  String32 = 0x0e,
  String32Array = 0x0f,
  String64 = 0x10,
  String64Array = 0x11,
  Binary = 0x12,
  BinaryArray = 0x13,
  UInt = 0x14,
  UIntArray = 0x15,
  Int64 = 0x16,
  Int64Array = 0x17,
  UInt64 = 0x18,
  UInt64Array = 0x19,
  WString16 = 0x1a,
  WString16Array = 0x1b,
  WString32 = 0x1c,
  WString32Array = 0x1d,
  WString64 = 0x1e,
  WString64Array = 0x1f,
  Bool64bitKey = 0x20,
}

export type StructMetadata = {
  section: keyof GameData;
  storage: "value" | "offset";
  hasCount: boolean;
  isArray: boolean;
};

type ScalarValueTypeMap = {
  [StructType.Bool]: boolean;
  [StructType.Int]: number;
  [StructType.Float]: number;
  [StructType.Enum]: number;
  [StructType.Vector2]: Vector2;
  [StructType.Vector3]: Vector3;
  [StructType.String16]: string;
  [StructType.String32]: string;
  [StructType.String64]: string;
  [StructType.Binary]: Uint8Array;
  [StructType.UInt]: number;
  [StructType.Int64]: bigint;
  [StructType.UInt64]: bigint;
  [StructType.WString16]: string;
  [StructType.WString32]: string;
  [StructType.WString64]: string;
};

export type StructValueByType<T extends StructType> = T extends ScalarStructType ? ScalarValueTypeMap[T] : never;

type ArrayValueTypeMap = {
  [StructType.BoolArray]: boolean[];
  [StructType.IntArray]: number[];
  [StructType.FloatArray]: number[];
  [StructType.EnumArray]: number[];
  [StructType.Vector2Array]: Vector2[];
  [StructType.Vector3Array]: Vector3[];
  [StructType.String16Array]: string[];
  [StructType.String32Array]: string[];
  [StructType.String64Array]: string[];
  [StructType.BinaryArray]: Uint8Array[];
  [StructType.UIntArray]: number[];
  [StructType.Int64Array]: bigint[];
  [StructType.UInt64Array]: bigint[];
  [StructType.WString16Array]: string[];
  [StructType.WString32Array]: string[];
  [StructType.WString64Array]: string[];
  [StructType.Bool64bitKey]: bigint[];
};

export type StructArrayValueByType<T extends StructType> = T extends ArrayStructType ? ArrayValueTypeMap[T] : never;
export type StructArrayElementValueByType<T extends StructType> = T extends ArrayStructType ? StructArrayValueByType<T>[number] : never;

export const STRUCT_TYPE_METADATA: Record<StructType, StructMetadata> = {
  [StructType.Bool]: { section: "Bool", storage: "value", hasCount: false, isArray: false },
  [StructType.BoolArray]: { section: "BoolArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.Int]: { section: "Int", storage: "value", hasCount: false, isArray: false },
  [StructType.IntArray]: { section: "IntArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.Float]: { section: "Float", storage: "value", hasCount: false, isArray: false },
  [StructType.FloatArray]: { section: "FloatArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.Enum]: { section: "Enum", storage: "value", hasCount: false, isArray: false },
  [StructType.EnumArray]: { section: "EnumArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.Vector2]: { section: "Vector2", storage: "offset", hasCount: false, isArray: false },
  [StructType.Vector2Array]: { section: "Vector2Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.Vector3]: { section: "Vector3", storage: "offset", hasCount: false, isArray: false },
  [StructType.Vector3Array]: { section: "Vector3Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.String16]: { section: "String16", storage: "offset", hasCount: false, isArray: false },
  [StructType.String16Array]: { section: "String16Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.String32]: { section: "String32", storage: "offset", hasCount: false, isArray: false },
  [StructType.String32Array]: { section: "String32Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.String64]: { section: "String64", storage: "offset", hasCount: false, isArray: false },
  [StructType.String64Array]: { section: "String64Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.Binary]: { section: "Binary", storage: "offset", hasCount: false, isArray: false },
  [StructType.BinaryArray]: { section: "BinaryArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.UInt]: { section: "UInt", storage: "value", hasCount: false, isArray: false },
  [StructType.UIntArray]: { section: "UIntArray", storage: "offset", hasCount: true, isArray: true },
  [StructType.Int64]: { section: "Int64", storage: "offset", hasCount: false, isArray: false },
  [StructType.Int64Array]: { section: "Int64Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.UInt64]: { section: "UInt64", storage: "offset", hasCount: false, isArray: false },
  [StructType.UInt64Array]: { section: "UInt64Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.WString16]: { section: "WString16", storage: "offset", hasCount: false, isArray: false },
  [StructType.WString16Array]: { section: "WString16Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.WString32]: { section: "WString32", storage: "offset", hasCount: false, isArray: false },
  [StructType.WString32Array]: { section: "WString32Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.WString64]: { section: "WString64", storage: "offset", hasCount: false, isArray: false },
  [StructType.WString64Array]: { section: "WString64Array", storage: "offset", hasCount: true, isArray: true },
  [StructType.Bool64bitKey]: { section: "Bool64bitKey", storage: "offset", hasCount: true, isArray: true },
};

export const KNOWN_STRUCT_TYPES = new Set<number>(Object.keys(STRUCT_TYPE_METADATA).map((type) => Number(type)));

export const STRUCT_VALUE_TYPES = new Set<StructType>([StructType.Bool, StructType.Int, StructType.Float, StructType.Enum, StructType.UInt]);

export type StructValueType = {
  [K in StructType]: K extends ScalarStructType ? K : never;
}[StructType];

export type StructSectionType<T extends StructType> = (typeof STRUCT_TYPE_METADATA)[T]["section"];

export type ArrayStoredType = {
  [K in StructType]: K extends ArrayStructType ? K : never;
}[StructType];

export type Struct<T extends StructType> = T extends ScalarStructType ? StructScalar<T> : T extends ArrayStructType ? StructArray<T> : StructBase<T>;

export type ParsedSection<T extends StructType> = Record<number, Struct<T>>;

export type ScalarStructType = keyof ScalarValueTypeMap & StructType;
export type ArrayStructType = keyof ArrayValueTypeMap & StructType;

export interface StructBase<T extends StructType> {
  structType: T;
  hash: number;
  offset: number;
}

export interface StructScalar<T extends ScalarStructType> extends StructBase<T> {
  /**
   * Gets the scalar value for this struct entry.
   */
  get value(): StructValueByType<T>;
  /**
   * Sets the scalar value for this struct entry.
   * @param value - The value to write.
   */
  set value(value: StructValueByType<T>);
  /**
   * Alias for {@link value}. Returns the scalar value for this struct entry.
   */
  getValue(): StructValueByType<T>;
  /**
   * Alias for setting {@link value}. Writes a new scalar value for this struct entry.
   * @param value - The value to write.
   */
  setValue(value: StructValueByType<T>): void;
}

export interface StructArray<T extends ArrayStructType> extends StructBase<T> {
  /**
   * Reads the full array value for this struct entry.
   * Returns a new array instance.
   */
  get values(): StructArrayValueByType<T>;
  /**
   * Replaces the full array value for this struct entry.
   */
  set values(values: StructArrayValueByType<T>);
  /**
   * Gets the value at a specific index in the array entry.
   */
  getValueAt(index: number): StructArrayElementValueByType<T>;
  /**
   * Sets the value at a specific index in the array entry.
   * @param index - Zero-based index in the array.
   * @param value - Value to write.
   */
  setValueAt(index: number, value: StructArrayElementValueByType<T>): void;
  /**
   * Gets the persisted array entry length.
   */
  readonly count: number;
}

export type StructCodec<T> = {
  read(view: DataView, offset: number): T;
  write(view: DataView, offset: number, value: T): void;
};

export type Vector2 = { x: number; y: number };
export type Vector3 = { x: number; y: number; z: number };
