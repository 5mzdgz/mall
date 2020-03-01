// pages/Collection/Collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '收藏',
    cardData: {
      type: 1,
      height: 324,
      imageUrl: '/images/common/ad_banner2.png',
      title: '金难大道南',
      subArr: ['路口', '高杆'],
      isColletion: 1,
      attrArr: [
        {
          label: '高',
          number: 80,
          unit: 'm'
        },
        {
          label: '长',
          number: 80,
          unit: 'm'
        },
        {
          label: '宽',
          number: 80,
          unit: 'm'
        }
      ],
      rightText: '咨询',
      icon: 'icon-xiangyou',
      price: 2000,
      unit: '元/月',
      videoUrl: null,
    }
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