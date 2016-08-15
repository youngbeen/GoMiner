import $ from '../../static/js/jquery-1.11.3.min.js'
window.$ = $
window.jQuery = $

export default {
  // 播放音效 -- 音效名称，是否循环播放音效
  playSound (soundName, isLoop) {
    isLoop ? isLoop = true : isLoop = false
    // console.log(soundName, $('audio#game-sound'))
    $('audio#game-sound').attr('src', '')
    $('audio#game-sound').attr('src', './static/audio/' + soundName + '.wav')

    $('audio#game-sound').attr('loop', isLoop)
  }
}
