import { StructCodec } from "../Types";

export const floatCodec: StructCodec<number> = {
  read: (view, offset) => view.getFloat32(offset, true),
  write: (view, offset, value) => view.setFloat32(offset, value, true),
  byteLength: (_value) => 4,
};
