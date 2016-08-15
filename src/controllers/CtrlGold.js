import Store from '../models/Store'

export default {
  // 更改金币 -- 索引，变动值
  changeGold (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let gold = Store.characters[idx].gold || 0

      if (gold + changeValue < 0) {
        // 金币减少到底
        Store.characters[idx].gold = 0
      } else {
        // 金币正常变化
        Store.characters[idx].gold += changeValue
      }
    }
  },

  // 清空金币 -- 索引
  clearGold (idx) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      Store.characters[idx].gold = 0
    }
  }
}
