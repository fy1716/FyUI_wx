// pages/todo_list/todo_list.js
import initCalendar from '../../resource/component/calendar/main.js';
import { switchView, getSelectedDay  } from '../../resource/component/calendar/main.js';
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
    raw_list: {},
    type_class: [],
    type_list: [],
    type_color: ['', 'danger', 'primary', 'success'],
    visible2: false,
    finish_filter: true
  },
  // 选择日期
  changeDate() {
    var select_day = getSelectedDay()[0];
    console.log(select_day);
    if (select_day != app.globalData.date) {
      app.globalData.date = [select_day.year, select_day.month, select_day.day].map(app.util.formatNumber).join('-');
      this.query_list();
    }
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
  // 完成过滤
  finish_change: function() {
    var flag = this.data.finish_filter;
    if (flag) {
      var list = this.data.raw_list.filter(
        function(element) {
          return element.finish_degree == 0
        }
      )
      console.log(list);
    } else {
      var list = this.data.raw_list;
    }
    this.setData({
      finish_filter: !flag,
      list: list
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
      url: '/items/?search=' + app.globalData.date,
      success: function(res) {
        that.setData({
          list: res.results,
          raw_list: res.results
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
    var select_id = e.currentTarget.dataset.selectId;
    app.globalData.selectItem = this.data.list[select_id];
    wx.redirectTo({
      url: '../comment/comment'
    })
  },
  onLoad: function() {
    initCalendar();
    switchView('week');
    app.globalData.date = app.util.formatDate(new Date());
  },
  onShow: function() {
    this.query_list();
  }
})