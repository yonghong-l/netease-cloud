import {
  fileCheck,
  fileUpload,
  uploadPreviewFile,
  uploadPreviewFileV2,
} from "~/api/upload";

import { getFileMD5 } from "./md5";
import { ElMessage } from "element-plus";
import { useIntervalFn } from "@vueuse/core";
import { scoringExpertFindById } from "~/api/common";

// 获取文件url后缀
const getFileSuffix = (url) => {
  const i = url.lastIndexOf(".");
  const suffix = i == -1 ? "" : url.substring(i + 1); // 文件名后缀
  return suffix;
};
// 获取预览文件地址通过useIntervalFn
const getAsyncTask = (id) => {
  return new Promise((resolve, reject) => {
    const { pause, resume, isActive } = useIntervalFn(() => {
      let params = {
        id,
      };
      scoringExpertFindById(params)
        .then((res) => {
          const { code, result } = res.data;

          const { complete, success, errMsg } = result;
          if (code === 0 && complete) {
            pause();
            if (success) {
              const { resData } = result;
              const fileInfo = JSON.parse(resData);

              resolve(fileInfo);
            } else {
              // ElMessage.error(errMsg);
              reject(errMsg);
            }
          }
        })
        .catch((err) => {
          reject(err);
        });
    }, 1000);
  });
};

// 🌈 上传预览文件
const upPreviewFile = async (fileData) => {
  let preUrl = "";
  if (!fileData) return preUrl;
  const prviewSuffix = ["doc", "docx", "pdf"];
  const { cover, name, fileName } = fileData;
  const suffix = getFileSuffix(fileName);
  if (!prviewSuffix.includes(suffix)) return preUrl;
  const params = {
    cover,
    name,
    suffix,
    url: fileName,
  };
  const { code, msg, result = [] } = ({} = await uploadPreviewFileV2(params));
  if (code === 0 && result) {
    const { id, complete, success, previewImg } = result;
    // 异步任务
    if (complete && success) {
      preUrl = previewImg;
    } else {
      const asData = await getAsyncTask(id);

      preUrl = asData?.previewImg;
    }
  } else {
  }
  return preUrl;
};
// 文件上传
const uploadFileFunc = (formData) => {
  return new Promise((resolve, reject) => {
    fileUpload(formData)
      .then((res) => {
        const { code, result } = res;
        if (code === 0) {
          resolve(result);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 文件检查
const fileCheckFunc = (file, md5) => {
  const md5Val = `${md5}`;
  const { type, size, name } = file;
  const checkData = new FormData();
  checkData.append("fileMd5", md5Val);
  checkData.append("fileName", `${name}`);
  checkData.append("fileSize", size);
  checkData.append("chunk", 0);
  checkData.append("type", 0);
  return new Promise((resolve, reject) => {
    fileCheck(checkData)
      .then((res) => {
        const { code, result } = res;
        if (res && code === 0) {
          resolve({
            ...result,
            isUploaded: true,
          });
        } else {
          resolve({
            ...result,
            isUploaded: false,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// 文件参数处理
const fileDataFormate = async (fileData) => {
  return fileData;
};

/**
 * @param file 文件
 */
async function uploadFile(
  file,
  {
    // 是否分片
    isNeedCheck = true,
    // 分片大小
    chunkSize = 1024 * 1024 * 2,
    // 上传大小限制 /m
    maxSize = 50,
  },
  callback = (res) => {}
) {
  return new Promise((resolve, reject) => {
    getFileMD5(
      file,
      async (md5, chunkArr) => {
        const { type, size, name } = file;
        if (size > maxSize * 1024 * 1024) {
          ElMessage.warning(`文件大小不能超过${maxSize}M`);
          reject();
          return;
        }
        const chunks = Math.ceil(size / chunkSize); // 分片总数
        const formData = new FormData();
        const md5Val = `${md5}_${new Date().getTime()}`;
        formData.append("fileMd5", md5Val);
        formData.append("name", `${name}`);

        // 检查分片
        if (isNeedCheck) {
          try {
            const checkData = await fileCheckFunc(file, md5);
            const { isUploaded = false, ...fileData } = checkData;
            if (isUploaded) {
              callback({ speed: 100 });
              resolve(fileData);
              return;
            }
          } catch (err) {
            reject(err);
            return;
          }
        }

        // 文件上传
        if (size > chunkSize) {
          console.log("🌳------------------------------>分片");
          formData.append("chunk", null);
          formData.append("file", null);
          formData.append("chunks", chunks);
          let uploadPercent = 0;
          for (let i = 0; i < chunks; i++) {
            formData.set("file", chunkArr[i].file);
            formData.set("chunk", i);
            formData.set("chunkSize", chunkSize);
            const chunkData = await fileUpload(formData);
            if (chunkData.code == 0) {
              callback({ speed: 100 });
              resolve(chunkData);
              return;
            } else if (chunkData.code != 50007) {
              reject(chunkData);
              return;
            } else {
              uploadPercent = ((i + 1) / chunks) * 100;
              callback({ speed: uploadPercent });
            }
          }
        } else {
          console.log("🍪-----不分片-----");
          formData.append("file", chunkArr[0].file);
          try {
            const notChunkUpData = await uploadFileFunc(formData);
            const returnData = await fileDataFormate(notChunkUpData);
            callback({ speed: 100 });
            resolve(returnData);
          } catch (err) {
            reject(err);
          }
        }
      },
      { chunkSize }
    );
  });
}
export { uploadFile };
