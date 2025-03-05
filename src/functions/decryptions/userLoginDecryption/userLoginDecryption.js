import pkg from "tweetnacl-util";

const { decodeBase64 } = pkg;
const userLoginDecryption = (key) => {
  const decode_Key = decodeBase64(key);

  return {
    decode_Key,
  };
};
export default userLoginDecryption;
