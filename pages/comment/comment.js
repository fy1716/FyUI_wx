//logs.js
var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    url: "",
    finish_degree: 0,
    remark: '',
  },
  //修改完成度
  degreeChange: function(e) {
    var that = this;
    this.setData({
      finish_degree: e.detail
    })
    wx.showToast({
      icon: 'none',
      title: `当前值：${e.detail}`
    });
  },
  formSubmit: function(e) {
    var that = this;
    var remark = e.detail.value.remark;
    try {
      app.util.request({
        method: "PUT",
        url: that.data.url,
        data: {
          title: that.data.title,
          content: that.data.content,
          item_type: that.data.item_type,
          finish_degree: that.data.finish_degree,
          finish_flag: true,
          remark: remark,
        },
        success: function(res) {
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(function() {
            wx.navigateTo({
              url: '../todo_list/todo_list'
            })
          }, 800);
        },
        fail: function(res) {
          console.log(res);
          wx.showToast({
            title: '保存失败',
            icon: 'loading'
          })
        }
      })
    } catch (e) {
      console.log(e);
      wx.showToast({
        title: '保存失败：异常',
        icon: 'loading'
      })
    }
  },
  onLoad: function(options) {
    var selectItem = app.globalData.selectItem;
    console.log(app.globalData.selectItem);
    this.setData({
      title: selectItem.title,
      content: selectItem.content,
      item_type: selectItem.item_type,
      url: "/items/" + selectItem.id + '/',
      finish_degree: selectItem.finish_degree,
      remark: selectItem.remark,
    })
  }
})