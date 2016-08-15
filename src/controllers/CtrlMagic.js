import Store from '../models/Store'

export default {
  // 更改魔法 -- 索引，变动值
  changeMagic (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let magic = Store.characters[idx].magic || 0
      let maxMagic = Store.characters[idx].maxMagic || 0

      if (magic + changeValue < 0) {
        // 魔法减少到底
        Store.characters[idx].magic = 0
      } else if (magic + changeValue > maxMagic) {
        // 魔法增长到顶
        Store.characters[idx].magic = maxMagic
      } else {
        // 魔法正常变化
        Store.characters[idx].magic += changeValue
      }
    }
  },
  // 更改最大魔法 -- 索引，变动值
  changeMaxMagic (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let magic = Store.characters[idx].magic || 0
      let maxMagic = Store.characters[idx].maxMagic || 0

      if (maxMagic + changeValue < 0) {
        // 最大魔法减少到底
        Store.characters[idx].maxMagic = 0
      } else {
        // 最大魔法正常变化
        Store.characters[idx].maxMagic += changeValue
      }

      // 根据最大魔法调整当前能量值
      if (magic > Store.characters[idx].maxMagic) {
        Store.characters[idx].magic = Store.characters[idx].maxMagic
      }
    }
  }
}
