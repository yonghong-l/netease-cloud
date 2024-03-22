<template>
  <el-button type="primary" @click="handleUploadFile()">文件上传 </el-button>
</template>

<script setup>
import { uploadFile } from "~/utils/upload";
const {
  files,
  open: handleUploadFile,
  reset,
  onChange,
} = useFileDialog({
  accept: "image/*,video/*",
});
const showUploadLoading = ref(false);
onChange(async (file) => {
  // loading
  showUploadLoading.value = true;
  for (let i = 0; i < file.length; i++) {
    // console.log("🌳-----file[i]-----", file[i]);
    try {
      const res = await uploadFile(
        file[i],
        { isOnlyFile: true },
        (speed) => {
          console.log("🐠-----speed-----", speed);
        },
        100
      );
      console.log("🌵-----res-----", res);
    } catch (error) {
      console.log("🌈-----error-----", error);
    }

   
  }
  showUploadLoading.value = false;
});
</script>

<style lang="less" scoped></style>
