<template>
  <div class="bed-cheat" v-show="Game.isCheatShow">
    <hr />
    <div class="box-cheat-tabs">
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'character' && mode !== '', 'btn-success': mode === 'character' }" v-on:click="changeMode('character')">
        <i class="fa fa-user"></i> 角色
      </button>
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'energy', 'btn-success': mode === 'energy' }" v-on:click="changeMode('energy')">
        <i class="fa fa-heart"></i> 能量
      </button>
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'gold', 'btn-success': mode === 'gold' }" v-on:click="changeMode('gold')">
        <i class="fa fa-money"></i> 金币
      </button>
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'magic', 'btn-success': mode === 'magic' }" v-on:click="changeMode('magic')">
        <i class="fa fa-magic"></i> 魔法
      </button>
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'sp', 'btn-success': mode === 'sp' }" v-on:click="changeMode('sp')">
        <i class="fa fa-bolt"></i> SP
      </button>
      <button class="btn btn-xs" v-bind:class="{ 'btn-default': mode !== 'system', 'btn-success': mode === 'system' }" v-on:click="changeMode('system')">
        <i class="fa fa-gear"></i> 系统
      </button>
    </div>
    <hr />
    <!-- 角色变更 -->
    <div class="tab-character" v-show="mode === 'character' || mode === ''">
      <div class="row">
        <div class="col-md-2">添加角色</div>
        <div class="col-md-2"></div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="addPlayer()">
            <i class="fa fa-user-plus"></i> 添加
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">移除角色</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="removePlayer()">
            <i class="fa fa-user-times"></i> 移除
          </button>
        </div>
      </div>
    </div>
    <!-- 能量变更 -->
    <div class="tab-energy" v-show="mode === 'energy'">
      <div class="row">
        <div class="col-md-2">更改能量</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="energyValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeEnergy()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">更改最大能量</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="maxEnergyValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeMaxEnergy()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
    </div>
    <!-- 金币变更 -->
    <div class="tab-gold" v-show="mode === 'gold'">
      <div class="row">
        <div class="col-md-2">更改金币</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="goldValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeGold()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">清空金币</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="clearGold()">
            <i class="fa fa-trash"></i> 清空
          </button>
        </div>
      </div>
    </div>
    <!-- 魔力变更 -->
    <div class="tab-magic" v-show="mode === 'magic'">
      <div class="row">
        <div class="col-md-2">更改魔法</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="magicValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeMagic()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">更改最大魔法</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="maxMagicValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeMaxMagic()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
    </div>
    <!-- SP变更 -->
    <div class="tab-sp" v-show="mode === 'sp'">
      <div class="row">
        <div class="col-md-2">更改SP</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" v-model="spValue" />
        </div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="changeSp()">
            <i class="fa fa-check"></i> 确定
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">SP全满</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="fullSp()">
            <i class="fa fa-bolt"></i> 全满
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">清空SP</div>
        <div class="col-md-2">
          <select class="form-control" v-model="selectedIdx">
            <option v-for="item in Store.characters" value="{{ $index }}">{{ $index }}</option>
          </select>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="clearSp()">
            <i class="fa fa-bolt"></i> 清空
          </button>
        </div>
      </div>
    </div>
    <!-- system级别控制 -->
    <div class="tab-system" v-show="mode === 'system'">
      <div class="row">
        <div class="col-md-2">无视黑夜</div>
        <div class="col-md-2"></div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button class="btn btn-sm btn-primary" v-on:click="toggleVision()">
            <i class="fa fa-eye"></i> 切换视野
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../models/Store'
  import Game from '../models/Game'
  import CtrlGame from '../controllers/CtrlGame'
  import CtrlCharacter from '../controllers/CtrlCharacter'
  import CtrlEnergy from '../controllers/CtrlEnergy'
  import CtrlGold from '../controllers/CtrlGold'
  import CtrlMagic from '../controllers/CtrlMagic'
  import CtrlSp from '../controllers/CtrlSp'

  export default {
    data () {
      return {
        mode: 'character',    // 标注现在打开的cheat sheet是哪个， character, energy, gold, magic, sp, system
        selectedIdx: 0,
        energyValue: 2,
        maxEnergyValue: 2,
        goldValue: 100,
        magicValue: 2,
        maxMagicValue: 2,
        spValue: 20,
        Store,
        Game
      }
    },
    methods: {
      changeMode (sMode) {
        this.mode = sMode || ''
      },

      addPlayer () {
        CtrlCharacter.addPlayer()
      },

      removePlayer () {
        CtrlCharacter.removePlayer(parseInt(this.selectedIdx))
        // 为了确保移除角色之后selectedIdx不会指向不存在的角色，重置该值
        this.selectedIdx = 0
      },

      changeEnergy () {
        CtrlEnergy.changeEnergy(parseInt(this.selectedIdx), parseInt(this.energyValue))
      },

      changeMaxEnergy () {
        CtrlEnergy.changeMaxEnergy(parseInt(this.selectedIdx), parseInt(this.maxEnergyValue))
      },

      changeGold () {
        CtrlGold.changeGold(parseInt(this.selectedIdx), parseInt(this.goldValue))
      },

      clearGold () {
        CtrlGold.clearGold(parseInt(this.selectedIdx))
      },

      changeMagic () {
        CtrlMagic.changeMagic(parseInt(this.selectedIdx), parseInt(this.magicValue))
      },

      changeMaxMagic () {
        CtrlMagic.changeMaxMagic(parseInt(this.selectedIdx), parseInt(this.maxMagicValue))
      },

      changeSp () {
        CtrlSp.changeSp(parseInt(this.selectedIdx), parseInt(this.spValue))
      },

      fullSp () {
        CtrlSp.fullSp(parseInt(this.selectedIdx))
      },

      clearSp () {
        CtrlSp.clearSp(parseInt(this.selectedIdx))
      },

      toggleVision () {
        CtrlGame.toggleVision()
      }
    }
  }
</script>

<style></style>
