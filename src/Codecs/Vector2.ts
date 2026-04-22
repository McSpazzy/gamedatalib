import { StructCodec, Vector2 as Vector2Type } from "../Types";

export const vector2Codec: StructCodec<Vector2Type> = {
  read: (view, offset) => {
    return {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
    };
  },
  write: (view, offset, value) => {
    view.setFloat32(offset, value.x, true);
    view.setFloat32(offset + 4, value.y, true);
  },
  byteLength: (_value) => 8,
};
