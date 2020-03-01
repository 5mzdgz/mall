// pages/detail/detail.js
let QQMapWX = require('../../utils/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');
let qqmapsdk;
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
        imgUrl: '/images/common/ad_banner1.png'
      },
      {
        id: 2,
        imgUrl: '/images/common/ad_banner2.png'
      },
      {
        id: 3,
        imgUrl: '/images/common/ad_banner3.png'
      },
      {
        id: 4,
        imgUrl: '/images/common/ad_banner4.png'
      }
      ],
    },
    subkey: '66IBZ-RQRKV-25IPI-UMF6H-S2XSJ-KCFRO',
    markers: [],
    cellData: {
      leftIcon: '',
      rightIcon: '',
      leftName: '广告牌位置',
      leftNameBlod: 'blod',
      leftSub: '',
      rightSub: '',
      pageUrl: ''
    },
    adData: {
      leftIcon: '',
      rightIcon: '',
      leftName: '基本信息',
      leftNameBlod: 'blod',
      leftSub: '',
      rightSub: '',
      pageUrl: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 地图图标
   */
  showAddress: function (longitude, latitude) {
    let self = this;
    // 实例化腾讯地图API核心类  
    qqmapsdk = new QQMapWX({
      key: this.data.subkey
    });
    // this.mapCtx = wx.createMapContext('myMap');
    // 腾讯地图调用接口  
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        self.setData({
          markers: [{
            id: 0,
            longitude: res.result.location.lng,
            latitude: res.result.location.lat,
            title: res.result.address,
            iconPath: '/images/common/map_icon.png',
            width: 25,
            height: 25
          }]
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
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