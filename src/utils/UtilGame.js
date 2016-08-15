export default {
  // roll dice函数 -- [随机数上限值]，[随机数下限值]
  dice (diceLimit, diceBase) {
    // 修正值，起始点默认为1，最高点默认为6
    diceLimit ? diceLimit = parseInt(diceLimit) : diceLimit = 6
    diceBase ? diceBase = parseInt(diceBase) : diceBase = 1
    // 若起始点比最高点还高的情况，修正为起始点等于最高点
    diceBase > diceLimit ? diceBase = diceLimit : diceBase

    let diceEnd = diceLimit - diceBase + 1

    let myRoll = Math.floor(Math.random() * diceEnd) + diceBase
    return myRoll
  },

  // 多随机数生成函数 -- [生成几个随机数], [随机数上限值]，[随机数下限值], [是否允许重复]
  multiDice (diceNum, diceLimit, diceBase, isDuplicate) {
    // 修正值，默认生成2个随机数，起始点默认为1，最高点默认为6，默认不允许重复
    diceNum ? diceNum = parseInt(diceNum) : diceNum = 2
    diceLimit ? diceLimit = parseInt(diceLimit) : diceLimit = 6
    diceBase ? diceBase = parseInt(diceBase) : diceBase = 1
    isDuplicate ? isDuplicate = true : isDuplicate = false

    let generatedDices = []

    for (let i = 0; i < diceNum; i++) {
      // 循环生成随机数
      let dice = this.dice(diceLimit, diceBase)
      if (!isDuplicate && generatedDices.indexOf(dice) !== -1) {
        // 不允许重复，而且已经确定重复的情况
        // 不加入结果，撤销自增
        i--
      } else {
        // 合法的dice，放入数组
        generatedDices.push(dice)
      }
    }

    // 测试检验用，看生成的dice数量是否达标
    if (generatedDices.length !== diceNum) {
      console.warn('Error: wrong dice result counts in UtilGame-multiDice')
    }

    return generatedDices
  }
}
