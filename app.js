/*
全局设置
*/
import wxValidate from 'utils/wxValidate'
App({
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  onError: function (msg) {
    console.log(msg)
  },
  util: require("utils/util.js"),
  globalData: {
    openId: ""
  },
  getOnShowFn: function () {
    var data = wx.getStorageSync('set');
    return data.noShowFn ? 1 : 0;
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
})