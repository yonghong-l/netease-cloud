import { http } from "~/utils/http";

/** 上传预览文件V2 */
export const scoringExpertFindById = (data) => {
  return http.request("post", "/common/file/v2/filePreview", { data });
};