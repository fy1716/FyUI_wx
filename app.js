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
  }
})