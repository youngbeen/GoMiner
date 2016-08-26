import Store from '../models/Store'

export default {
  // 更改能量 -- 角色索引，变动值
  changeEnergy (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let energy = Store.characters[idx].energy || 0
      let maxEnergy = Store.characters[idx].maxEnergy || 0

      if (energy + changeValue < 0) {
        // 能量减少到底
        Store.characters[idx].energy = 0
        return false
      } else if (energy + changeValue > maxEnergy) {
        // 能量增长到顶
        Store.characters[idx].energy = maxEnergy
        return true
      } else {
        // 能量正常变化
        Store.characters[idx].energy += changeValue
        return true
      }
    }
  },

  // 更改最大能量 -- 索引，变动值
  changeMaxEnergy (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let energy = Store.characters[idx].energy || 0
      let maxEnergy = Store.characters[idx].maxEnergy || 0

      if (maxEnergy + changeValue < 0) {
        // 最大能量减少到底
        Store.characters[idx].maxEnergy = 0
      } else {
        // 最大能量正常变化
        Store.characters[idx].maxEnergy += changeValue
      }

      // 根据最大能量调整当前能量值
      if (energy > Store.characters[idx].maxEnergy) {
        Store.characters[idx].energy = Store.characters[idx].maxEnergy
      }
    }
  }
}
