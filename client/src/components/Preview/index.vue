<template>
  <section class="preview-container">
    <div class="preview-wrapper">
      <div class="preview-main">
        <iframe :src="releaseUrl" frameborder="0"></iframe>
      </div>
      <div class="setting-container">
        <div class="info-box">
          <div class="label">设置作品信息</div>
          <el-input class="input-item" v-model="title" @blur="handleSaveThemeTitle" placeholder="请输入页面标题"></el-input>
          <el-input class="input-item" v-model="description" @blur="handleSaveThemeDesc" placeholder="请输入页面描述" type="textarea"></el-input>
        </div>
        <div class="qrcode-box">
          <div class="label">手机扫码分享给好友</div>
          <div class="code-box">
            <div class="size">
              <canvas style="float: left" id="canvas"></canvas>
              <el-radio-group class="radios" v-model="qrcodeSize">
                <el-radio :label="500">500x500</el-radio>
                <el-radio :label="1000">1000x1000</el-radio>
                <el-radio :label="2000">2000x2000</el-radio>
                <el-button @click="handleDownQRcode">下载二维码</el-button>
              </el-radio-group>
            </div>
          </div>
          <div class="edit">
            <el-button @click="handleOpenInNewTab" style="width:180px" type="success">新窗口打开</el-button>
            <el-button @click="handleEdit" style="width:180px" type="primary" icon="edit">编 辑</el-button>
          </div>
        </div>
      </div>
      <div class="close" @click="handleClose">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </section>
</template>
<script>
import QRCode from 'qrcode'
import { vue2json } from '@/utils/vue2json'
export default {
  data() {
    return {
      releaseUrl: `http://127.0.0.1:3000/pages/${this.viewId}.html`,
      title: this.$store.state.editor.editorTheme.title || '',
      description: this.$store.state.editor.editorTheme.description || '',
      qrcodeSize: 500
    }
  },
  props: ['viewId', 'editItem'],
  mounted() {
    this.handleInitQRCode()
  },
  methods: {
    handleClose() {
      this.$emit('handleCloseView')
    },
    handleInitQRCode() {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.releaseUrl, { scale: 4 }, (err) => {
        console.log(err)
      })
    },
    handleOpenInNewTab() {
      window.open(this.releaseUrl)
    },
    handleSaveThemeTitle() {
      if (this.title === this.$store.state.editor.editorTheme.title) return
      this.handleUpdateTheme()
    },
    handleSaveThemeDesc() {
      if (this.description === this.$store.state.editor.editorTheme.description) return
      this.handleUpdateTheme()
    },
    handleUpdateTheme() {
      this.$store.commit('UPDATE_THEME_DESC', { title: this.title, description: this.description })
      const data = {
        ...this.editItem,
        title: this.$store.state.editor.editorTheme.title,
        description: this.$store.state.editor.editorTheme.description
      }
      this.$store.dispatch('saveTheme', vue2json(data)).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    handleDownQRcode() {

    },
    handleEdit() {
      const { id } = this.editItem

      this.$store.dispatch('setCurrentTheme', this.editItem)
      this.$store.dispatch('setCurrentPage', this.editItem.pages[0])
      const { type } = this.editItem
      if (type === 'html5') {
        this.$router.replace({
          name: 'MultipleHome',
          params: {
            id: id
          }
        })
      }

    },
  }
}

</script>
<style lang="scss" scoped>
.preview-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(15, 15, 15, 0.5);
  z-index: 1001;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  display: flex;

  .preview-wrapper {
    position: relative;
    width: 820px;
    height: 707px;
    border: 1px solid #222222;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 20px;
    background: #FFFFFF;

    .preview-main {
      width: 375px;
      height: 667px;
      float: left;

      iframe {
        width: 100%;
        height: 100%;
      }
    }

    .setting-container {
      color: #4a4a4a;
      font-size: 14px;
      float: right;
      width: 380px;

      .info-box {
        .input-item {
          margin-top: 10px;
        }
      }

      .qrcode-box {
        margin-top: 20px;
      }

      .code-box {
        .size {
          float: left;

          .radios {
            width: 80px;
            margin-top: 5px;
            margin-left: 30px;
            margin-bottom: 20px;

            label {
              margin-left: 0px;
              margin-top: 10px;
            }

            button {
              margin-top: 15px;
            }
          }
        }
      }

      .link {
        width: 100%;
        display: block;
      }

      .edit {
        text-align: center;
        margin-top: 20px;
      }
    }
  }

  .close {
    position: absolute;
    color: #FFFFFF;
    right: -30px;
    top: 0px;
    cursor: pointer;
  }
}

</style>
