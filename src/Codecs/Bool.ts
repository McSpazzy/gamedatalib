import { StructCodec } from "../Types";

export const boolCodec: StructCodec<boolean> = {
  read: (view, offset) => view.getUint32(offset, true) === 1,
  write: (view, offset, value) => view.setUint32(offset, value ? 1 : 0, true),
};
