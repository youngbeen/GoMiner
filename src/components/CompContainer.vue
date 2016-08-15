<template>
  <div class="bed-container" v-show="Game.isGameStarted">
    <div class="box-container">
      <block-row v-for="row in Block.rows" v-bind:row-idx="$index"></block-row>
    </div>
  </div>
</template>

<script>
import Block from '../models/Block'
import Game from '../models/Game'
import CompBlockRow from './CompBlockRow'

export default {
  data () {
    return {
      Block,
      Game
    }
  },
  components: {
    'block-row': CompBlockRow
  }
}
</script>

<style>
.bed-container {
  margin: 165px 10px 5px;

  padding: 5px 10px;
  text-align: center;
  /*border-radius: 6px;*/
}

.box-container {
  display: inline-block;

  border: 50px solid rgb(116,85,65);
}
</style>
