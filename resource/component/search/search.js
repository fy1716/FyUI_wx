Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comPlaceholder:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVal: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    /**清空搜索 */
    clearInput: function () {
      var that = this;
      this.setData({
        inputVal: "",
        inputShowed: false
      });
      this.triggerEvent('searchEvent', this.data.inputVal);
    },
    search: function () {
      this.triggerEvent('searchEvent', this.data.inputVal);
    }
  }
})
