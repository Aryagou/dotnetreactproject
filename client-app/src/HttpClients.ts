import axios from "axios";
import { ActivitiesClient as NswagActivitiesClient } from "./web-api-client";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// BUG: (Workaround) - Transform response is cleared to avoid axios default behaviour of automatically parsing JSON results.
//                     This is required since NSwag will also automatically parse JSON results.
//                     The issue is outlined here; https://github.com/RicoSuter/NSwag/pull/2927.
//                     Once the issue is resolved it's likey that this entire file can be removed (after setting a default baseUrl and global interceptors).
export const GeneralClient = axios.create({ transformResponse: [] });

GeneralClient.interceptors.response.use(async (res) => {
  try {
    await sleep(1000);
    return res;
  } catch (error) {
    console.log(error);
  }
});

const baseUrl = "http://localhost:5000";

const ActivitiesClient = new NswagActivitiesClient(baseUrl, GeneralClient);


export {
  ActivitiesClient,
};

