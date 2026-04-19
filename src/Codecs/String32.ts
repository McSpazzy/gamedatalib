import { StructCodec } from "../Types";

const MAX_BYTES = 0x40;

export const string32Codec: StructCodec<string> = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES);
  },
};
