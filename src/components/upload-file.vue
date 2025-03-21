<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-04 23:52:55
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-15 00:52:17
 * @Description: 
-->
<template>
  <div class="file-upload">
    <input type="file" ref="fileInput" @change="onFileChange" />
    <!-- <button  @click="">上传</button>
    <button  @click="cancelUpload">取消</button> -->
    <div>process:{{ process}} </div>
    <div>fileName:{{  fileName}}</div>
    <img :src="imgPath" alt="">
  </div>
</template>

<script setup lang="ts">
import {FileUpload} from '../service/file'
import {ref, computed} from 'vue'

const process = ref<number>(0);
const fileName = ref<string>()
const imgPath = computed<string>(()=>{
  return `http://localhost:9000/pets/api/files/download/${fileName.value}`
})
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files?.[0];
  if(!selectedFile) return;
  const fileUpload = new FileUpload(selectedFile, (p)=>process.value = p);
  fileUpload.upload().then((file:string)=>{
    fileName.value = file
  })
  // fileUpload.cancel()
};
</script>

<style scoped>
.file-upload {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.progress-container {
  margin-top: 10px;
}

progress {
  width: 100%;
  height: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}

button {
  margin-right: 10px;
}
</style>