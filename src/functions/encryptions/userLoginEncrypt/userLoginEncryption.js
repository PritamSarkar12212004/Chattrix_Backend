import nacl from "tweetnacl";
import pkg from "tweetnacl-util";

const { encodeBase64 } = pkg;
const userLoginEncryption = () => {
  const keyPair = nacl.sign.keyPair();
  const publicKey = encodeBase64(keyPair.publicKey);
  const privateKey = encodeBase64(keyPair.secretKey);

  return {
    publicKey,
    privateKey,
  };
};
export default userLoginEncryption;
