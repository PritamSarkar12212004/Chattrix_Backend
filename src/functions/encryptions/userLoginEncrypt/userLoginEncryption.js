import nacl from "tweetnacl";
import pkg from "tweetnacl-util";

const { encodeBase64 } = pkg;

const userLoginEncryption = () => {
  const keyPair = nacl.box.keyPair();

  const publicKey = encodeBase64(keyPair.publicKey); // 32 bytes
  const privateKey = encodeBase64(keyPair.secretKey); // 32 bytes ✅ (now correct)

  return {
    publicKey,
    privateKey,
  };
};

export default userLoginEncryption;
