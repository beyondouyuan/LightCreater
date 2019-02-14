<template>
  <aside class='element' @mousedown="handleMousedown">
    <Operate class="operate" v-show="element === editingElement" :element="element" />
    <section class="content">
      <div :class="element['playing'] && 'animated ' + this.element['animatedName']" :style="styleAnimated">
        <div :style="styleBasic">{{ element.text }}</div>
      </div>
    </section>
  </aside>
</template>
<script>
import Operate from '@/components/Operate/Add'
export default {
  data() {
    return {

    }
  },
  props: ['element'],
  computed: {
    editingElement() {
      return this.$store.getters['editingElement']
    },
    styleAnimated() {
      return {
        animationIterationCount: this.element['loop'] ? 'infinite' : 'initial',
        animationDuration: this.element['duration'] + 's',
        animationDelay: this.element['delay'] + 's'
      }
    },
    styleBasic() {
      return {
        width: this.element['width'] + 'px',
        lineHeight: this.element['lineHeight'],
        color: this.element['color'],
        textAlign: this.element['textAlign'],
        fontSize: this.element['fontSize'] + 'px',
        fontWeight: this.element['fontWeight'],
        'font-family': this.element['fontFamily'],
        opacity: this.element['opacity'] / 100,
        transform: 'rotate(' + this.element['transform'] + 'deg' + ')'
      }
    }
  },
  methods: {
    handleMousedown(event) {
      let ele = this.element
      let startY = event.clientY
      let startX = event.clientX
      let startTop = ele['top']
      let startLeft = ele['left']
      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        ele['top'] = currY - startY + startTop
        ele['left'] = currX - startX + startLeft
      }
      let up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  },
  components: {
    Operate
  }
}

</script>
<style lang='scss' scoped>
.element {
  position: absolute;
  cursor: move;
}

.operate {
  z-index: 2;
}

.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  position: relative;
  z-index: 1;
}

</style>
