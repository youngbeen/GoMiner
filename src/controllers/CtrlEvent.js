import Store from '../models/Store'
import Block from '../models/Block'
// import CtrlCharacter from '../controllers/CtrlCharacter'
import CtrlBlock from '../controllers/CtrlBlock'
import CtrlEnergy from '../controllers/CtrlEnergy'
import CtrlEffect from '../controllers/CtrlEffect'
import UtilGame from '../utils/UtilGame'

export default {
  // 地震事件 --
  makeEarthquake () {
    // 所有角色扣除能量，随机直接暴露10%还未暴露的块
    // 播放音效
    CtrlEffect.playSound('earthquake')

    // 循环扣除所有角色1~5点能量
    for (let i = 0; i < Store.characters.length; i++) {
      let quakeDamage = UtilGame.dice(5)

      CtrlEnergy.changeEnergy(i, -1 * quakeDamage)
    }

    // 暴露未暴露的块
    for (let i = 0; i < Block.blocks.length; i++) {
      if (!Block.blocks[i].isBlank && Block.blocks[i].inside !== 'trap' && (Block.blocks[i].dirt > 0 || Block.blocks[i].rock > 0 || Block.blocks[i].chest > 0)) {
        if (UtilGame.dice(10) === 10) {
          CtrlBlock.exposeSingleBlock(i)
        }
      }
    }
  }
}
