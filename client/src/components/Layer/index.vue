<template>
  <div class="layer-container">
    <div class="layer-tab">
      <span class="panel-tab" :class="{active : view === 0}" @click="handleSwitchView(0)" v-if="viewEditor.editorTheme.type === 'html5'">页面</span>
      <span class="panel-tab" :class="{active : view === 1}" @click="handleSwitchView(1)">图层</span>
    </div>
    <ul class="list-container list-scrollbar page-container" style="z-index: 1">
      <li v-for="(item, index) of pages" :key="index">
        <div class="page-box" :class="{ active : item === editingPage }" :style="{ width: 131 + 8 + 'px', height: (131 / canvasW) * canvasH + 34 + 'px' }" @click="handlePageEditDidpatch(item)">
          <Page class="content" :style="{ width: canvasW + 'px', height: canvasH + 'px', transform: 'scale(' + 131 / canvasW +')' }" :elements="item.elements" />
          <div class="icons-box" v-if="viewEditor.editorTheme.type === 'html5'">
            <i class="icon el-icon-delete" @click="handleDeletePage(item)"></i>
            <i class="icon el-icon-document" @click="handleClonePage(item)"></i>
          </div>
        </div>
      </li>
    </ul>
    <div class="list-container list-scrollbar" style="z-index: 2" v-show="view === 1" :class="{ dragging: drag === 1 }">
      <ul>
        <li v-for="(item, index) of layerWithoutImgList" :key="index">
          <div class="layer-box" :class="{ active : editingLayer === item }" @click="handleLayerEditDidpatch($event, item)" @mousedown="handleLayerMove">
            <span
                class="thumb"
                :style="{ backgroundImage : `url(${host}${item.src})`}"
                ></span>
            {{ item.type }}
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) of layerWithImgList" :key="index">
          <div class="layer-box" :class="{ active : editingLayer === item }" @click="handleLayerEditDidpatch($event, item)" @mousedown="handleLayerMove">
            <span
                class="thumb"
                :style="{ backgroundImage : `url(${host}${item.src})`}"
                ></span>
            {{ item.type }}
          </div>
        </li>
      </ul>
    </div>
    <el-button v-if="viewEditor.editorTheme.type === 'html5'" type="primary" class="add-btn" icon="el-icon-plus" @click="handleAddPage"></el-button>
  </div>
</template>
<script>
const host = `http://127.0.0.1:8081`
import Page from '@/components/Page'
export default {
  data() {
    return {
      host,
      view: 0,
      drage: 0,
      canvasW: 375,
      drag: 0
    }
  },
  computed: {
    viewEditor() {
      return this.$store.state['editor']
    },
    pages() {
      return this.viewEditor['editorTheme']['pages']
    },
    editingPage() {
      return this.viewEditor['editorPage']
    },
    canvasH() {
      return this.viewEditor['canvasH']
    },
    layers() {
      return this.editingPage['elements']
    },
    layerWithImgList() {
      return this.layers && this.layers.filter(v => v['type'] === 'bg')
    },
    layerWithoutImgList() {
      return this.layers && this.layers.filter(v => v['type'] !== 'bg').reverse()
    },
    editingLayer() {
      return this.viewEditor['editorElement']
    }
  },
  mounted() {
    console.log(this.viewEditor.editorTheme.type)
  },
  methods: {
    handleSwitchView(state) {
      this.view = state
    },
    handleDeletePage(item) {
      this.$store.dispatch('deletePage', item)
    },
    handleClonePage(item) {
      this.$store.dispatch('copyPage', item)
    },
    handleAddPage() {
      this.$store.dispatch('addPageToTheme')
    },
    handleUpdateLayersSort() {
      this.$store.dispatch('sortElementsByZindex')
    },
    handleLayerMove(event) {
      let height = 30
      let timer = null
      let layer = event.target
      let li = layer.parentNode
      let parent = li.parentNode
      let liLen = parent.childNodes.length
      let startTop = li.offsetTop
      let startIndex = Math.round(startTop / height)
      let targetIndex = null
      let placeholder = document.createElement('li')
      placeholder.style = 'height: ' + height + 'px; background-color: #222222'
      const move = moveEvent => {
        if (!timer) {
          // 被拖动的层
          let top = moveEvent.clientY - event.clientY + startTop
          layer.setAttribute('data-moving', true)
          layer.style.top = top + 'px'
          this.drag = 1
          // 占位层
          let nowIndex = Math.round(top / height)
          nowIndex = nowIndex <= 0 ? 0 : nowIndex > liLen - 1 ? liLen - 1 : nowIndex
          if (targetIndex !== nowIndex) {
            (targetIndex || targetIndex === 0) && parent.removeChild(placeholder)
            targetIndex = nowIndex
            parent.insertBefore(placeholder, parent.childNodes[nowIndex + (startIndex >= targetIndex ? 0 : 1)])
          }
          // timer负责减少onmousemove对客户端的负担
          timer = setTimeout(() => {
            timer = null
          }, 20)
        }
      }
      const up = (upEvent) => {
        if (layer.getAttribute('data-moving')) {
          layer.removeAttribute('data-moving')
          layer.style.top = ''
          parent.removeChild(placeholder)
          this.layerWithoutImgList[startIndex]['zIndex'] = this.layerWithoutImgList[targetIndex]['zIndex'] + (targetIndex > startIndex ? -0.5 : 0.5)
          this.handleUpdateLayersSort()
        }
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        this.dragState = 0
      }
      if (liLen > 1) {
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
      }
    },
    handlePageEditDidpatch(item) {
      this.$store.dispatch('setCurrentPage', item)
    },
    handleLayerEditDidpatch(event, item) {
      this.$store.dispatch('setCurrentElement', item)
    },
    handleLayerSortUpdate() {

    }

  },
  components: {
    Page
  }

}

</script>
<style lang="scss" scoped>
.layer-container {
  position: relative;
  height: 100%;
  border-right: 1px solid #222222;

  .layer-tab {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .panel-tab {
      flex: 1;
      text-align: center;
      line-height: 40px;
      color: #B2BCBA;
      cursor: pointer;
      background-color: transparent;

      &.active {
        background-color: #2B2B2B;
      }
    }
  }

  .content {
    transform-origin: left top;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }

  .add-btn {
    margin-top: 30px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border: none;
  }

  .list-container {
    position: absolute;
    top: 40px;
    bottom: 50px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    color: #B2BCBA;
    background-color: #2B2B2B;
  }

  .page-container {
    li {
      margin-bottom: 15px;
    }
  }

  .page-box {
    margin: 0 auto;
    margin-bottom: 10px;
    position: relative;
    border-color: transparent;
    border-style: solid;
    border-width: 4px 4px 30px;
    box-sizing: border-box;
    background-color: #fff;

    .icons-box {
      display: none;
      width: 100%;
      position: absolute;
      bottom: -1.5em;
      right: .5em;
      color: #FFFFFF;

      .icon {
        float: right;
        margin-left: 1em;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    &.active {
      border-color: #18ccc0;

      .icons-box {
        display: block;
      }
    }
  }

  .layer-box {
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #222222;
    cursor: pointer;

    &[data-moving] {
      background-color: #222222;
      position: absolute;
      width: 100%;
    }

    &:hover {
      background-color: #222222;
    }

    &.active {
      background-color: #222222;
      color: #fff;
    }

    .thumb {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 1em;
      background: white center no-repeat;
      background-size: cover;
    }
  }

}

</style>
