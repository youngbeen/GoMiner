import Game from '../models/Game'
import Store from '../models/Store'
import Block from '../models/Block'
import CtrlEffect from './CtrlEffect'
import CtrlEvent from './CtrlEvent'
import CtrlCharacter from './CtrlCharacter'
import CtrlBlock from './CtrlBlock'
import CtrlEnergy from './CtrlEnergy'
import CtrlGold from './CtrlGold'
import CtrlMagic from './CtrlMagic'
import CtrlSp from './CtrlSp'
import CtrlSkill from './CtrlSkill'
import UtilGame from '../utils/UtilGame'

export default {
  // 初始化游戏
  initGame () {
    this.initGameData()
  },

  // 运行游戏
  runGame () {
    // 检验游戏开始的必要参数条件
    if (Store.characters.length && Block.total && Block.blocks.length) {
      // 开始运行
      CtrlEffect.playSound('start')

      Game.turns = 1
      Game.isGameStarted = true
      this.turnPlayer()
    } else {
      // 游戏无法正常运行
      console.warn('Error: cannot launch the game in CtrlGame-runGame')
      Game.isModeWindowShow = true
      return false
    }
  },

  // 结束游戏 --
  endGame () {
    // TODO
    console.log('game end')
  },

  // 切换游戏角色控制权
  turnPlayer () {
    if (Game.currentPlayerIdx === '') {
      // 游戏第一次开启，故意设置为-1
      Game.currentPlayerIdx = -1
    }
    let currentIdx = Game.currentPlayerIdx
    let hasValidPlayer = false
    for (let i = currentIdx + 1; i < Store.characters.length; i++) {
      if (!Store.characters[i].hasActed && Store.characters[i].energy > 0) {
        // 当前角色未行动过并且还存有能量，转交控制权
        hasValidPlayer = true
        Game.currentPlayerIdx = i
        break
      }
    }

    // 校验游戏结束
    if (this.isGameEnd()) {
      this.endGame()

      return
    }

    // 无有效角色可以转交控制权，需要重新切换回合
    if (!hasValidPlayer && this.isEndOfTurn()) {
      this.changeTurn()
    }
  },

  // 切换回合
  changeTurn () {
    // 重置角色行动标记
    CtrlCharacter.resetAct()
    // 重置当前角色索引
    Game.currentPlayerIdx = ''

    // 回合计算增加
    Game.turns += 1
    Game.timeTurnCount += 1
    // 处理时间更替
    if (Game.dayTime === 'day' && Game.timeTurnCount > 10) {
      Game.dayTime = 'night'
      Game.timeTurnCount = 1

      CtrlEffect.playSound('night')
    } else if (Game.dayTime === 'night' && Game.timeTurnCount > 5) {
      Game.dayTime = 'day'
      Game.timeTurnCount = 1

      CtrlEffect.playSound('morning')
    }

    // 处理游戏事件（依赖回合的）
    this.runGameEventsOnTurn()

    // 重新切换控制权
    this.turnPlayer()
  },

  // 判断是否应该回合结束
  isEndOfTurn () {
    let result = true
    for (let i = 0; i < Store.characters.length; i++) {
      if (!Store.characters[i].hasActed && Store.characters[i].energy > 0) {
        result = false
        break
      }
    }

    return result
  },

  // 回合切换时处理的游戏事件 --
  runGameEventsOnTurn () {
    // 处理地震事件，9倍数回合发生地震
    if ((Game.turns % 9) === 0) {
      CtrlEvent.makeEarthquake()
    }
  },

  // 校验游戏结束 --
  isGameEnd () {
    // 当所有角色的能量值都为0的情况，认为游戏应该结束
    let result = true

    for (let i = 0; i < Store.characters.length; i++) {
      if (Store.characters[i].energy > 0) {
        result = false
        break
      }
    }

    return result
  },

  // 初始化游戏参数
  initGameData () {
    // 清空垃圾数据
    CtrlCharacter.clearPlayers()

    // 根据游戏模式设置角色数据
    Game.gameMode = Game.gameMode || 'single'
    if (Game.gameMode === 'single') {
      // 单人模式
      CtrlCharacter.addPlayer('You')
    } else if (Game.gameMode === 'multi') {
      // 多人模式 TODO:
      CtrlCharacter.addPlayer('PlayerA')
      CtrlCharacter.addPlayer('PlayerB')
    } else {
      // 不明，非法的游戏模式，重新弹出模式选择界面
      console.warn('Error: unknow game mode in CtrlGame')
      Game.isModeWindowShow = true
      return false
    }

    // 初始化blocks
    this.initBlocks()

    // 初始化角色
    this.initCharacterRole()
    // 初始化角色技能
    this.initCharacterSkill()
    // 初始化角色位置
    this.initPlayerLocation()
    // 初始化环境时间
    this.initGameTime()
  },

  // 初始化blocks参数
  initBlocks () {
    // 清空垃圾数据(外带计数参数等)
    CtrlBlock.clearBlocks(true)

    // 根据block模式设置block数据
    // block模式，mirco - 微型（10x10约100块）, small - 小型（12x15约180块）, medium - 中型（15x18约270块）, large - 大型（15x22约330块）
    Game.blockMode = Game.blockMode || 'small'
    if (Game.blockMode === 'micro') {
      // 微型
      CtrlBlock.setCounts(10, 10)
    } else if (Game.blockMode === 'small') {
      // 小型
      CtrlBlock.setCounts(12, 15)
    } else if (Game.blockMode === 'medium') {
      // 中型
      CtrlBlock.setCounts(15, 18)
    } else if (Game.blockMode === 'large') {
      // 大型
      CtrlBlock.setCounts(15, 22)
    }

    CtrlBlock.generateAllBlocks()
  },

  // 初始化角色 --
  initCharacterRole () {
    // 现在不允许自由选择角色，随机分配生成
    // TODO: 测试阶段，指定分配的角色跟技能
    CtrlCharacter.changeRole(0, 1)
    // let playerCounts = Store.characters.length
    // let roles = UtilGame.multiDice(playerCounts, 12)
    //
    // for (let i = 0; i < playerCounts; i++) {
    //   CtrlCharacter.changeRole(i, roles[i] - 1)
    // }
  },

  // 初始化角色技能 --
  initCharacterSkill () {
    let playerCounts = Store.characters.length

    for (let i = 0; i < playerCounts; i++) {
      let roleInfo = CtrlCharacter.getRaceSkillByRoleId(Store.characters[i].role)
      // 将对应的race skill 添加到角色数据里面
      CtrlCharacter.addRaceSkill(roleInfo.raceSkill, i)
    }
  },

  // 初始化角色位置 --
  initPlayerLocation () {
    // 几个角色，放到什么位置
    let playerCounts = Store.characters.length
    let blockCounts = Block.total
    // 生成随机的角色位置结果数组（注意结果从1开始，而索引从0开始）
    let locations = UtilGame.multiDice(playerCounts, blockCounts)

    for (let i = 0; i < playerCounts; i++) {
      let tarIdx = locations[i] - 1
      // 清除目标block
      CtrlBlock.clearSingleBlock(tarIdx)
      // 放置角色
      CtrlCharacter.setPlayer(tarIdx, i)
      console.log('放置角色，', tarIdx)
    }
  },

  // 初始化游戏中时间
  initGameTime () {
    // 游戏从白天开始，按照白天10回合，黑夜5回合更替
    Game.dayTime = 'day'
    Game.timeTurnCount = 1
  },

  // 打开作弊器，测试使用
  openCheat () {
    Game.isCheatShow = !Game.isCheatShow
  },

  // 切换视野
  toggleVision () {
    Game.isGoodVision = !Game.isGoodVision
  },

  // 展示技能窗口 --
  showSkillWindow () {
    Game.isSkillWindowShow = true
  },

  // 隐藏技能窗口 --
  hideSkillWindow () {
    Game.isSkillWindowShow = false
  },

  // 清理block
  dig (rowIdx, colIdx) {
    rowIdx = parseInt(rowIdx) || 0
    colIdx = parseInt(colIdx) || 0

    let blockIdx = CtrlBlock.getBlockIdx(rowIdx, colIdx)
    let noAct = false    // 是否不消耗行动
    // 当目标block有效，角色未行动，并且角色仍然有能力的情况下，才执行
    if (Block.blocks[blockIdx] && !Store.characters[Game.currentPlayerIdx].hasActed && Store.characters[Game.currentPlayerIdx].energy > 0) {
      if (Block.blocks[blockIdx].dirt > 0) {
        // 处理dirt
        // 检查是否可以挖掘
        if (CtrlBlock.isAroundPlayer(blockIdx)) {
          this.digDirt(blockIdx)
        } else {
          noAct = true
        }
      } else if (Block.blocks[blockIdx].rock > 0) {
        // 处理rock
        // 检查是否可以挖掘
        if (CtrlBlock.isAroundPlayer(blockIdx)) {
          this.digRock(blockIdx)
        } else {
          noAct = true
        }
      } else if (Block.blocks[blockIdx].chest > 0) {
        // 处理chest
        // 检查是否可以挖掘
        if (CtrlBlock.isAroundPlayer(blockIdx)) {
          this.digChest(blockIdx)
        } else {
          noAct = true
        }
      } else {
        // 已无障碍物覆盖
        switch (Block.blocks[blockIdx].inside) {
          case 'gold':
            // 角色获取金币
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.pickGold(blockIdx)
            } else {
              noAct = true
            }
            break
          case 'food':
            // 角色食用食物
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.eatFood(blockIdx)
            } else {
              noAct = true
            }
            break
          case 'potion':
            // 角色使用药剂
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.drinkPotion(blockIdx)
            } else {
              noAct = true
            }
            break
          case 'fire':
            // 角色使用火焰
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.useFire(blockIdx)
            } else {
              noAct = true
            }
            break
          case 'random':
            // 角色使用机会
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.takeChance(blockIdx)
            } else {
              noAct = true
            }
            break
          case 'trap':
            // 角色触发陷阱，一般来说不会走到这个分支，因为陷阱会在出现的时候自动触发
            // 检查是否可以挖掘
            if (CtrlBlock.isAroundPlayer(blockIdx)) {
              this.triggerTrap(blockIdx)
            } else {
              noAct = true
            }
            break
          case '':
            // 角色想要进行移动
            if (!this.movePlace(blockIdx)) {
              // 移动未成功
              noAct = true
            }
            break
          default:
            // 错误的执行，不做任何事情
            noAct = true
        }
      }

      // 检查是否已暴露inside
      if (Block.blocks[blockIdx].chest === 0 && Block.blocks[blockIdx].rock === 0 && Block.blocks[blockIdx].dirt === 0) {
        if (Block.blocks[blockIdx].inside === 'gold') {
          // 需要随机生成金币数额
          CtrlBlock.randomGold(blockIdx)
        } else if (Block.blocks[blockIdx].inside === 'trap') {
          // 需要自动执行trap
          this.triggerTrap(blockIdx)
        } else if (Block.blocks[blockIdx].inside === '') {
          // inside本身就没有
          CtrlBlock.clearInside(blockIdx)
        }
      }

      // 标记act，并转移控制权
      if (!noAct) {
        CtrlCharacter.playerAct(Game.currentPlayerIdx)
        this.turnPlayer()
      }
    }
  },

  // 清理dirt
  digDirt (blockIdx) {
    blockIdx = parseInt(blockIdx) || 0
    // 扣除1点能量
    if (Store.characters[Game.currentPlayerIdx].energy >= 1) {
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -1)
      // 成功扣除能量，开始清理dirt
      let damage = Store.characters[Game.currentPlayerIdx].power
      // 蛮力 race skill
      if (Store.characters[Game.currentPlayerIdx].raceSkills.indexOf(1) !== -1) {
        damage = CtrlSkill.rBigPower()
      }
      CtrlBlock.changeDirt(blockIdx, -1 * damage)
      // 清理一次灰土增加4SP
      CtrlSp.changeSp(Game.currentPlayerIdx, 4)
      // 灰土挑拣 race skill 并且dirt已经被破坏
      if (Store.characters[Game.currentPlayerIdx].raceSkills.indexOf(0) !== -1 && Block.blocks[blockIdx].dirt === 0) {
        CtrlSkill.rGainDirt()
      }

      CtrlEffect.playSound('dig-dirt')
    } else {
      // 即使能量不够，强行挖掘还是扣除能量
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -1)

      CtrlEffect.playSound('dig-fail')
      window.alert('能量不足！')
    }
  },

  // 清理rock
  digRock (blockIdx) {
    blockIdx = parseInt(blockIdx) || 0
    // 扣除2点能量
    if (Store.characters[Game.currentPlayerIdx].energy >= 2) {
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -2)
      // 成功扣除能量，开始清理rock
      let damage = Store.characters[Game.currentPlayerIdx].power
      // 蛮力 race skill
      if (Store.characters[Game.currentPlayerIdx].raceSkills.indexOf(1) !== -1) {
        damage = CtrlSkill.rBigPower()
      }
      CtrlBlock.changeRock(blockIdx, -1 * damage)
      // 清理一次岩石增加6SP
      CtrlSp.changeSp(Game.currentPlayerIdx, 6)

      CtrlEffect.playSound('dig-rock')
    } else {
      // 即使能量不够，强行挖掘还是扣除能量
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -2)

      CtrlEffect.playSound('dig-fail')
      window.alert('能量不足！')
    }
  },

  // 清理chest
  digChest (blockIdx) {
    blockIdx = parseInt(blockIdx) || 0
    // 扣除1点能量
    if (Store.characters[Game.currentPlayerIdx].energy >= 1) {
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -1)
      // 成功扣除能量，开始清理chest
      let damage = Store.characters[Game.currentPlayerIdx].power
      // 蛮力 race skill
      if (Store.characters[Game.currentPlayerIdx].raceSkills.indexOf(1) !== -1) {
        damage = CtrlSkill.rBigPower()
      }
      CtrlBlock.changeChest(blockIdx, -1 * damage)
      // 清理一次宝箱增加3SP
      CtrlSp.changeSp(Game.currentPlayerIdx, 3)

      CtrlEffect.playSound('open-chest')
    } else {
      // 即使能量不够，强行挖掘还是扣除能量
      CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -1)

      CtrlEffect.playSound('dig-fail')
      window.alert('能量不足！')
    }
  },

  // 触发陷阱 -- 所在的block索引
  triggerTrap (blockIdx) {
    // trap伤害为当前能量的5%~15%
    let percent = UtilGame.dice(15, 5) / 100
    let energy = Store.characters[Game.currentPlayerIdx].energy || 0
    let trapDamage = Math.round(energy * percent)
    // trap 伤害最低为1
    trapDamage < 1 ? trapDamage = 1 : trapDamage

    CtrlEnergy.changeEnergy(Game.currentPlayerIdx, -1 * trapDamage)

    // 播放音效
    CtrlEffect.playSound('trap')

    // 1.5秒后陷阱消失
    let tc = window.setTimeout(function () {
      CtrlBlock.clearInside(blockIdx)
      window.clearTimeout(tc)
    }, 500 * 3)
  },

  // 拾取金币 -- 拾取的金币所在block索引
  pickGold (blockIdx) {
    // 金币数量已经提前生成好，直接拾取
    let pickedGold = Block.blocks[blockIdx].num || 0
    CtrlGold.changeGold(Game.currentPlayerIdx, pickedGold)

    // 播放音效
    CtrlEffect.playSound('coin')

    CtrlBlock.clearInside(blockIdx)
  },

  // 食用食物 -- 所在block索引
  eatFood (blockIdx) {
    // 食物补充能量值相对固定，约5~10
    let foodEnergy = UtilGame.dice(10, 5)

    CtrlEnergy.changeEnergy(Game.currentPlayerIdx, foodEnergy)

    // 播放音效
    CtrlEffect.playSound('eat')

    CtrlBlock.clearInside(blockIdx)
  },

  // 使用药剂 -- 所在block索引
  drinkPotion (blockIdx) {
    // 药水补充魔法值相对固定，约5~10
    let potionMagic = UtilGame.dice(10, 5)

    CtrlMagic.changeMagic(Game.currentPlayerIdx, potionMagic)

    // 播放音效
    CtrlEffect.playSound('drink')

    CtrlBlock.clearInside(blockIdx)
  },

  // 使用火焰 -- 所在block索引
  useFire (blockIdx) {
    // 火焰直接补满角色的SP
    CtrlSp.fullSp(Game.currentPlayerIdx)

    // 播放音效
    CtrlEffect.playSound('fire')

    CtrlBlock.clearInside(blockIdx)
  },

  // 使用随机机会 -- 所在block索引
  takeChance (blockIdx) {
    // 播放音效
    CtrlEffect.playSound('chance')

    CtrlBlock.clearInside(blockIdx)

    // 弹出选择随机机会的窗口
    // TODO
  },

  // 移动角色位置 --
  movePlace (blockIdx) {
    // 检查是否可以移动到目标block
    if (CtrlBlock.isBlockAvailable(blockIdx)) {
      // 可以移动
      CtrlCharacter.movePlayer(blockIdx)

      // 播放音效
      // CtrlEffect.playSound('walk')

      return true
    } else {
      // 非法移动，不允许
      return false
    }
  }
}
