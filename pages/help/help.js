// const { $Message } = require('../../third_part/iview_example/dist/base/index');

Page({
  data: {
    visible2: false
  },

  handleOpen2() {
    this.setData({
      visible2: true
    });
  },

  handleClose2() {
    this.setData({
      visible2: false
    });
  }
});