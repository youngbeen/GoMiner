export default {
  rows: 0,
  cols: 0,
  total: 0,
  blocks: [
    // {
    //   dirt: 1,          // 灰土覆盖hp（最顶部，新block一般有，0~1）
    //   rock: 0,          // 岩石覆盖hp（中间，随机出，0~5）
    //   chest: 1,         // 宝箱覆盖hp（最底部，随机出，0~1）
    //   inside: 'gold',   // 隐藏在里面的结果， gold - 金币（数量打开时再随机）, trap - 陷阱（-能量，数量打开时自动随机）, food - 食物（+能量，数量打开时随机）, potion - 药水（+魔法，数量打开时随机）, fire - 火焰（SP全满） random - 随机（打开随机机会选择）, '' - 空（无任何物品）
    //   num: 0,           // 针对inside类型，当为gold, food, potion时，生成对应的增加数量
    //   playerIdx: '',    // 当前block所占据的角色索引值
    //   isBlank: false,    // block是否为空，为空代表没有任何东西或者已经完全开启完毕，不代表是否被角色占据
    //   isAvailable: false    // 当前block是否支持角色移动到上面
    // }
  ]
}
