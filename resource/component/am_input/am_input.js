// resource/component/am_input/am_input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    change: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _isNum: function(s) {
      if (s <= 0 || s.toString().indexOf('.') !== -1) {
        return false
      }
      return true;
    } ,
    _getTip: function (tip) {
      wx.showToast({
        title: tip,
        icon: 'loading',
        duration: 1500,
        mask: true
      });
      this.setData({
        count: this.data.count
      })
    },
    _checkCount: function (value, count) {
      var that = this;
      if (isNaN(value)) {
        that._getTip("请输入数字");
        return false;
      }
      if (!that._isNum(count)) {
        that._getTip("请输入有效数字");
        return false;
      }
      return true;
    },
    // 设置value
    _setValue: function (change) {
      var that = this;
      let count = that.data.count + change;

      if (that._checkCount(change, count)) {
        that.setData({
          count: count,
          change: change
        })
        that.triggerEvent('getChangeEvent', that.data.change);
      }
    },
    // 增加数量
    addCount: function () {
      var that = this;
      that._setValue(1);
    },
    // 减少数量
    minusCount: function () {
      var that = this;
      that._setValue(-1);
    },
    /* 输入框事件 */
    bindManual: function (newVal) {
      var that = this;
      that._setValue(Number(newVal.detail.value) - that.data.count);
    }
  }
})
