export type StructStorage = "value" | "offset";
export declare enum StructType {
    Bool = 0,
    BoolArray = 1,
    Int = 2,
    IntArray = 3,
    Float = 4,
    FloatArray = 5,
    Enum = 6,
    EnumArray = 7,
    Vector2 = 8,
    Vector2Array = 9,
    Vector3 = 10,
    Vector3Array = 11,
    String16 = 12,
    String16Array = 13,
    String32 = 14,
    String32Array = 15,
    String64 = 16,
    String64Array = 17,
    Binary = 18,
    BinaryArray = 19,
    UInt = 20,
    UIntArray = 21,
    Int64 = 22,
    Int64Array = 23,
    UInt64 = 24,
    UInt64Array = 25,
    WString16 = 26,
    WString16Array = 27,
    WString32 = 28,
    WString32Array = 29,
    WString64 = 30,
    WString64Array = 31,
    Bool64bitKey = 32
}
export type StructMetadata = {
    section: keyof ParsedGameData;
    storage: StructStorage;
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
export declare const STRUCT_TYPE_METADATA: Record<StructType, StructMetadata>;
export declare const KNOWN_STRUCT_TYPES: Set<number>;
export declare const STRUCT_VALUE_TYPES: Set<StructType>;
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
    get value(): StructValueByType<T>;
    set value(value: StructValueByType<T>);
}
export interface StructArray<T extends ArrayStructType> extends StructBase<T> {
    get values(): StructArrayValueByType<T>;
    set values(values: StructArrayValueByType<T>);
    readonly count: number;
}
export type StructCodec<T> = {
    read(view: DataView, offset: number): T;
    write(view: DataView, offset: number, value: T): void;
};
export type ParsedGameData = {
    Bool: Record<number, Struct<StructType.Bool>>;
    BoolArray: Record<number, Struct<StructType.BoolArray>>;
    Int: Record<number, Struct<StructType.Int>>;
    IntArray: Record<number, Struct<StructType.IntArray>>;
    Float: Record<number, Struct<StructType.Float>>;
    FloatArray: Record<number, Struct<StructType.FloatArray>>;
    Enum: Record<number, Struct<StructType.Enum>>;
    EnumArray: Record<number, Struct<StructType.EnumArray>>;
    Vector2: Record<number, Struct<StructType.Vector2>>;
    Vector2Array: Record<number, Struct<StructType.Vector2Array>>;
    Vector3: Record<number, Struct<StructType.Vector3>>;
    Vector3Array: Record<number, Struct<StructType.Vector3Array>>;
    String16: Record<number, Struct<StructType.String16>>;
    String16Array: Record<number, Struct<StructType.String16Array>>;
    String32: Record<number, Struct<StructType.String32>>;
    String32Array: Record<number, Struct<StructType.String32Array>>;
    String64: Record<number, Struct<StructType.String64>>;
    String64Array: Record<number, Struct<StructType.String64Array>>;
    Binary: Record<number, Struct<StructType.Binary>>;
    BinaryArray: Record<number, Struct<StructType.BinaryArray>>;
    UInt: Record<number, Struct<StructType.UInt>>;
    UIntArray: Record<number, Struct<StructType.UIntArray>>;
    Int64: Record<number, Struct<StructType.Int64>>;
    Int64Array: Record<number, Struct<StructType.Int64Array>>;
    UInt64: Record<number, Struct<StructType.UInt64>>;
    UInt64Array: Record<number, Struct<StructType.UInt64Array>>;
    WString16: Record<number, Struct<StructType.WString16>>;
    WString16Array: Record<number, Struct<StructType.WString16Array>>;
    WString32: Record<number, Struct<StructType.WString32>>;
    WString32Array: Record<number, Struct<StructType.WString32Array>>;
    WString64: Record<number, Struct<StructType.WString64>>;
    WString64Array: Record<number, Struct<StructType.WString64Array>>;
    Bool64bitKey: Record<number, Struct<StructType.Bool64bitKey>>;
};
export declare const createEmptyParsedGameData: () => ParsedGameData;
export type Vector2 = {
    x: number;
    y: number;
};
export type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export {};
