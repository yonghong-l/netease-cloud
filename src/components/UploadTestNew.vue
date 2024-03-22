<template>
  <el-card style="width: 80%; margin: 80px auto" header="文件分片上传">
    <el-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
        >分片大小</span
      >
      <el-input-number
        v-model="userSetChunkSize"
        class="w-50 m-2"
        placeholder="请输入分片大小"
        :min="5"
        :max="5120"
        :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      />
    </el-row>

    <el-upload
      class="upload-demo"
      drag
      multiple
      :http-request="handleHttpRequest"
      :on-remove="handleRemoveFile"
    >
      <div class="el-upload__text">
        请拖拽文件到此处或 <em>点击此处上传</em>
      </div>
    </el-upload>
  </el-card>
</template>

<script setup>
import { uploadFile } from "~/utils/uploadNew";
const showUploadLoading = ref(false);
const userSetChunkSize = ref(5);
const handleHttpRequest = async (data) => {
  showUploadLoading.value = true;
  try {
    const res = await uploadFile(
      data,
      {
        chunkSize: userSetChunkSize.value * 1024 * 1024,
      },
      (speed) => {
        console.log("🐠-----speed-----", speed);
      },
      100
    );
    console.log("🌵-----上传成功-----", res);
  } catch (error) {
    console.log("🌈-----上传失败-----", error);
  }
  showUploadLoading.value = false;
};
const fileList = ref([]);
const handleRemoveFile = (file) => {
  console.log("🍪-----file-----", file, fileList.value);
  fileList.value = fileList.value.filter((item) => item?.uid !== file?.uid);
};
</script>

<style lang="less" scoped></style>
