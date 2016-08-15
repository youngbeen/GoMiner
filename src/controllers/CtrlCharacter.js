import Store from '../models/Store'
import Game from '../models/Game'
import CtrlBlock from './CtrlBlock'

export default {
  // 添加角色 --
  addPlayer (sName) {
    let name = 'NewPlayer'
    if (sName) {
      name = sName
    }

    Store.characters.push({
      hasActed: false,
      location: '',
      role: '',
      name,
      maxEnergy: 100,
      energy: 100,
      maxMagic: 15,
      magic: 15,
      maxSp: 100,
      sp: 0,
      gold: 0,
      power: 1,
      raceSkills: [],
      givenSkills: []
    })
  },

  // 移除角色 -- 索引
  removePlayer (idx) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      Store.characters.splice(idx, 1)
    }
  },

  // 清除角色数据
  clearPlayers () {
    Store.characters = []
  },

  // 更改玩家的role -- 玩家的索引，要变更的role
  changeRole (playerIdx, role) {
    if (Store.characters[playerIdx]) {
      Store.characters[playerIdx].role = role
    }
  },

  // 添加种族技能 -- 技能id，[角色索引]
  addRaceSkill (skillId, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    if (skillId !== undefined && skillId != null) {
      // 仅当技能没获得时，才添加
      if (Store.characters[playerIdx].raceSkills.indexOf(skillId) === -1) {
        Store.characters[playerIdx].raceSkills.push(skillId)
        return true
      }
    } else {
      return false
    }
  },

  // 添加主动技能 -- 技能id，[角色索引]
  addGivenSkill (skillId, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    if (skillId !== undefined && skillId != null) {
      // 仅当技能没获得时，才添加
      if (Store.characters[playerIdx].givenSkills.indexOf(skillId) === -1) {
        Store.characters[playerIdx].givenSkills.push(skillId)
        return true
      }
    } else {
      return false
    }
  },

  // 放置角色 -- 角色放置的目标block索引
  setPlayer (tarBlockIdx, playerIdx) {
    if (tarBlockIdx !== undefined && tarBlockIdx != null && playerIdx !== undefined && playerIdx != null) {
      // 为目标位置添加角色信息
      Store.characters[playerIdx].location = tarBlockIdx
      CtrlBlock.changePlayerInfo(tarBlockIdx, playerIdx)

      return true
    } else {
      // 非法参数
      return false
    }
  },

  // 角色移动 -- 角色移动的目标block索引
  movePlayer (tarBlockIdx) {
    if (tarBlockIdx !== undefined && tarBlockIdx != null) {
      // 执行移动
      let srcBlockIdx = Store.characters[Game.currentPlayerIdx].location

      // 清除原始位置的角色信息
      Store.characters[Game.currentPlayerIdx].location = ''
      CtrlBlock.clearPlayerInfo(srcBlockIdx)

      // 为目标位置添加角色信息
      this.setPlayer(tarBlockIdx, Game.currentPlayerIdx)

      return true
    } else {
      // 非法参数
      return false
    }
  },

  // 给角色标记act -- 索引
  playerAct (idx) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      Store.characters[idx].hasActed = true
    }
  },

  // 重置行动标记
  resetAct () {
    for (let i = 0; i < Store.characters.length; i++) {
      Store.characters[i].hasActed = false
    }
  }
}
