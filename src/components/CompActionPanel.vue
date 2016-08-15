<template>
  <div class="bed-actions">
    <hr />
    <div class="box-action-tabs">
      <button class="btn btn-primary" v-show="!Game.isGameStarted" v-on:click="startGame()">
        <i class="fa fa-gamepad"></i> 开始游戏
      </button>
      <button class="btn btn-warning"  v-on:click="openCheat()">
        <i class="fa fa-bug"></i> TESTING
      </button>
    </div>
  </div>
</template>

<script>
import Game from '../models/Game'

export default {
  data () {
    return {
      Game
    }
  },
  methods: {
    startGame () {
      this.$dispatch('dispatchRunGame')
    },
    openCheat () {
      this.$dispatch('dispatchOpenCheat')
    }
  }
}
</script>

<style></style>
