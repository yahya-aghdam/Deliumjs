import { sha256 } from "js-sha256";
import { sha512 } from "js-sha512";

type D_hash = {
  Buffer: Buffer;
  String: string;
};

/**
 * Performs a hash transformation on a given string using SHA-256 and a specified deletion pattern.
 *
 * @param {string} strData - The input string to be hashed.
 * @param {number} deleteStep - The interval at which characters should be removed from the hash string.
 * @param {number} repeat - The number of times the hashing and deletion process should be repeated.
 * @returns {D_hash} An object containing the final hash in both Buffer and string formats.
 */
export function D256(
  strData: string,
  deleteStep: number,
  repeat: number
): D_hash {
  let strDataHash = sha256(strData);

  for (let i = 0; i < repeat; i++) {
    let result: string = "";
    for (let r = 0; r < strDataHash.length; r++) {
      if ((r + 1) % deleteStep !== 0) {
        result += strDataHash[r];
      }
    }
    strDataHash = sha256(result);
  }

  return {
    Buffer: Buffer.from(strDataHash, "hex"),
    String: strDataHash,
  };
}

/**
 * Performs a hash transformation on a given string using SHA-512 and a specified deletion pattern.
 *
 * @param {string} strData - The input string to be hashed.
 * @param {number} deleteStep - The interval at which characters should be removed from the hash string.
 * @param {number} repeat - The number of times the hashing and deletion process should be repeated.
 * @returns {D_hash} An object containing the final hash in both Buffer and string formats.
 */
export function D512(
  strData: string,
  deleteStep: number,
  repeat: number
): D_hash {
  let strDataHash = sha512(strData);

  for (let i = 0; i < repeat; i++) {
    let result: string = "";
    for (let r = 0; r < strDataHash.length; r++) {
      if ((r + 1) % deleteStep !== 0) {
        result += strDataHash[r];
      }
    }
    strDataHash = sha512(result);
  }

  return {
    Buffer: Buffer.from(strDataHash, "hex"),
    String: strDataHash,
  };
}
