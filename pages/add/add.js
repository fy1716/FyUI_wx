//logs.js
var app = getApp();
var util = require('../../utils/util.js')
var now = app.util.formatTime(new Date());
Page({
  data: {
    long: [5, 10, 15, 20, 25, 30, 45, 60, 90],
    level_show: ['低', '中', '高'],
    level: ['low', 'middle', 'high'],
    type_class: [],
    type_list: [],
    url: '/items/',
    method: 'POST',
    title: '',
    content: '',
    start_time: '',
    period: 30,
    typeIdx: 0,
    degreeIdx: 0,
  },
  //修改时间
  startTimeChange: function(e) {
    var that = this;
    this.setData({
      start_time: e.detail.value + ':00'
    })
  },
  //修改时长
  periodChange: function(e) {
    var that = this;
    var index = e.detail.value;
    this.setData({
      period: that.data.long[index]
    })
  },
  //修改优先级
  degreeChange: function(e) {
    var that = this;
    var index = parseInt(e.detail.value);
    this.setData({
      degreeIdx: index
    })
  },
  //修改类型
  typeChange: function(e) {
    var that = this;
    var index = parseInt(e.detail.value);
    this.setData({
      typeIdx: index
    })
  },
  // 获取类型列表
  queryTypeList: function(e) {
    var that = this;
    app.util.request({
      url: '/type/',
      success: function(res) {
        var list = res.map(function(item) {
          return item.name;
        })
        if (res) {
          that.setData({
            type_class: res,
            type_list: list
          })
        }
      }
    })
  },
  formSubmit: function(e) {
    var that = this;
    var value = e.detail.value;
    try {
      app.util.request({
        method: that.data.method,
        url: that.data.url,
        data: {
          "title": value.title,
          "content": value.content,
          "period": value.period,
          "degree": that.data.level[value.degreeIdx],
          "item_type": that.data.type_class[value.typeIdx].id,
        },
        success: function(res) {
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(function() {
            wx.navigateBack();
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
  onLoad: function (options) {
    this.queryTypeList();
    if (options.type == "edit") {
      var selectItem = app.globalData.selectItem;
      console.log(app.globalData.selectItem);
      this.setData({
        url: '/items/' + selectItem.id + '/',
        method: 'PUT',
        title: selectItem.title,
        content: selectItem.content,
        start_time: selectItem.start_time,
        period: selectItem.period,
        typeIdx: selectItem.item_type - 1,
        degreeIdx: this.data.level.indexOf(selectItem.degree),
      })
    }
  }
})