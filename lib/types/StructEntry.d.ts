import { StructType, ScalarStructType, ArrayStructType, StructValueByType, StructArrayValueByType } from "./Types";
export declare class StructEntry<TType extends StructType> {
    #private;
    structType: TType;
    hash: number;
    offset: number;
    constructor(view: DataView, type: TType, hash: number, offset: number);
    get value(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never;
    set value(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never);
    get values(): TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never;
    set values(values: TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never);
    get count(): TType extends ArrayStructType ? number : never;
    private isArrayType;
}
