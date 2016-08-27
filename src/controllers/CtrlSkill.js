import Store from '../models/Store'
import Game from '../models/Game'
import UtilGame from '../utils/UtilGame'
import CtrlEnergy from './CtrlEnergy'

export default {
  // 技能中以r开头的方法指 race skill
  // 以g开头的方法指 given skill

  // 灰土挑拣 -- [破坏的block数量], [玩家索引]
  rGainDirt (blockCount, playerIdx) {
    blockCount = blockCount || 1  // 默认破坏1个block
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    // 破坏灰土时有一定几率（20%）回复1点能量
    let recoveredEnergy = 0
    for (let i = 0; i < blockCount; i++) {
      if (UtilGame.dice(5) === 5) {
        recoveredEnergy++
      }
    }

    if (recoveredEnergy) {
      // 执行回复能量操作
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, recoveredEnergy)
      // console.log('recover', recoveredEnergy, ' energy')
    }
  },

  // 蛮力 -- [玩家索引]
  rBigPower (playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    // power +1
    return Store.characters[Game.currentPlayerIdx].power + 1
  },

  // 矮人血脉 -- 原始金币数量
  rDwrafBlood (gold) {
    if (gold !== undefined && gold != null) {
      // 获取的金币数量增加10%
      return Math.round(gold * 1.1)
    } else {
      return 0
    }
  }
}
