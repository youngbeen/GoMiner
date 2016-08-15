import Block from '../models/Block'
import Store from '../models/Store'
import Game from '../models/Game'
import UtilGame from '../utils/UtilGame'

export default {
  // 根据行列坐标获取真实block索引值 -- 行索引，列索引
  getBlockIdx (rowIdx, colIdx) {
    rowIdx = parseInt(rowIdx) || 0
    colIdx = parseInt(colIdx) || 0

    let blocksInRow = Block.cols
    let blockIdx = blocksInRow * rowIdx + colIdx
    if (blockIdx < 0) {
      // 错误结果，修正值
      console.warn('Error: wrong blockIdx in CtrlBlock-getBlockIdx')
      blockIdx = 0
    }

    return blockIdx
  },

  // 根据索引值获取行列坐标 -- block索引
  getLocationByIdx (blockIdx) {
    blockIdx = parseInt(blockIdx) || 0

    let blocksInRow = Block.cols
    // 计算位置
    let row = Math.floor(blockIdx / blocksInRow)
    let col = blockIdx % blocksInRow

    return {
      row,
      col
    }
  },

  // 检验block是否在角色目标位置附近 -- block索引，[是否包含角色本身]，[角色索引]
  // 示例 - - X - -
  //     - X X X -
  //     X X o X X
  //     - X X X -
  //     - - X - -
  isNearPlayer (blockIdx, isIncludePlayer, playerIdx) {
    isIncludePlayer ? isIncludePlayer = true : isIncludePlayer = false
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    let playerLocationIdx = Store.characters[playerIdx].location

    if (this.isAroundPlayer(blockIdx, playerIdx) || this.isFarNextToPlayer(blockIdx, playerIdx)) {
      return true
    } else {
      if (isIncludePlayer && blockIdx === playerLocationIdx) {
        // 包含用户自身的判断
        return true
      }
      return false
    }
  },

  // 检验block是否环绕角色目标位置 -- block索引，[角色索引]
  // 示例 X X X
  //     X o X
  //     X X X
  isAroundPlayer (blockIdx, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    if (this.isNextToPlayer(blockIdx, playerIdx) || this.isCrossPlayer(blockIdx, playerIdx)) {
      return true
    } else {
      return false
    }
  },

  // 检验block是否紧挨角色目标位置 -- block索引，[角色索引]
  // 示例 - X -
  //     X o X
  //     - X -
  isNextToPlayer (blockIdx, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    let isNext = false
    let blocksInRow = Block.cols
    let blocksTotal = Block.total
    let playerLocationIdx = Store.characters[playerIdx].location

    if (playerLocationIdx > 0 && playerLocationIdx % blocksInRow !== 0 && (playerLocationIdx - 1) === blockIdx) {
      // 检验角色左边，要保证不在第一个，并且不在每行的第一个
      isNext = true
    } else if (playerLocationIdx < (blocksTotal - 1) && playerLocationIdx % blocksInRow !== (blocksInRow - 1) && (playerLocationIdx + 1) === blockIdx) {
      // 检验角色右边，要保证不在最后一个，并且不在每行的最后一个
      isNext = true
    } else if ((playerLocationIdx - blocksInRow) >= 0 && (playerLocationIdx - blocksInRow) === blockIdx) {
      // 检验角色上方，要保证不在第一行
      isNext = true
    } else if ((playerLocationIdx + blocksInRow) <= (blocksTotal - 1) && (playerLocationIdx + blocksInRow) === blockIdx) {
      // 检验角色下方，要保证不在最后一行
      isNext = true
    }

    return isNext
  },

  // 检验block是否隔距紧挨角色目标位置 -- block索引，[角色索引]
  // 示例 - - X - -
  //     - - - - -
  //     X - o - X
  //     - - - - -
  //     - - X - -
  isFarNextToPlayer (blockIdx, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    let isFarNext = false
    let blocksInRow = Block.cols
    let rowsTotal = Block.rows
    let colsTotal = Block.cols
    let playerLocationIdx = Store.characters[playerIdx].location
    let playerLocation = this.getLocationByIdx(playerLocationIdx)

    if (playerLocation.row >= 0 && playerLocation.col > 1 && (playerLocationIdx - 2) === blockIdx) {
      // 检验角色左边，要保证至少第一行，并且至少是第三列
      isFarNext = true
    } else if (playerLocation.row > 1 && playerLocation.col >= 0 && (playerLocationIdx - 2 * blocksInRow) === blockIdx) {
      // 检验角色上边，要保证至少第三行，并且至少第一列
      isFarNext = true
    } else if (playerLocation.row >= 0 && playerLocation.col < (colsTotal - 2) && (playerLocationIdx + 2) === blockIdx) {
      // 检验角色右边，要保证至少第一行，并且不在最后二列
      isFarNext = true
    } else if (playerLocation.row < (rowsTotal - 2) && playerLocation.col >= 0 && (playerLocationIdx + 2 * blocksInRow) === blockIdx) {
      // 检验角色下边，要保证不在最后二行，并且至少第一列
      isFarNext = true
    }

    return isFarNext
  },

  // 检验block是否交叉角色目标位置 -- block索引，[角色索引]
  // 示例 X - X
  //     - o -
  //     X - X
  isCrossPlayer (blockIdx, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx

    let isCross = false
    let blocksInRow = Block.cols
    let rowsTotal = Block.rows
    let colsTotal = Block.cols
    let playerLocationIdx = Store.characters[playerIdx].location
    let playerLocation = this.getLocationByIdx(playerLocationIdx)

    if (playerLocation.row > 0 && playerLocation.col > 0 && (playerLocationIdx - 1 - blocksInRow) === blockIdx) {
      // 检验角色左上，要保证不在第一行，并且不在第一列
      isCross = true
    } else if (playerLocation.row > 0 && playerLocation.col < (colsTotal - 1) && (playerLocationIdx + 1 - blocksInRow) === blockIdx) {
      // 检验角色右上，要保证不在第一行，并且不在最后一列
      isCross = true
    } else if (playerLocation.row < (rowsTotal - 1) && playerLocation.col > 0 && (playerLocationIdx - 1 + blocksInRow) === blockIdx) {
      // 检验角色左下，要保证不在第后一行，并且不在第一列
      isCross = true
    } else if (playerLocation.row < (rowsTotal - 1) && playerLocation.col < (colsTotal - 1) && (playerLocationIdx + 1 + blocksInRow) === blockIdx) {
      // 检验角色右下，要保证不在最后一行，并且不在最后一列
      isCross = true
    }

    return isCross
  },

  // 检验block是否支持移动到上面 -- 目标block索引
  isBlockAvailable (blockIdx) {
    // console.log(blockIdx, Block.blocks[blockIdx])
    // 检验目标block是否可通过，用户有合法的起始位置，
    if (Block.blocks[blockIdx] && this.isBlockFree(blockIdx) && Store.characters[Game.currentPlayerIdx].location !== '' && this.isValidMove(Store.characters[Game.currentPlayerIdx].location, blockIdx)) {
      // 支持移动
      return true
    } else {
      // 不支持移动
      return false
    }
  },

  // 检验block是否支持角色通过 -- 目标block索引
  isBlockFree (blockIdx) {
    // console.log(blockIdx, Block.blocks[blockIdx])
    // 检验目标block是否可用，目标block是否为空，占据的角色为空，内部inside也没有任何东西
    if (Block.blocks[blockIdx] && Block.blocks[blockIdx].isAvailable && Block.blocks[blockIdx].isBlank && Block.blocks[blockIdx].playerIdx === '' && Block.blocks[blockIdx].inside === '') {
      // 支持通过
      return true
    } else {
      // 不支持通过
      return false
    }
  },

  // 校验移动路径是否合法 -- 起始位置索引，目标位置索引
  isValidMove (srcIdx, tarIdx) {
    if (srcIdx !== undefined && srcIdx != null && tarIdx !== undefined && tarIdx != null && srcIdx !== tarIdx) {
      // 目前设定为如果起始位置跟目标位置在同一行或者同一列，并且中间无任何障碍，则认为有效路径
      let srcLocation = this.getLocationByIdx(srcIdx)
      let tarLocation = this.getLocationByIdx(tarIdx)
      let len = 0     // 中间经过的需要校验的block个数

      if (srcLocation.row === tarLocation.row) {
        // 同一行，索引值本身是连续的，直接做中间检验
        let fromIdx = Math.min(srcIdx, tarIdx) + 1
        let toIdx = Math.max(srcIdx, tarIdx)
        for (let i = fromIdx; i < toIdx; i++) {
          if (!this.isBlockFree(i)) {
            return false
          }
        }
        return true
      } else if (srcLocation.col === tarLocation.col) {
        // 同一列
        let fromIdx = Math.min(srcIdx, tarIdx)
        let blocksInRow = Block.cols
        // let row = srcLocation.row
        // let col = srcLocation.col + 1
        len = Math.abs(tarLocation.row - srcLocation.row) - 1
        for (let i = 1; i <= len; i++) {
          if (!this.isBlockFree(fromIdx + blocksInRow * i)) {
            return false
          }
        }
        return true
      } else {
        // 既不在同一行，也不在同一列
        return false
      }
    } else {
      // 非法参数
      return false
    }
  },

  // 设置计数等参数
  setCounts (nRows, nCols) {
    if (nRows && nCols) {
      Block.rows = nRows
      Block.cols = nCols
      Block.total = nRows * nCols
    }
  },

  // 生成所有的block
  generateAllBlocks () {
    for (let i = 0; i < Block.total; i++) {
      let inside = ''
      let chest = 0
      let rock = 0
      let dirt = 0
      let isBlank = false
      let isAvailable = false
      // 随机dice
      // 是否存在内部结果 9/10
      let hasInside = (UtilGame.dice(10) !== 10)
      if (hasInside) {
        // 存在内部结果
        let insideDice = UtilGame.dice(20)
        if (insideDice <= 8) {
          // 金币，8/20
          inside = 'gold'
        } else if (insideDice > 8 && insideDice <= 11) {
          // 陷阱，3/20
          inside = 'trap'
        } else if (insideDice > 11 && insideDice <= 14) {
          // 食物，3/20
          inside = 'food'
        } else if (insideDice > 14 && insideDice <= 17) {
          // 药剂，3/20
          inside = 'potion'
        } else if (insideDice === 20) {
          // 随机事件，1/20
          inside = 'random'
        } else {
          // 火焰，2/20
          inside = 'fire'
        }
      }

      // 是否宝箱覆盖 1/2
      let hasChest = (UtilGame.dice(2) === 2)
      if (inside === 'gold' || inside === 'food' || inside === 'potion' || inside === '') {
        // 当前宝箱hp暂时只会是1
        hasChest ? chest = 1 : chest
      }

      // 是否岩石覆盖 1/5
      let hasRock = (UtilGame.dice(5) === 5)
      if (hasRock) {
        rock = UtilGame.dice(5)
      }

      // 是否灰土覆盖 9/10
      let hasDirt = false
      // 当block中没有任何东西的时候，强制无灰土覆盖
      if (inside === '' && chest === 0 && rock === 0) {
        // 强制无灰土覆盖
        hasDirt = false
      } else if (inside === 'trap' && chest === 0 && rock === 0) {
        // block是陷阱，但是没任何东西覆盖，强制灰土覆盖
        hasDirt = true
      } else {
        UtilGame.dice(10) === 10 ? hasDirt = false : hasDirt = true
      }
      // 当前灰土hp暂时只会是1
      hasDirt ? dirt = 1 : dirt

      // block是否为空
      if ((inside === '' || inside === 'trap') && chest === 0 && rock === 0 && dirt === 0) {
        isBlank = true
      }

      // block可用性
      isAvailable = isBlank

      // 开始插入数据
      Block.blocks.push({
        dirt,
        rock,
        chest,
        inside,
        num: 0,
        playerIdx: '',
        isBlank,
        isAvailable
      })
    }
  },

  // 清空所有block - 是否也清空计数参数
  clearBlocks (isWithCounts) {
    isWithCounts = isWithCounts || false

    // 清空计数参数
    if (isWithCounts) {
      Block.rows = Block.cols = Block.total = 0
    }

    // 清空block
    Block.blocks = []
  },

  // 清空单个block -- block索引
  clearSingleBlock (blockIdx) {
    if (Block.blocks[blockIdx]) {
      // 清空特定的block
      Block.blocks[blockIdx].dirt = 0
      Block.blocks[blockIdx].rock = 0
      Block.blocks[blockIdx].chest = 0
      Block.blocks[blockIdx].inside = ''
      Block.blocks[blockIdx].num = 0
      Block.blocks[blockIdx].playerIdx = ''
      Block.blocks[blockIdx].isBlank = true
      Block.blocks[blockIdx].isAvailable = true

      return true
    } else {
      // 参数错误
      return false
    }
  },

  // 清空单个block的障碍物 -- block索引
  exposeSingleBlock (blockIdx) {
    if (Block.blocks[blockIdx]) {
      // 暴露特定的block
      Block.blocks[blockIdx].dirt = 0
      Block.blocks[blockIdx].rock = 0
      Block.blocks[blockIdx].chest = 0

      if (Block.blocks[blockIdx].inside === '') {
        Block.blocks[blockIdx].isBlank = true
      }

      if (Block.blocks[blockIdx].isBlank && Block.blocks[blockIdx].playerIdx === '') {
        Block.blocks[blockIdx].isAvailable = true
      }

      return true
    } else {
      // 参数错误
      return false
    }
  },

  // 清除block的inside -- block 索引值，是否只清除inside值
  clearInside (blockIdx, isOnlyInside) {
    isOnlyInside = isOnlyInside || false
    if (Block.blocks[blockIdx]) {
      Block.blocks[blockIdx].inside = ''
      if (!isOnlyInside) {
        Block.blocks[blockIdx].num = 0
        Block.blocks[blockIdx].isBlank = true
        Block.blocks[blockIdx].isAvailable = true
      }
    }
  },

  // 在block中添加角色信息 -- block索引值，[角色索引]
  changePlayerInfo (blockIdx, playerIdx) {
    playerIdx !== undefined && playerIdx != null ? playerIdx : playerIdx = Game.currentPlayerIdx
    if (Block.blocks[blockIdx]) {
      Block.blocks[blockIdx].playerIdx = playerIdx
      Block.blocks[blockIdx].isAvailable = false
    }
  },

  // 清除block中的角色信息 -- block索引值，是否只清除playerIdx
  clearPlayerInfo (blockIdx, isOnlyPlayer) {
    isOnlyPlayer = isOnlyPlayer || false
    if (Block.blocks[blockIdx]) {
      Block.blocks[blockIdx].playerIdx = ''
      if (!isOnlyPlayer && Block.blocks[blockIdx].isBlank) {
        Block.blocks[blockIdx].isAvailable = true
      }
    }
  },

  // 随机生成金币
  randomGold (blockIdx) {
    if (Block.blocks[blockIdx] && Block.blocks[blockIdx].inside === 'gold') {
      // 金币随机规则
      // 90/100概率得到正常数额，数额5~15，9/100概率得到额外数额，数额7~18，1/100概率得到大量数额，数额10~35
      let randomGold = 0
      let luck = UtilGame.dice(100)

      if (luck <= 90) {
        // 正常数额
        randomGold = UtilGame.dice(15, 5)
      } else if (luck === 100) {
        // 大量数额
        randomGold = UtilGame.dice(35, 10)
      } else {
        // 额外数额
        randomGold = UtilGame.dice(18, 7)
      }

      Block.blocks[blockIdx].num = randomGold
    }
  },

  // 更改dirt -- 索引，变动值
  changeDirt (idx, changeValue) {
    if (idx !== undefined && idx != null && Block.blocks[idx]) {
      changeValue = changeValue || 0
      let dirt = Block.blocks[idx].dirt || 0

      if (dirt + changeValue < 0) {
        // dirt hp减少到底
        Block.blocks[idx].dirt = 0
        return false
      } else {
        // dirt hp正常变化
        Block.blocks[idx].dirt += changeValue
        return true
      }
    }
  },

  // 更改rock -- 索引，变动值
  changeRock (idx, changeValue) {
    if (idx !== undefined && idx != null && Block.blocks[idx]) {
      changeValue = changeValue || 0
      let rock = Block.blocks[idx].rock || 0

      if (rock + changeValue < 0) {
        // rock hp减少到底
        Block.blocks[idx].rock = 0
        return false
      } else {
        // rock hp正常变化
        Block.blocks[idx].rock += changeValue
        return true
      }
    }
  },

  // 更改chest -- 索引，变动值
  changeChest (idx, changeValue) {
    if (idx !== undefined && idx != null && Block.blocks[idx]) {
      changeValue = changeValue || 0
      let chest = Block.blocks[idx].chest || 0

      if (chest + changeValue < 0) {
        // chest hp减少到底
        Block.blocks[idx].chest = 0
        return false
      } else {
        // chest hp正常变化
        Block.blocks[idx].chest += changeValue
        return true
      }
    }
  }
}
