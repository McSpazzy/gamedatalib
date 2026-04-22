import { scalarCodecs, arrayCodecs } from "./Codecs";
import { StructType, ScalarStructType, ArrayStructType, StructValueByType, StructArrayValueByType, StructArrayElementValueByType, STRUCT_TYPE_METADATA } from "./Types";

export class StructEntry<TType extends StructType> {
  #scalarValue: unknown;
  #arrayValue: unknown;
  #arrayCount: number;

  structType: TType;
  hash: number = 0;
  readIndex?: number;
  offset: number;

  constructor(view: DataView, type: TType, hash: number, offset: number, readIndex?: number) {
    this.structType = type;
    this.hash = hash;
    this.#arrayCount = 0;
    this.readIndex = readIndex;
    this.offset = offset;

    if (this.structType === StructType.Bool64bitKey && offset === 0) {
      const arrayCodec = arrayCodecs[this.structType as ArrayStructType];
      if (arrayCodec) {
        this.#arrayValue = [];
        this.#arrayCount = 0;
        return;
      }
    }

    const scalarCodec = scalarCodecs[this.structType as ScalarStructType];
    if (scalarCodec) {
      this.#scalarValue = scalarCodec.read(view, offset);
      return;
    }

    const arrayCodec = arrayCodecs[this.structType as ArrayStructType];
    if (arrayCodec) {
      this.#arrayValue = arrayCodec.read(view, offset);
      this.#arrayCount = view.getUint32(offset, true);
      return;
    }
  }

  public get value(): TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never {
    const codec = scalarCodecs[this.structType as ScalarStructType];
    if (codec) {
      return this.#scalarValue as TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never;
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
      this.#scalarValue = value;
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
      return this.#arrayValue as TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never;
    }

    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }

  public set values(values: TType extends ArrayStructType ? StructArrayValueByType<Extract<TType, ArrayStructType>> : never) {
    const codec = arrayCodecs[this.structType as ArrayStructType];
    if (codec) {
      this.#arrayValue = values;
      this.#arrayCount = Array.isArray(values) ? values.length : 0;
      return;
    }

    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }

  /**
   * Gets the value at a specific index in this array entry.
   */
  public getValueAt(index: number): TType extends ArrayStructType ? StructArrayElementValueByType<Extract<TType, ArrayStructType>> : never {
    if (this.isArrayType(this.structType)) {
      const values = this.values as unknown as TType extends ArrayStructType ? StructArrayElementValueByType<TType>[] : never;
      if (!values) {
        throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
      }

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
      return this.#arrayCount as TType extends ArrayStructType ? number : never;
    }

    throw new Error(`count is not supported for struct type: ${this.structType}`);
  }

  public getSize(): number {
    const metadata = STRUCT_TYPE_METADATA[this.structType];
    if (metadata.storage === "value") {
      return 0;
    }

    const scalarCodec = scalarCodecs[this.structType as ScalarStructType];
    if (scalarCodec) {
      return scalarCodec.byteLength(this.value as never);
    }

    const arrayCodec = arrayCodecs[this.structType as ArrayStructType];
    if (arrayCodec) {
      return arrayCodec.byteLength(this.values as never);
    }

    throw new Error(`getSize is not supported for struct type: ${this.structType}`);
  }

  private isArrayType(type: StructType): type is ArrayStructType {
    return STRUCT_TYPE_METADATA[type].isArray;
  }
}
