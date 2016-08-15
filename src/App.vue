<template>
  <div id="app">
    <!-- 提供音效 -->
    <audio id="game-sound" src=""  autoplay></audio>

    <header-area></header-area>
    <container></container>
    <!-- 弹出技能选择界面 z-1200 -->
    <window-castskill></window-castskill>
    <!-- 弹出游戏回合切换界面 z-1300 -->
    <window-turn></window-turn>
    <!-- 弹出游戏模式选择界面 z-1900 -->
    <window-gamemode></window-gamemode>
  </div>
</template>

<script>
import CompSkill from './components/CompSkill'
import CompGameTurn from './components/CompGameTurn'
import CompMode from './components/CompMode'
import CompHeader from './components/CompHeader'
import CompContainer from './components/CompContainer'
import CtrlGame from './controllers/CtrlGame'

export default {
  methods: {
    initGame () {
      CtrlGame.initGame()
    },
    runGame () {
      CtrlGame.runGame()
    },
    openCheat () {
      CtrlGame.openCheat()
    }
  },
  components: {
    'window-castskill': CompSkill,
    'window-turn': CompGameTurn,
    'window-gamemode': CompMode,
    'header-area': CompHeader,
    container: CompContainer
  },
  events: {
    dispatchStartGame () {
      this.initGame()
    },
    dispatchRunGame () {
      this.runGame()
    },
    dispatchOpenCheat () {
      this.openCheat()
    }
  }
}
</script>

<style>
</style>
