<template>
  <section class="upload-container">
    <el-upload class="upload-box" drag :action="uploadAction" :before-upload="beforeAction" :http-request="handleUploadImage" :show-file-list="false">
      <template>
        <i class="el-icon-upload"></i>
      </template>
    </el-upload>
  </section>
</template>
<script>
import { requestUploadImage } from '@/api'
export default {
  name: 'PicturePicker',
  data() {
    return {
      uploadAction: 'http://127.0.0.1:3000/api/v1/upload'

    }
  },
  props: {
    themeId: {
      type: String
    }
  },
  methods: {
    beforeAction(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message({
          message: '上传图片只能是JPG、JPEG、GIF或PNG格式!',
          type: 'error'
        })
      }
      if (!isLt1M) {
        this.$message({
          message: '上传图片大小不能超过 1MB!',
          type: 'error'
        })
      }
      return isJPG && isLt1M
    },
    handleUploadImage(content) {
      const formData = new FormData()
      formData.append('cover', content.file)
      const fr = new window.FileReader()
      fr.readAsDataURL(content.file)
      fr.onload = (e) => {
        const img = new window.Image()
        img.src = fr.result
        img.onload = () => {
          formData.append('width', img.width)
          formData.append('height', img.height)
          const params = {
            name: 'cover',
            width: img.width,
            height: img.height,
            type: 'pic',
            themeId: this.themeId || this.$route.params.id
          }
          requestUploadImage(params, formData)
            .then(res => {
              const {
                code,
                message,
                data
              } = res
              if (code === 200) {
                console.log(res)
                this.$emit('uploaded', data)
              }

            })
        }
      }


    }
  }
}

</script>
<style lang="scss" scoped>
.upload-container {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  .upload-box {
    width: 100%;
    overflow: hidden;

    /deep/ .el-upload-dragger {
      width: 100%;
      padding: 0 15px;
      height: 70px;

      /deep/ .el-icon-upload {
        margin: 10px 0
      }
    }

  }
}

</style>
