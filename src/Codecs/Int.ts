import { StructCodec } from "../Types";

export const intCodec: StructCodec<number> = {
  read: (view, offset) => view.getInt32(offset, true),
  write: (view, offset, value) => view.setInt32(offset, value, true),
  byteLength: (_value) => 4,
};
