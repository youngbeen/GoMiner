<template>
  <div class="bed-info">
    <div class="info-item" v-for="item in Store.characters">
      <div class="col-md-1" style="text-align: center; color: rgb(241,126,20);">
        <i class="fa fa-arrow-circle-right" v-show="Game.currentPlayerIdx === $index"></i>
      </div>
      <div class="col-md-3 info-name">
        <strong v-show="mode !== 'edit' || currentIdx !== $index" v-on:click="changeMode($index)" title="点击更改名字">{{ item.name }}</strong>
        <div class="row" v-show="mode === 'edit' && currentIdx === $index">
          <input type="text" class="form-inline col-md-8" v-model="item.name" v-on:keyup.enter="changeName($index)" maxlength="20" placeholder="请输入角色名字" />
          <button class="btn btn-primary col-md-3" v-on:click="changeName($index)"><i class="fa fa-check" aria-hidden="true"></i> 确定</button>
        </div>
      </div>
      <div class="col-md-2">
        <small><i class="fa fa-heart"></i> 能量:</small> <span v-bind:class="{ 'info-value': item.energy > dangerLimit.energy, 'info-value-danger': item.energy <= dangerLimit.energy }">{{ item.energy }}</span> <small>({{ item.maxEnergy }})</small>
      </div>
      <div class="col-md-2">
        <small><i class="fa fa-money"></i> 金币:</small> <span v-bind:class="{ 'info-value': item.gold > dangerLimit.gold, 'info-value-danger': item.gold <= dangerLimit.gold }">{{ item.gold }}</span>
      </div>
      <div class="col-md-2">
        <small><i class="fa fa-magic"></i> 魔法:</small> <span v-bind:class="{ 'info-value': item.magic > dangerLimit.magic, 'info-value-danger': item.magic <= dangerLimit.magic }">{{ item.magic }}</span> <small>({{ item.maxMagic }})</small>
      </div>
      <div class="col-md-2">
        <div class="col-md-4">
          <small><i class="fa fa-bolt"></i> SP:</small>
        </div>
        <!-- <small><i class="fa fa-bolt"></i> SP:</small> <span v-bind:class="{ 'info-value': item.sp > 3, 'info-value-danger': item.sp <= 5 }">{{ item.sp }}</span> <small>({{ item.maxSp }})</small> -->
        <div class="col-md-8">
          <div class="progress" style="margin: 5px 0 0;">
            <div class="progress-bar" v-bind:class="{ 'progress-bar-danger': item.sp === item.maxSp }" role="progressbar" aria-valuenow="{{ item.sp }}" aria-valuemin="0" aria-valuemax="{{ item.maxSp }}" v-bind:style="{ width: item.sp + '%' }" style="min-width: 1em;">
              {{ item.sp }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Game from '../models/Game'
  import Store from '../models/Store'

  export default {
    data () {
      return {
        mode: 'normal',
        currentIdx: '',
        dangerLimit: {
          energy: 5,
          gold: 0,
          magic: 3
        },
        Store,
        Game
      }
    },
    methods: {
      changeMode (idx) {
        if (this.mode !== 'edit') {
          this.mode = 'edit'
          this.currentIdx = idx
        }
      },
      changeName (idx) {
        if (this.Store.characters[idx].name) {
          this.mode = 'normal'
          this.currentIdx = ''
        }
      }
    }
  }
</script>

<style>
.info-item {
  margin: 6px 0;
  height: 30px;
  line-height: 30px;
}

.info-name, .info-value {
  color: rgb(215,157,40);
  font-size: 18px;
}

.info-value-danger {
  color: rgb(214,69,112);
  font-size: 18px;
}

.info-name strong {
  cursor: pointer;
}
</style>
