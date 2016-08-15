<template>
  <div class="window-gameturn" v-show="isWindowShow">
    <span class="label-turn">{{ Game.turns }}</span>
  </div>
</template>

<script>
import Game from '../models/Game'
import Store from '../models/Store'

export default {
  data () {
    return {
      isWindowShow: false,
      Game
    }
  },
  methods: {
    // 隐藏回合窗口
    hideWindow () {
      this.isWindowShow = false
    }
  },
  ready () {
    let _this = this

    // 监视回合数变化
    this.$watch('Game.turns', function (newVal) {
      if (newVal > 0 && Store.characters.length > 1) {
        // 仅当回合数正常变化时，且多人模式才触发显示
        _this.isWindowShow = true
        // .5秒后自动消失
        let tc = window.setTimeout(function () {
          _this.isWindowShow = false
          window.clearTimeout(tc)
        }, 500 * 1)
      }
    })
  }
}
</script>

<style>
.window-gameturn {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(237,238,227, .9);

  z-index: 1300;
}

.label-turn {
  display: block;
  margin: 250px 0;
  height: 150px;
  line-height: 150px;

  color: rgb(56,136,219);
  font-size: 100px;
  text-align: center;
  text-shadow: 2px 2px 2px rgb(41,42,43);
}
</style>
