<template>
  <div class="block-row" id="block-row-{{ rowIdx }}">
    <block-item v-for="col in Block.cols" v-bind:row-idx="rowIdx" v-bind:col-idx="$index"></block-item>
  </div>
</template>

<script>
import Block from '../models/Block'
import CompBlockItem from './CompBlockItem'

export default {
  props: [
    'rowIdx'
  ],
  data () {
    return {
      Block
    }
  },
  components: {
    'block-item': CompBlockItem
  }
}
</script>

<style>
.block-row {
  height: 36px;
}
</style>
