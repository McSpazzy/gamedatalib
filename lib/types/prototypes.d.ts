export {};
declare global {
    interface DataView {
        getUint32Array(offset: number, count: number, littleEndian?: boolean): number[];
        getInt32Array(offset: number, count: number, littleEndian?: boolean): number[];
        getFloat32Array(offset: number, count: number, littleEndian?: boolean): number[];
        getBigInt64Array(offset: number, count: number, littleEndian?: boolean): bigint[];
        getBigUint64Array(offset: number, count: number, littleEndian?: boolean): bigint[];
        setUint32Array(offset: number, array: number[], littleEndian?: boolean): void;
        setInt32Array(offset: number, array: number[], littleEndian?: boolean): void;
        setFloat32Array(offset: number, array: number[], littleEndian?: boolean): void;
        setBigInt64Array(offset: number, array: bigint[], littleEndian?: boolean): void;
        setBigUint64Array(offset: number, array: bigint[], littleEndian?: boolean): void;
        getNullTerminatedUtf16String(offset: number, maxLength: number, littleEndian?: boolean): string;
        getNullTerminatedUtf8String(offset: number, maxLength: number): string;
        setNullTerminatedUtf16String(offset: number, value: string, maxLength: number, littleEndian?: boolean): void;
        setNullTerminatedUtf8String(offset: number, value: string, maxLength: number): void;
    }
}
