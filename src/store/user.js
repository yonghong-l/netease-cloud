import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
// import { getLogin, refreshTokenApi } from "~/api/admin";
// import { loginClient } from "~/api/auth";
import { setToken, getToken, formatToken } from "~/utils/auth";

export const useUserStore = defineStore(
  "user",
  () => {
    const count = ref(0);
    const setCount = () => {
      count.value++;
    };
    // /** 登录 */
    // const handLoginClient = async (params) => {
    //   return new Promise((resolve, reject) => {
    //     loginClient(params)
    //       .then((res) => {
    //         console.log("登录", res);
    //         const { code, msg, data } = res;
    //         if (code === 200 && data) {
    //           setToken(data);
    //         } else {
    //           console.log("登录失败", msg);
    //         }
    //         resolve(data);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // };
    // /** 登录 */
    // const handLogin = async (data) => {
    //   return new Promise((resolve, reject) => {
    //     getLogin(data)
    //       .then((data) => {
    //         console.log("登录", data);
    //         const { code, msg, result } = data;
    //         if (code === 200 && result) {
    //           const { token } = result || {};
    //           setToken(token);
    //           resolve(data);
    //         } else {
    //           console.log("登录失败", msg);
    //         }
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // };

    // /** 刷新`token` */
    // const handRefreshToken = async (data) => {
    //   return new Promise((resolve, reject) => {
    //     refreshTokenApi(data)
    //       .then((data) => {
    //         console.log("刷新token", data);
    //         const { code, msg, result } = data;
    //         if (code === 200 && result) {
    //           setToken(result);
    //           resolve(data);
    //         } else {
    //           console.log("刷新token失败", msg);
    //         }
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // };
    return {
      count,
      setCount,
      // handRefreshToken,
      // handLogin,
      // handLoginClient,
    };
  },
  {
    persist: {
      key: "test-key",
    },
  }
);

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
