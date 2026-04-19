import { scalarCodecs, arrayCodecs } from "./Codecs";
import { StructType, ScalarStructType, ArrayStructType, StructValueByType, StructArrayValueByType, StructArrayElementValueByType, STRUCT_TYPE_METADATA } from "./Types";

export class StructEntry<TType extends StructType> {
  #view: DataView;

  structType: TType;
  hash: number = 0;
  offset: number = 0;

  constructor(view: DataView, type: TType, hash: number, offset: number) {
    this.#view = view;
    this.structType = type;
    this.hash = hash;
    this.offset = offset;
  }

  public get value(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never {
    const codec = scalarCodecs[this.structType as ScalarStructType];
    if (codec) {
      return codec.read(this.#view, this.offset) as unknown as TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never;
    }

    throw new Error(`value is not supported for struct type: ${this.structType}`);
  }

  /**
   * Alias for {@link value}. Gets the scalar value for this struct entry.
   */
  public getValue(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never {
    return this.value;
  }

  public set value(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never) {
    const codec = scalarCodecs[this.structType as ScalarStructType];
    if (codec) {
      codec.write(this.#view, this.offset, value as unknown);
      return;
    }

    throw new Error(`value is not supported for struct type: ${this.structType}`);
  }

  /**
   * Alias for setting {@link value}. Writes a scalar value for this struct entry.
   * @param value - The value to write.
   */
  public setValue(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never) {
    this.value = value;
  }

  public get values(): TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never {
    const codec = arrayCodecs[this.structType as ArrayStructType];
    if (codec) {
      return codec.read(this.#view, this.offset) as unknown as TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never;
    }

    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }

  public set values(values: TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never) {
    const codec = arrayCodecs[this.structType as ArrayStructType];
    if (codec) {
      codec.write(this.#view, this.offset, values as unknown);
      return;
    }

    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }

  /**
   * Gets the value at a specific index in this array entry.
   */
  public getValueAt(index: number): TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never {
    if (this.isArrayType(this.structType)) {
      const codec = arrayCodecs[this.structType];
      if (!codec) {
        throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
      }

      const values = codec.read(this.#view, this.offset) as unknown as StructArrayElementValueByType<TType>[];
      return values[index] as TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never;
    }

    throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
  }

  /**
   * Sets the value at a specific index in this array entry.
   * @param index - Zero-based index in the array.
   * @param value - Value to write at index.
   */
  public setValueAt(index: number, value: TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never) {
    if (this.isArrayType(this.structType)) {
      const currentValues = this.values as unknown as TType extends ArrayStructType ? StructArrayElementValueByType<TType>[] : never;
      const values = [...currentValues];
      values[index] = value as TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never;
      this.values = values as TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never;
      return;
    }

    throw new Error(`setValueAt is not supported for struct type: ${this.structType}`);
  }

  public get count(): TType extends ArrayStructType ? number : never {
    if (this.isArrayType(this.structType)) {
      return this.#view.getUint32(this.offset, true) as TType extends ArrayStructType ? number : never;
    }

    throw new Error(`count is not supported for struct type: ${this.structType}`);
  }

  private isArrayType(type: StructType): type is ArrayStructType {
    return STRUCT_TYPE_METADATA[type].isArray;
  }
}
