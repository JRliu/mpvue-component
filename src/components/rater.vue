<template>
  <div class="app-rater">
    <div class="wrap  app-flex app-flex-start">
      <div class="item"
        v-for="(item, index) in 5" :key="index"
        @click='handlerClick(index+1)'
        >
        <div :style='{color:activeColor,fontSize: fontSize}'  v-if='value>=(index+1)'>{{text}}
          <slot name="active"></slot>
        </div>
        <div :style='{color:color,fontSize: fontSize}'  v-else>{{text}}
          <slot name="default"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '★'
    },
    value: {
      type: Number,
      dafault: 1
    },
    color: {
      type: String,
      default: '#c4c4c4'
    },
    activeColor: {
      type: String,
      default: '#ff3366'
    },
    fontSize: {
      type: String,
      default: '20px'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handlerClick (index) {
      this.$emit('update:value', index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-rater{
    .item{
      margin: 0 4px;
      p{
        font-weight: 700;
      }
    }
  }
</style>
