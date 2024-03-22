import { http } from "~/utils/http";


// 登录
export const loginClient = (data) => {
  return http.request(
    "post",
    "/oauth2/client_token",
    { data },
    {
      isNeedToken: false, // 是否需要token
    }
  );
};
