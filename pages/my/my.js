// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: false,
    navTitle: '个人中心',
    gridArr: [
      {
      id: 1,
      title: '发布消息',
        icon: 'icon-fabudaochuzhuomiankuaijie'
      },
      {
        id: 2,
        title: '我的收藏',
        icon: 'icon-pingfen'
      },
      {
        id: 3,
        title: '操作记录',
        icon: 'icon-fenleifill'
      }
    ],
    cellArr: [
      {
        leftIcon: 'icon-fabudaochuzhuomiankuaijie',
        rightIcon: 'icon-xiangyou',
        leftName: '发布消息',
        leftNameBlod: '',
        leftSub: '',
        rightSub: '',
        pageUrl: '/pages/release/release'
      },
      {
        leftIcon: 'icon-pingfen',
        rightIcon: 'icon-xiangyou',
        leftName: '我的收藏',
        leftNameBlod: '',
        leftSub: '',
        rightSub: '',
        pageUrl: '/pages/collection/collection'
      },
      {
        leftIcon: 'icon-jilu',
        rightIcon: 'icon-xiangyou',
        leftName: '操作记录',
        leftNameBlod: '',
        leftSub: '',
        rightSub: '',
        pageUrl: '/pages/record/record'
      },
      {
        leftIcon: 'icon-ziyuan1',
        rightIcon: 'icon-xiangyou',
        leftName: '关于我们',
        leftNameBlod: '',
        leftSub: '',
        rightSub: '',
        pageUrl: '/pages/about/about'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goAuth:function() {
    wx.navigateTo({
      url: '/pages/auth/auth',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})