import { StructCodec } from "../Types";

export const uintCodec: StructCodec<number> = {
  read: (view, offset) => view.getUint32(offset, true),
  write: (view, offset, value) => view.setUint32(offset, value, true),
  byteLength: (_value) => 4,
};
