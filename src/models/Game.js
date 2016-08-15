export default {
  isModeWindowShow: true,
  isBlockWindowShow: true,
  isSkillWindowShow: false,
  isCheatShow: false,
  gameMode: 'single',   // 游戏模式，single - 单人模式, multi - 多人模式,
  blockMode: 'micro',   // block模式，mirco - 微型（10x10约100块）, small - 小型（12x15约180块）, medium - 中型（15x18约270块）, large - 大型（15x22约330块）
  isGameStarted: false, // 游戏是否已经开始
  dayTime: '',          // 游戏环境中的时间， 'day' - 白天， 'night' - 黑夜
  isGoodVision: false,  // 视野是否无视黑夜，提供给阴暗者的技能
  timeTurnCount: 0,     // 提供给游戏时间切换判断用的回合计数
  currentPlayerIdx: '', // 当前游戏角色索引
  turns: 0,             // 回合数
  bestScore: 0          // 最高分数
}
