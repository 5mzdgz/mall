// components/common/image-card/image-card.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
   */
    videoErrorCallback (e) {
      // console.log('视频错误信息:')
      // console.log(e.detail.errMsg)
    },

    bindplay () {//开始播放按钮或者继续播放函数
      // console.log("开始播放")
      wx.hideLoading();
    },
    bindpause () {//暂停播放按钮函数
      // console.log("停止播放")
    },
    bindend () {//播放结束按钮函数
      // console.log("播放结束")
    },
    bindtimeupdate: function (res) {//播放中函数，查看当前播放时间等
      // console.log(res)//查看正在播放相关变量
      // console.log("播放到第" + res.detail.currentTime + "秒")//查看正在播放时间，以秒为单位
    },
    goAdverTap() {
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    },
    caneclCollection() {
      
    }
  }
})
