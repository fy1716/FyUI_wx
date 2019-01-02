// pages/todo_list/todo_list.js
//获取应用实例
var app = getApp();
var degree_color_map = {
  "low": "fy_bk_color_bl",
  "middle": "fy_bk_color_og",
  "high": "fy_bk_color_rd",
}
Page({
  data: {
    select_id: '',
    list: {},
    type_class: [],
    type_list: [],
    type_color: ['', 'danger', 'primary', 'success'],
    visible2: false
  },
  handleOpen(e) {
    this.setData({
      visible2: true
    });
    this.setData({
      select_id: e.currentTarget.dataset.selectId
    })
  },
  handleClose() {
    this.setData({
      visible2: false
    });
  },
  //清单详情
  detail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  query_list: function() {
    var that = this;
    // 获取列表数据
    app.util.request({
      url: '/items/',
      success: function(res) {
        that.setData({
          list: res.results
        })
      }
    })
  },
  //删除数据
  del: function(e) {
    var that = this;
    that.setData({
      visible2: false
    });
    app.util.request({
      method: 'delete',
      url: '/items/' + that.data.select_id + '/',
      success: function(res) {
        that.query_list();
      }
    })
  },
  editItem: function(e) {
    var select_id = e.currentTarget.dataset.selectId;
    app.globalData.selectItem = this.data.list[select_id];
    this.toAddPage('edit');
  },
  toAddPage: function(type) {
    if (type != "edit") {
      type = "add";
    }
    wx.navigateTo({
      url: '../add/add?type='+type
    })
  },
  toSettings: function(e) {
    wx.navigateTo({
      url: '../settings/settings'
    })
  },
  toHelp: function(e) {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  //清单详情
  comment: function (e) {
    wx.navigateTo({
      url: '../comment/comment'
    })
  },
  onLoad: function() {
  },
  onShow: function() {
    this.query_list();
  }
})