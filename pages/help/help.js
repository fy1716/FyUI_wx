import initCalendar from '../../resource/component/calendar/main.js';
import {
  switchView
} from '../../resource/component/calendar/main.js';

const conf = {
  onShow: function() {
    initCalendar();
    switchView('week');
    setTimeout(function() {
      wx.vibrateLong();
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = 'https://www.yydfsk.site/media/sound/alert.mp3'
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }, 5000);
  }
};

Page(conf);