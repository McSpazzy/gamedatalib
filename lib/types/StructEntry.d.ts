import { StructType, ScalarStructType, ArrayStructType, StructValueByType, StructArrayValueByType, StructArrayElementValueByType } from "./Types";
export declare class StructEntry<TType extends StructType> {
    #private;
    structType: TType;
    hash: number;
    readIndex?: number;
    offset: number;
    constructor(view: DataView, type: TType, hash: number, offset: number, readIndex?: number);
    get value(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never;
    /**
     * Alias for {@link value}. Gets the scalar value for this struct entry.
     */
    getValue(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never;
    set value(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never);
    /**
     * Alias for setting {@link value}. Writes a scalar value for this struct entry.
     * @param value - The value to write.
     */
    setValue(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never): void;
    get values(): TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never;
    set values(values: TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never);
    /**
     * Gets the value at a specific index in this array entry.
     */
    getValueAt(index: number): TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never;
    /**
     * Sets the value at a specific index in this array entry.
     * @param index - Zero-based index in the array.
     * @param value - Value to write at index.
     */
    setValueAt(index: number, value: TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never): void;
    get count(): TType extends ArrayStructType ? number : never;
    getSize(): number;
    private isArrayType;
}
