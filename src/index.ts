import { sha256 } from "js-sha256";
import { sha512 } from "js-sha512";

type D_hash = {
  Buffer: Buffer;
  String: string;
};

export function D256(
  strData: string,
  deleteStep: number,
  repeat: number
): D_hash {
  let strDataHash = sha256(strData);


  for (let i = 0; i < repeat; i++) {
    let result: string = ""
    for (let r = 0; r < strDataHash.length; r++) {
      if ((r + 1) % deleteStep !== 0) {
        result += strDataHash[r]
      }
    }
    strDataHash = sha256(result);
  }

  return {
    Buffer: Buffer.from(strDataHash, "hex"),
    String: strDataHash,
  };
}

export function D512(
  strData: string,
  deleteStep: number,
  repeat: number
): D_hash {
  let strDataHash = sha512(strData);


  for (let i = 0; i < repeat; i++) {
    let result: string = ""
    for (let r = 0; r < strDataHash.length; r++) {
      if ((r + 1) % deleteStep !== 0) {
        result += strDataHash[r]
      }
    }
    strDataHash = sha512(result);
  }

  return {
    Buffer: Buffer.from(strDataHash, "hex"),
    String: strDataHash,
  };
}

