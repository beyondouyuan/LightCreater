<template>
  <div :class="[type !== 'see' ? 'canvas' : '' ]" @click="handleCleanSelected">
    <template v-for="(item, index) of elements">
      <div v-if="item.type === 'bg'" class="bg-layer">
        <div class="wrapper">
          <img :src="item.imgSrc" :alt="item.title" style="width: 100%;height: 100%;">
        </div>
        </div>
        <div class="item-box" @click="handleSelectedElement(item)">
          <FontPanel class="element" v-if="item.type === 'text'" :element="item" :style="elementPosition(item)"></FontPanel>
          <PicturePanel :fileType="item.type" v-if="item.type==='pic' || item.type==='video'" :class="[item.playing?'animated ' + item.animatedName:'',item.loop?'infinite':'']" :element="item"
                    :style="{transform:'rotate('+item.transform+'deg)','z-index':item.zIndex,opacity:item.opacity/100,width:item.width+'px',height:item.height+'px',top:item.top+'px',left:item.left + 'px','animation-duration':item.duration + 's','-webkit-animation-duration':item.duration + 's','animation-delay':item.delay + 's','-webkit-animation-delay':item.delay + 's'}"
                    :showOperate="editorElement == item">
        </PicturePanel>
        </div>
    </template>
  </div>
</template>
<script>
import 'animate.css'
import FontPanel from '@/components/Element/Font'
import PicturePanel from '@/components/Element/Picture'
export default {
  data() {
    return {
      // type: 'canvas'
    }
  },
  computed: {
    elementPosition() {
      return (ele) => {
        return {
          zIndex: ele['zIndex'],
          top: ele['top'] + 'px',
          left: ele['left'] + 'px'
        }
      }
    }
  },
  props: {
    elements: {
      type: Array,
      default: () => {
        return []
      }
    },
    editorElement: {
      type: Object
    },
    type: 'canvas'
  },
  methods: {
    handleCleanSelected() {
      this.$store.dispatch('setCurrentElement', null)
    },
    handleSelectedElement(element) {
      this.$store.dispatch('setCurrentElement', element)
    }
  },
  components: {
    FontPanel,
    PicturePanel
  }
}

</script>
<style lang="scss" scoped>
div {
  -webkit-animation-fill-mode: none
}

.canvas {
  position: relative;
  margin: 0 auto;
  background-color: #FFFFFF
}

</style>
