import { StructCodec, Vector3 as Vector3Type } from "../Types";

export const vector3Codec: StructCodec<Vector3Type> = {
  read: (view, offset) => {
    return {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
      z: view.getFloat32(offset + 8, true),
    };
  },
  write: (view, offset, value) => {
    view.setFloat32(offset, value.x, true);
    view.setFloat32(offset + 4, value.y, true);
    view.setFloat32(offset + 8, value.z, true);
  },
  byteLength: (_value) => 12,
};
