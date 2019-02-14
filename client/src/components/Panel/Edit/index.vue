<template>
  <div class="panel panel-edit">
    <section class="panel-tab">
      <div class="tab" :class="{ active: tab === 0 }" @click="handleSwitchTab(0)">
        <span v-show="panel === 11">文本</span>
        <span v-show="panel === 12">元素</span>
      </div>
      <div class="tab" :class="{ active: tab === 1 }" @click="handleSwitchTab(1)">
        动作
      </div>
    </section>
    <section v-show="tab === 0">
      <!-- 文字编辑界面 -->
      <div v-show="panel === 11">
        <!-- 文本内容 -->
        <div class="edit-item">
          <label>文本内容</label>
          <div class="item-content">
            <el-input
              class="item-input"
              v-model="element.text"
              type="textarea"></el-input>
          </div>
        </div>
        <!-- 是否加醋 -->
        <div class="edit-item">
          <label>是否加醋</label>
          <div class="item-content">
            <el-checkbox
              v-model="element.fontWeight"
              true-label="bold"
              false-label="normal">加粗</el-checkbox>
          </div>
        </div>
        <!-- 对其方式 -->
        <div class="edit-item">
          <label>对齐方式</label>
          <div class="item-content">
            <el-button
              size="small"
              type="primary"
              @click="element.textAlign = 'left'">左对齐</el-button>
            <el-button
              size="small"
              type="primary"
              @click="element.textAlign = 'center'">居中</el-button>
            <el-button
              size="small"
              type="primary"
              @click="element.textAlign = 'right'">右对齐</el-button>
          </div>
        </div>
        <!-- 文字颜色 -->
        <div class="edit-item">
          <label>颜色</label>
          <div class="item-content">
            <el-input
              class="item-input"
              v-model="element.color"
              type="color"></el-input>
          </div>
        </div>
        <!-- 字体大小 -->
        <div class="edit-item">
          <label>字体大小</label>
          <div class="item-content">
            <el-input-number
              class="item-input"
              v-model="element.fontSize"
              type="color"></el-input-number>
          </div>
        </div>
        <!-- 行高 -->
        <div class="edit-item">
          <label>行高</label>
          <div class="item-content">
            <el-input-number
              class="item-input"
              v-model="element.lineHeight"
              type="color"></el-input-number>
          </div>
        </div>
        <!-- 字体 -->
        <div class="edit-item">
          <label>字体</label>
          <div class="item-content">
            <el-select
              placeholder="请选择字体"
              v-model="element.fontFamily"
              clearable>
            <el-option
              v-for="item in fontFamily"
              :label="item"
              :key="item"
              :value="item"></el-option>
          </el-select>
          </div>
        </div>
        <!-- 通用控件 -->
        <!-- 跳转链接 -->
        <div class="edit-item">
          <label>跳转链接</label>
          <div class="item-content">
            <el-input v-model="element.href"></el-input>
          </div>
        </div>
        <!-- 透明度 -->
        <div class="edit-item">
          <label>透明度</label>
          <div class="item-content">
            <el-input v-model="element.opacity"></el-input>
          </div>
        </div>
        <!-- 旋转角度 -->
        <div class="edit-item">
          <label>旋转角度</label>
          <div class="item-content">
            <el-input v-model="element.transform"></el-input>
          </div>
        </div>
        <!-- 宽度 -->
        <div class="edit-item">
          <label>宽度</label>
          <div class="item-content">
            <el-input v-model="element.width"></el-input>
          </div>
        </div>
        <!-- 高度 -->
        <div class="edit-item">
          <label>高度</label>
          <div class="item-content">
            <el-input v-model="element.height"></el-input>
          </div>
        </div>
        <!-- x轴坐标 -->
        <div class="edit-item">
          <label>x轴坐标</label>
          <div class="item-content">
            <el-input v-model="element.left"></el-input>
          </div>
        </div>
        <!-- y轴坐标 -->
        <div class="edit-item">
          <label>y轴坐标</label>
          <div class="item-content">
            <el-input v-model="element.top"></el-input>
          </div>
        </div>
      </div>
    </section>
    <!-- 动画库 -->
    <section v-if="tab === 1">
      <!-- 动画库 -->
      <div class="edit-item">
          <label>动画</label>
          <div class="item-content">
            <el-select
              placeholder="daneden/animate.css"
              v-model="element.animatedName"
              clearable>
            <el-option
              v-for="item in animateList"
              :label="item"
              :key="item"
              :value="item"></el-option>
          </el-select>
          </div>
        </div>
        <!-- 是否循环 -->
        <div class="edit-item">
          <label>是否循环</label>
          <div class="item-content">
            <el-checkbox v-model="element.loop">循环</el-checkbox>
          </div>
        </div>
        <!-- 动画速度 -->
        <div class="edit-item">
          <label>动画速度</label>
          <div class="item-content">
            <el-slider
              v-model="element.duration"
              :step="0.1"
              :min="0"
              :max="10"></el-slider>
          </div>
        </div>
        <!-- 动画延迟 -->
        <div class="edit-item">
          <label>动画延迟</label>
          <div class="item-content">
            <el-slider
              v-model="element.delay"
              :step="0.1"
              :min="0"
              :max="10"></el-slider>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
const animateList = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
  fontFamily = ['宋体', '微软雅黑', '幼体', '黑体', 'sans-serif']

export default {
  name: 'EditPanel',
  data() {
    return {
      tab: 0,
      animateList,
      fontFamily
    }
  },
  props: {
    panel: {
      type: Number
    },
    element: {
      type: Object
    }
  },
  methods: {
    handleSwitchTab(state) {
      this.tab = state
    }
  }
}

</script>
<style lang="scss" scoped>
  .panel-edit {
    z-index: 1;
    color: #B2BCBA;
    .edit-item {
      padding: 5px 0;
      clear: both;
      .item-content {
        margin-left: 80px;
      }
    }
    label {
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      line-height: 1;
      width: 70px;
      float: left;
      padding: 11px 12px 11px 0;
      box-sizing: border-box;
    }
  }
  .panel-tab {
    line-height: 40px;
    .tab {
      float: left;
      width: 50%;
      text-align: center;
      cursor: pointer;
      background-color: transparent;
      &.active {
        background-color: #2B2B2B;
      }
    }
  }
</style>
