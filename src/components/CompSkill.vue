<template>
  <div class="window-skill" v-show="Game.isSkillWindowShow" v-on:click="hideWindow()">
    <div class="box-skill">
      <!-- 头像 -->
      <div class="box-avatar">
        <img class="skill-avatar" v-bind:src="roleAvatarUrl" alt="头像" />
      </div>
      <div class="box-allskills">
        <!-- 种族技能 -->
        <div class="box-raceskill" v-for="item in raceSkills">
          <div class="row">
            <div class="col-md-4">
              <img v-bind:src="item.imgUrl" alt="图片" class="skill-pic">
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-4">{{ item.text }}</div>
                <div class="col-md-8">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 获得技能 -->
        <div class="box-givenskill" v-for="item in givenSkills">
          <div class="row">
            <div class="col-md-4">
              <img v-bind:src="item.imgUrl" alt="图片" class="skill-pic">
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-4">{{ item.text }}</div>
                <div class="col-md-8">{{ item.description }}</div>
              </div>
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
import CtrlGame from '../controllers/CtrlGame'

export default {
  data () {
    return {
      Game,
      Store
    }
  },
  computed: {
    raceSkills () {
      if (Store.characters.length && Game.currentPlayerIdx !== '' && Store.characters[Game.currentPlayerIdx].raceSkills.length) {
        let raceSkills = []
        let raceSkillIds = Store.characters[Game.currentPlayerIdx].raceSkills

        for (let i = 0; i < raceSkillIds.length; i++) {
          for (let j = 0; j < Store.raceSkills.length; j++) {
            if (raceSkillIds[i] === Store.raceSkills[j].id) {
              raceSkills.push(Store.raceSkills[j])
              raceSkills[raceSkills.length - 1].imgUrl = './static/img/raceskill' + (Store.raceSkills[j].id + 1) + '.png'
              break
            }
          }
        }

        return raceSkills
      } else {
        return []
      }
    },
    givenSkills () {
      if (Store.characters.length && Game.currentPlayerIdx !== '' && Store.characters[Game.currentPlayerIdx].givenSkills.length) {
        let givenSkills = []
        let givenSkillIds = Store.characters[Game.currentPlayerIdx].givenSkills

        for (let i = 0; i < givenSkillIds.length; i++) {
          for (let j = 0; j < Store.givenSkills.length; j++) {
            if (givenSkillIds[i] === Store.givenSkills[j].id) {
              givenSkills.push(Store.givenSkills[j])
              givenSkills[givenSkills.length - 1].imgUrl = './static/img/givenskill' + (Store.givenSkills[j].id + 1) + '.png'
              break
            }
          }
        }

        return givenSkills
      } else {
        return []
      }
    },
    roleAvatarUrl () {
      if (Store.characters.length && Game.currentPlayerIdx !== '') {
        return './static/img/player' + (Store.characters[Game.currentPlayerIdx].role + 1) + '.png'
      } else {
        return ''
      }
    }
  },
  methods: {
    hideWindow () {
      CtrlGame.hideSkillWindow()
    }
  }
}
</script>

<style>
.window-skill {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(237,238,227, .9);
  text-align: center;

  z-index: 1200;
}

.box-skill {
  display: inline-block;
  /*margin: 250px 0;*/
  width: 600px;
  /*height: 150px;*/
  /*line-height: 150px;*/
  padding: 20px 0 10px;

  background-color: white;
  border: 2px solid black;
  border-radius: 4px;
}

.box-avatar {
  text-align: center;
}

.box-allskills {
  margin: 20px;

  max-height: 400px;
  overflow-y: scroll;
}

.skill-avatar {
  width: 100px;
  height: 100px;
}

.box-raceskill {
  margin: 0 8px 8px;

  background-color: rgb(233,231,226);
  box-shadow: 1px 1px 2px rgb(26,27,29);
}

.box-givenskill {
  margin: 0 8px 8px;

  background-color: rgb(193,201,242);
  box-shadow: 1px 1px 2px rgb(26,27,29);
}

.skill-pic {

}
</style>
