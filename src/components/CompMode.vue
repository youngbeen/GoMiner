<template>
  <div class="window-gamemode" v-show="Game.isModeWindowShow">
    <!-- 游戏模式标题 -->
    <div class="row bed-modetitle">
      <div class="col-md-3"></div>
      <div class="col-md-6 mode-head">
        Go! Go! Miner!
      </div>
      <div class="col-md-3"></div>
    </div>
    <!-- 游戏模式选择 -->
    <div class="row bed-modes">
      <div class="col-md-3"></div>
      <div class="col-md-3">
        <div class="col-md-2"></div>
        <div class="col-md-8" v-bind:class="{ 'mode-item': selectedMode !== 'single', 'mode-item-selected': selectedMode === 'single' }" v-on:click="changeMode('single')">
          <div class="mode-title">单人模式</div>
          <div class="mode-subtitle">Single Mode</div>
        </div>
        <div class="col-md-2"></div>
      </div>
      <div class="col-md-3">
        <div class="col-md-2"></div>
        <div class="col-md-8" v-bind:class="{ 'mode-item': selectedMode !== 'multi', 'mode-item-selected': selectedMode === 'multi' }" v-on:click="changeMode('multi')">
          <div class="mode-title">多人模式</div>
          <div class="mode-subtitle">Multi Mode</div>
        </div>
        <div class="col-md-2"></div>
      </div>
      <div class="col-md-3"></div>
    </div>
    <!-- 游戏模式按钮 -->
    <div class="row bed-btns">
      <div class="col-md-3"></div>
      <div class="col-md-6 box-btns">
        <button class="btn btn-primary btn-confirm" v-on:click="confirmMode()">确 认</button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
  import Game from '../models/Game'

  export default {
    data () {
      return {
        selectedMode: 'single',
        Game
      }
    },
    methods: {
      changeMode (sMode) {
        if (sMode) {
          this.selectedMode = sMode
        }
      },

      confirmMode () {
        if (this.selectedMode) {
          this.Game.gameMode = this.selectedMode
          // 隐藏窗口
          this.Game.isModeWindowShow = false
          // 初始化游戏
          this.$dispatch('dispatchStartGame')
        }
      }
    }
  }
</script>

<style>
.window-gamemode {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: white;

  z-index: 1900;
}

.bed-modetitle {

}

.mode-head {
  margin: 40px 0 60px;

  font-size: 48px;
  text-align: center;
}

.bed-modes {
  /*margin-top: 10%;*/
}

.mode-item {
  /*margin: 0 30px;*/
  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0);
  border-radius: 4px;

  color: rgb(236,246,238);
  background-color: rgb(111,175,107);

  text-shadow: 1px 1px 1px rgb(15,16,17);

  cursor: pointer;
}

.mode-item-selected {
  border-width: 2px;
  border-style: solid;
  border-color: rgba(42,41,41,1);
  border-radius: 4px;

  color: rgb(236,246,238);
  background-color: rgb(92,209,85);

  text-shadow: 1px 1px 1px rgb(15,16,17);

  cursor: pointer;
}

.mode-item:hover, .mode-item-selected:hover {
  background-color: rgb(146,198,143);
}

.mode-title {
  margin-top: 18px;

  font-size: 32px;
  text-align: center;
}

.mode-subtitle {
  margin-bottom: 18px;

  text-align: center;
}

.bed-btns {
  margin-top: 60px;
}

.box-btns {
  text-align: center;
}

.btn-confirm {
  font-size: 28px;
}
</style>
