<template>
  <div class="block-item" id="block-item-{{ rowIdx }}-{{ colIdx }}" v-on:click="dig()" v-on:mouseOver="check()" v-on:mouseOut="resume()" v-bind:style="{ cursor: cursor }">
    <!-- 角色 -->
    <img class="block-img" v-bind:src="playerImg" v-show="isShowPlayer" alt="角色" title="{{ playerName }}"v-bind:style="{ cursor: cursor }" />
    <!-- 结果 -->
    <img class="block-img" v-bind:src="goldImg" v-show="isShowGold" alt="财宝" title="点击获取财宝" />
    <img class="block-img" src="../assets/img/trap.png" v-show="isShowTrap" alt="陷阱" title="陷阱" />
    <img class="block-img" src="../assets/img/food.png" v-show="isShowFood" alt="食物" title="点击食用食物" />
    <img class="block-img" src="../assets/img/potion.png" v-show="isShowPotion" alt="药水" title="点击使用药水" />
    <img class="block-img" src="../assets/img/fire.png" v-show="isShowFire" alt="火焰" title="点击使用" />
    <img class="block-img" src="../assets/img/chance.png" v-show="isShowChance" alt="?" title="?" />
    <!-- 宝箱 -->
    <img class="block-img" src="../assets/img/chest.png" v-show="isShowChest" alt="宝箱" title="点击打开宝箱" />
    <!-- 岩石 -->
    <img class="block-img" src="../assets/img/rock.png" v-show="isShowRock" alt="岩石" title="点击清理岩石" />
    <!-- 灰土 -->
    <img class="block-img" src="../assets/img/dirt.png" v-show="isShowDirt" alt="灰土" title="点击清理灰土" />
    <!-- 黑夜模式遮盖 -->
    <div class="night-cover" v-show="Game.dayTime === 'night' && !Game.isGoodVision && !nearPlayer"></div>
  </div>
</template>

<script>
import Game from '../models/Game'
import Store from '../models/Store'
import Block from '../models/Block'
import CtrlGame from '../controllers/CtrlGame'
import CtrlBlock from '../controllers/CtrlBlock'

export default {
  props: [
    'rowIdx',
    'colIdx'
  ],
  data () {
    return {
      playerName: '',
      playerImg: '',
      goldImg: '',
      cursor: 'default',
      Game,
      Store,
      Block
    }
  },
  computed: {
    isShowPlayer () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].playerIdx !== '') {
        this.playerName = Store.characters[Block.blocks[blockIdx].playerIdx].name
        this.playerImg = './static/img/player' + (Store.characters[Block.blocks[blockIdx].playerIdx].role + 1) + '.png'
        return true
      } else {
        this.playerName = ''
        this.playerImg = ''
        return false
      }
    },
    // 根据inside类型显示金币
    isShowGold () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'gold') {
        // 金币数额5~35
        let goldLv = 1
        let goldNum = Block.blocks[blockIdx].num
        if (goldNum > 30) {
          goldLv = 4
        } else if (goldNum > 20) {
          goldLv = 3
        } else if (goldNum > 10) {
          goldLv = 2
        }
        this.goldImg = './static/img/gold' + goldLv + '.png'
        return true
      } else {
        this.goldImg = ''
        return false
      }
    },
    // 根据inside类型显示陷阱
    isShowTrap () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'trap') {
        return true
      } else {
        return false
      }
    },
    // 根据inside类型显示食物
    isShowFood () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'food') {
        return true
      } else {
        return false
      }
    },
    // 根据inside类型显示药水
    isShowPotion () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'potion') {
        return true
      } else {
        return false
      }
    },
    // 根据inside类型显示火焰
    isShowFire () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'fire') {
        return true
      } else {
        return false
      }
    },
    // 根据inside类型显示机会
    isShowChance () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].inside === 'random') {
        return true
      } else {
        return false
      }
    },
    // 根据宝箱hp来确定是否显示
    isShowChest () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].chest > 0) {
        return true
      } else {
        return false
      }
    },
    // 根据岩石hp来确定是否显示
    isShowRock () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].rock > 0) {
        return true
      } else {
        return false
      }
    },
    // 根据灰土hp来确定是否显示
    isShowDirt () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].dirt > 0) {
        return true
      } else {
        return false
      }
    },
    // 是否在角色周围，用于协助配合黑夜模式
    nearPlayer () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (CtrlBlock.isNearPlayer(blockIdx, true)) {
        return true
      }
      return false
    }
  },
  methods: {
    // 清理，挖掘
    dig () {
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (blockIdx === Store.characters[Game.currentPlayerIdx].location) {
        // 点击角色本身，呼出技能窗口
        CtrlGame.showSkillWindow()
      } else {
        CtrlGame.dig(this.rowIdx, this.colIdx)
      }
    },
    // 浏览检视
    check () {
      // 检视的block现在有3种关注的结果，可挖掘，可移动，以及非法
      let blockIdx = CtrlBlock.getBlockIdx(this.rowIdx, this.colIdx)

      if (Block.blocks[blockIdx].isBlank) {
        // 空block，判断是否可移动
        if (CtrlBlock.isBlockAvailable(blockIdx)) {
          // 可移动
          this.cursor = 'pointer'
          return
        }
      } else if (blockIdx === Store.characters[Game.currentPlayerIdx].location) {
        // 角色本身
        this.cursor = 'pointer'
        return
      } else {
        // 非空block，判断是否可挖掘
        // 机械手臂 race skill
        if (Store.characters[Game.currentPlayerIdx].raceSkills.indexOf(2) !== -1) {
          if (CtrlBlock.isNearPlayer(blockIdx)) {
            // 可挖掘
            this.cursor = 's-resize'
            return
          }
        } else {
          if (CtrlBlock.isAroundPlayer(blockIdx)) {
            // 可挖掘
            this.cursor = 's-resize'
            return
          }
        }
      }

      // 非法移动
      this.cursor = 'not-allowed'
      // 透视眼技能下可以观察周围的block中的内容
      // TODO:
    },
    // 恢复，重置block
    resume () {
      // 恢复block显示的图标
      this.cursor = 'default'
    }
  }
}
</script>

<style>
.block-item {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;

  border: 1px solid rgba(0, 0, 0, 0);
  /*border-radius: 4px;*/
  background-color: rgb(125,120,106);

  text-align: center;

  overflow: hidden;
  /*cursor: pointer;*/
}

.block-item:hover {
  background-color: rgb(222,223,233);
}

.block-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.night-cover {
  position: relative;
  width: 100%;
  height: 100%;

  background-color: black;

  z-index: 100;
}
</style>
