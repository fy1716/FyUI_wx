var app = getApp()
Page({
  data: {
    username: '',
    userPassword: '',
    userInfo: {},
  },
  onLoad: function (options) {
    this.WxValidate = app.wxValidate(
      {
        username: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        password: {
          required: true
        }
      }
      , {
        username: {
          required: '请填写用户名',
        },
        password: {
          required: '请填写密码',
        }
      }
    )
  },
  //
  showError(res) {
    app.util.fyShowTip(res.data.Message, 'loading', 1000);
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    //提交表单数据
    this.setData({ userInfo: e.detail.value });
    app.util.request({
      url: '/account/login',
      method: 'POST',
      data: this.data.userInfo,
      success: function (res) {
        wx.setStorageSync('username', that.data.userInfo.username);
        
        wx.showToast({
          title: "登录成功",
          icon: 'success',
          duration: 1000
        });
        app.util.request({
          url: '/account/test',
          success: function (res) {
            console.log(res);
          }
        })
      },
      failHandler: {
        201: that.showError,
      }
    })
  }
})