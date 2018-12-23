var app = getApp();
var userinfoutil = {};

//获取openid
function getOpenId(code) {
  var that = this;
  app.util.request({
    url: '/dfapi?api=002',
    data: { "login_code": code },
    method: 'POST',
    success: function (res) {
      if (res.data.Result == 'success') {
        app.globalData.openId = res.data.Message.openid;
        wx.setStorageSync('openId', res.data.Message.openid);
      }
    }
  });
}

//获取登录code
userinfoutil.getUserinfo = function () {
  var that = this;
  wx.login({
    success: function (res) {
      if (res.code) {
        getOpenId(res.code);
      }
    }
  });
}

//帐户支付
userinfoutil.pay_user_account = function () {

}
//微信支付
userinfoutil.pay_wx_api = function () {

}
//获取地址信息
userinfoutil.gps_loc = function () {

}

module.exports = userinfoutil;