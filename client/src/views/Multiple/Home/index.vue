<template>
  <div class="page-container">
    <section class="edit-container">
      <Layer class="layer-page"></Layer>
      <Page class="canvas-container" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" :elements="editorPage.elements" :editorElement="element" :selectedElement="handleSelectedElement"></Page>
      <section class="panel-page">
        <Toolbar :toolbarClick="handleToolBarClick" :active="panel"></Toolbar>
        <div class="panel-wrapper scrollbar">
          <!-- 图片面板 -->
          <!-- panel不为 1 2 3 且小于 10时 默认显示该面板 -->
          <div class="panel panel-header">
            <div v-if="tab !== 1" class="panel-header_tab">
              <el-button type="success" class="el-btn" @click="handleSwitchTab(1)">更换背景</el-button>
              <el-button type="danger" class="el-btn" @click="handleCleanLayer">删除背景</el-button>
            </div>
            <div v-if="tab === 1" class="panel-header_tab">
              <img-panel @selectedImage="handelAddBgImageToTheme" :themeId="themeId"></img-panel>
            </div>
          </div>
          <!-- 文字面板 -->
          <div class="panel panel-text" v-show="panel === 1">
            <div class="btn title" @click="handleCreateTextElement('title')">插入标题</div>
            <div class="btn" @click="handleCreateTextElement('plain')">插入文本</div>
          </div>
          <div class="panel panel-picture" v-show="panel === 2">
            <img-panel @selectedImage="handlePictureToTheme" :themeId="themeId"></img-panel>
          </div>
          <div class="panel panel-video" v-show="panel === 3">
            视频面板
          </div>
          <edit-panel :element="element" :panel="panel" v-show="panel > 10"></edit-panel>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import Layer from '@/components/Layer'
import Toolbar from '@/components/Panel/Toolbar'
import EditPanel from '@/components/Panel/Edit'
import ImgPanel from '@/components/Panel/Img'
import Page from '@/components/Page'

const canvasW = 375
// 603 内容区高度
// 667 设计稿高度
const canvasH = 603
export default {
  name: 'MultipleHome',
  data() {
    return {
      themeId: null,
      tab: 0,
      panel: 0,
      canvasW,
      canvasH,
      elements: []
    }
  },
  watch: {
    element() {
      const ele = this.$store.state.editor.editorElement
      const type = ele ? ele.type : 'null'
      this.tab = 0 // 隐藏背景切换面板
      switch (type) {
        case 'text':
          this.panel = 11
          break
        case 'icon':
        case 'pic':
        case 'video':
          this.panel = 12
          break
        default:
          this.panel = 0

      }
    }
  },
  computed: {
    editorPage() {
      return this.$store.state.editor.editorPage
    },
    element() {
      return this.$store.state.editor.editorElement || {}
    }
  },
  mounted() {
    this.themeId = this.$route.params.id
    if (this.themeId) { // 编辑状态
      if (!this.pages) {
        this.$store.dispatch('getPageByThemeId', this.themeId)
      }
      this.getPicList(this.themeId)
    } else { // 制作状态
      this.$store.dispatch('createTheme', 'html5')
      this.$store.dispatch('addPageToTheme')
      this.$store.dispatch('cleanPictureList')

    }

  },
  // mounted () {
  //     this.itemId = this.$route.query.itemId
  //     if (this.itemId) {
  //       if (!this.pages) {
  //         this.$store.dispatch('getPageByThemeId', this.itemId)
  //       }
  //       this.getPicList(this.itemId)
  //       this.getVideoList(this.itemId)
  //     } else {
  //       this.$store.dispatch('createTheme')
  //       this.$store.dispatch('addPage')
  //       this.$store.dispatch('cleanPicList')
  //     }
  //     document.addEventListener('keyup', this.deleteListener)
  //     window.onbeforeunload = () => false
  //   },
  destroyed() {
    // document.removeEventListener('keyup', this.deleteListener)
    window.onbeforeunload = null
  },
  methods: {
    getPicList(id) {
      this.$store.dispatch('getPictureListByThemeId', id)
    },
    handelAddBgImageToTheme(data) {
      this.$store.dispatch('addBgImageToElement', { type: 'bg', imgSrc: data.file_path })
    },
    handlePictureToTheme(data) {
      const obj = {}
      obj.type = 'pic'
      obj.top = 0
      obj.left = 0
      obj.width = data.width
      obj.height = data.height
      obj.imgSrc = data.file_path
      obj.loop = data.loop
      this.$store.dispatch('addElementToTheme', obj)
      this.element.type = 'pic'
    },
    handleAnimationPlay() {
      console.log('play animation')
    },
    handleAnimationSave() {
      console.log('save animation')
    },
    handleSwitchPanel(state) {
      this.panel = state
    },
    handleToolBarClick(state) {
      // 4 和 5 不切换面板panel 保留在上一个激活面板即可
      if (state === 4) {
        this.handleAnimationPlay()
      } else if (state === 5) {
        this.handleAnimationSave()
      } else {
        this.handleSwitchPanel(state)
      }
    },
    handleSwitchTab(state) {
      this.tab = state
    },
    handleCleanLayer() {

    },
    handleSelectedElement(element) {
      this.$store.dispatch('setCurrentElement', element)
    },
    handleCreateTextElement(type) {
      const params = {}
      params['type'] = 'text'
      params['text'] = '输入文本'
      params['width'] = canvasW
      params['lineHeight'] = 1.5
      switch (type) {
        case 'plain':
          break
        case 'title':
          params['fontSize'] = 32
          params['fontWeight'] = 'bold'
          params['textAlign'] = 'center'
          break
        default:
      }
      this.$store.dispatch('addElementToTheme', params)
    }
  },
  components: {
    Layer,
    Toolbar,
    EditPanel,
    Page,
    ImgPanel
  }
}

</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;

  .edit-container {
    width: 100%;
    height: 100%
  }

  .canvas-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.layer-page {
  position: absolute;
  left: 0;
  width: 220px;
  height: 100%;
  z-index: 50
}

.panel-page {
  width: 400px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 20px;
  box-sizing: border-box;
  border-left: 1px solid #222222;
  z-index: 50;
}

.panel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  .panel {
    width: 100%;
    min-height: 100%;
    padding: 0 10px;
    padding-top: 23px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #262626;
  }

  .panel-header {

    .el-btn {
      width: 45%;
    }
  }

  .panel-text {
    padding-top: 20px;
    font-size: 18px;
    color: #B2BCBA;
    text-align: center;

    .btn {
      height: 50px;
      line-height: 50px;
      border: 2px solid transparent;

      &:hover {
        border-color: #222222
      }
    }

    .title {
      font-size: 32px;
      font-weight: bold;
    }
  }
}

</style>
