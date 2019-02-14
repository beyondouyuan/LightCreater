<template>
  <div class="page-container">
    <section class="theme-container">
      <ul class="theme-list">
        <li class="theme-item create-item">
          <div class="create-box">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">创建作品</el-button>
          </div>
        </li>
        <template v-for="(item, index) of list">
          <li :key="index" class="theme-item">
            <div class="theme-thumb">
              <!-- <img src="static/images/ouyuan.jpg" :alt="item.title"> -->
              <img :src="renderPlaceImage(item.pages)" :alt="item.title">
              <div class="cover-box">
                <div class="tool-bar">
                  <el-tooltip class="bar-item" effect="dark" content="编辑" placement="top-start">
                    <i class="el-icon-edit" @click="handleEdit(item)"></i>
                  </el-tooltip>
                  <el-tooltip class="bar-item" effect="dark" content="删除" placement="top-start">
                    <i class="el-icon-delete" @click="handleDelete(item)"></i>
                  </el-tooltip>
                </div>
                <div class="preview-box" @click="handlePreview(item)"><span>预览</span></div>
              </div>
            </div>
            <div class="theme-footer">
              <div class="item-title">{{item.title}}</div>
              <div class="item-txt item-description">{{item.description}}</div>
              <div class="item-txt item-createdtime">{{item.update_time | parseTime}}</div>
            </div>
          </li>
        </template>
      </ul>
    </section>
    <preview :viewId="viewId" :editItem="editItem" @handleCloseView="showPreview = false" v-if="showPreview" />
  </div>
</template>
<script>
import { vue2json } from '@/utils/vue2json'
import Preview from '@/components/Preview'
export default {
  name: 'MultipleTheme',
  data() {
    return {
      showPreview: false,
      viewId: null,
      editItem: null
    }
  },
  computed: {
    list() {
      return this.$store.state.editor.themeList
    }
  },
  mounted() {
    this.$store.dispatch('getThemeList', 'html5')
  },

  methods: {
    renderPlaceImage(pages) {
      if (pages.length > 0 && pages[0].elements[0]) {
        return pages[0].elements[0].imgSrc
      }

    },
    handleCreate() {
      this.$store.dispatch('createTheme', 'html5')
      this.$store.dispatch('addPageToTheme')

      this.$store.dispatch('saveTheme', vue2json(this.$store.state.editor.editorTheme)).then(() => {
        this.$router.replace({
          name: 'MultipleHome',
          params: {
            id: this.$store.state.editor.editorTheme.id
          }
        })
      })
    },
    handleEdit(item) {
      const { id } = item
      this.$store.dispatch('setCurrentTheme', item)
      this.$store.dispatch('setCurrentPage', item.pages[0])
      this.$router.replace({
        name: 'MultipleHome',
        params: {
          id: id
        }
      })
    },
    handleDelete(item) {
      this.$store.dispatch('deleteTheme', item)
    },
    handlePreview(item) {
      const { id } = item
      this.showPreview = true
      this.viewId = id
      this.editItem = item
    }
  },
  components: {
    Preview
  }
}

</script>
<style lang="scss" scoped>
.page-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
}

.theme-container {
  width: 100%;
  height: 100%;

  .theme-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .theme-item {
      width: 16vw;
      margin-bottom: 10px;
      box-sizing: border-box;

      &:not(:nth-of-type(5n+1)) {
        padding-left: 15px;
      }

      .theme-thumb {
        position: relative;

        img {
          width: 100%;
          height: 16vw;
        }

        .cover-box {
          display: none;
          position: absolute;
          width: 100%;
          height: 16vw;
          top: 0;
          background-color: rgba(0, 0, 0, .5);
        }

        .tool-bar {
          font-size: 18px;
          color: #FFFFFF;
          text-align: right;
          cursor: pointer;
          padding: 10px;

          i {
            margin: 5px
          }
        }

        .preview-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          span {
            font-size: 20px;
            color: #FFFFFF;
            cursor: pointer;
            padding: 5px 10px;
            border: 1px solid #FFFFFF
          }
        }

        &:hover {
          .cover-box {
            display: block;
          }
        }
      }

      .theme-footer {
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;

        .item-title {
          width: 100%;
          font-size: 14px;
          color: #4A4A4A;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-txt {
          font-size: 14px;
          color: #83817B;
          margin-top: 12px;
          overflow: hidden;
          max-height: 40px;
          line-height: 1.5;
        }
      }

      .create-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

</style>
