import { scalarCodecs, arrayCodecs } from "./Codecs";
import { StructType, ScalarStructType, ArrayStructType, StructValueByType, StructArrayValueByType, STRUCT_TYPE_METADATA } from "./Types";


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

  public set value(value: TType extends ScalarStructType ? StructValueByType<Extract<TType, ScalarStructType>> : never) {
    const codec = scalarCodecs[this.structType as ScalarStructType];
    if (codec) {
      codec.write(this.#view, this.offset, value as unknown);
      return;
    }

    throw new Error(`value is not supported for struct type: ${this.structType}`);
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
