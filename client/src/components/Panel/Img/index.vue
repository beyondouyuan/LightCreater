<template>
  <div class="panel panel-img">
    <picture-picker @uploaded="uploadedCallback" :themeId="themeId"></picture-picker>
    <div class="ele"
         :style="{ backgroundImage: 'url(' + item.file_path + ')' }"
         @click="handleSelected(item)"
         v-for="item in picList"></div>
  </div>
</template>

<script>
import PicturePicker from '@/components/PicturePicker'
export default {
  props: {
    element: {
      type: Object
    },
    panelState: {
      type: Number
    },
    themeId: {
      type: String
    }
  },
  data() {
    return {
      panelTabState: 0,
      animateList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
      fontFamily: ['宋体', '微软雅黑', '幼体', '黑体', 'sans-serif']
    }
  },
  computed: {
    picList () {
      return this.$store.state.editor.picList
    }
  },
  methods: {
    uploadedCallback(data) {
      this.$store.dispatch('savePicture', {
        'file_path': data['file_path'],
        'themeId': data['theme_id'],
        'width': data['width'],
        'height': data['height']
      })
    },
    handleSelected(item) {
      this.$emit('selectedImage', item)
    }
  },
  components: {
    PicturePicker
  }
}

</script>

<style lang="scss" scoped>
.panel-img {
  z-index: 1;

  .item {
    padding: 5px 0;
    clear: both;

    .content {
      margin-left: 70px;
    }
  }

  label {
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    width: 70px;
    float: left;
    padding: 11px 12px 11px 0;
  }
}

.panel-tab {
  line-height: 40px;
  margin: -10px -10px 10px;

  .tab {
    float: left;
    width: 50%;
    text-align: center;
    cursor: pointer;
    background-color: #d6d6d6;

    &.active {
      background-color: transparent;
    }
  }
}
.ele {
  float: left;
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 5px 5px;
  &:hover {
    border: 2px solid #18ccc0;
    cursor: pointer;
  }
}

</style>
