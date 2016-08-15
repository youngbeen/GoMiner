import Store from '../models/Store'

export default {
  // 更改SP -- 索引，变动值
  changeSp (idx, changeValue) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      changeValue = changeValue || 0
      let sp = Store.characters[idx].sp || 0
      let maxSp = Store.characters[idx].maxSp || 0

      if (sp + changeValue < 0) {
        // SP减少到底
        Store.characters[idx].sp = 0
        return false
      } else if (sp + changeValue > maxSp) {
        // SP增长到顶
        Store.characters[idx].sp = maxSp
        return true
      } else {
        // SP正常变化
        Store.characters[idx].sp += changeValue
        return true
      }
    }
  },

  // 全满SP -- 索引
  fullSp (idx) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      Store.characters[idx].sp = Store.characters[idx].maxSp
    }
  },

  // 清空SP -- 索引
  clearSp (idx) {
    if (idx !== undefined && idx != null && Store.characters[idx]) {
      Store.characters[idx].sp = 0
    }
  }
}
