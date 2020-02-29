// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '广告详情',
    swiperData: {
      height: 353, //轮播图高度
      circular: true, //轮播衔接
      duration: 500, //切换动作时间
      interval: 5000, //切换间隔时间
      autoplay: true, //是否自动切换
      indicatorDots: true, // 是否显示指示点
      vertical: false, //是否纵向滚动
      current: 0, //滚动到当前项
      onChange: 'swiperBannerChange', //change事件名称
      swiperArr: [{
        id: 1,
        imgUrl: '/images/tab/home.png'
      },
      {
        id: 1,
        imgUrl: '/images/tab/selected_home.png'
      },
      {
        id: 1,
        imgUrl: '/images/tab/home.png'
      }
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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