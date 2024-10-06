"server only";

import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.STORAGE_JWT}`,
  pinataGateway: `${process.env.STORAGE_GATEWAY_URL}`,
});
