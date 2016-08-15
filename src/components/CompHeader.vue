<template>
  <div class="bed-header">
    <info></info>
    <action-panel></action-panel>
    <cheat-sheet></cheat-sheet>
  </div>
</template>

<script>
import CompInfo from './CompInfo'
import CompActionPanel from './CompActionPanel'
import CompCheatSheet from './CompCheatSheet'

export default {
  components: {
    info: CompInfo,
    'action-panel': CompActionPanel,
    'cheat-sheet': CompCheatSheet
  }
}
</script>

<style>
.bed-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  /*margin: 5px 10px;*/

  padding: 5px 10px;
  background-color: white;
  border-bottom: 2px solid black;
  /*border-radius: 6px;*/

  z-index: 1000;
}
</style>
