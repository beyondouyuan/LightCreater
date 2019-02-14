<template>
  <header class="header">
    <el-button type="primary" class="go-back btn" @click="handleGoBack">
      <i class="el-icon-arrow-left"></i>
      返回
    </el-button>
    <div class="panel">
      <el-button class="preview" type="primary" @click="handleDeploy">预览</el-button>
    </div>
  </header>
</template>
<script>
import { vue2json } from '@/utils/vue2json'
export default {
  props: {
    handleGoBack: Function
  },
  data() {
    return {

    }
  },
  methods: {
    handleDeploy() {
      this.$store.dispatch('saveTheme', vue2json(this.$store.state.editor.editorTheme)).then(() => {
        setTimeout(() => {
          this.$emit('deploySuccess')
        }, 1000)
      })
    }

  }
}

</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  color: #FFFFFF;
  background-color: #2B2B2B;

  .go-back {
    height: 100%;
    padding: 0 20px;
    cursor: pointer;
  }

  .el-icon-arrow-left {
    margin-right: 20px
  }

  .panel {
    float: right;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 15px;
    flex-direction: row-reverse;
  }
}

</style>
