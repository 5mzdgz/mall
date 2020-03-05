// pages/detail/detail.js
let QQMapWX = require('../../utils/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');
let qqmapsdk;
import { AdverModel } from '../../models/adver.js';
const adverModel = new AdverModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '广告详情',
    detailData: {
      height: 353, //轮播图高度
      circular: true, //轮播衔接
      duration: 500, //切换动作时间
      interval: 5000, //切换间隔时间
      autoplay: true, //是否自动切换
      indicatorDots: true, // 是否显示指示点
      vertical: false, //是否纵向滚动
      current: 0, //滚动到当前项
      onChange: 'swiperBannerChange', //change事件名称
      swiperArr: [],
    },
    subkey: '5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4',
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
    longitude: '',
    latitude: '',
    scale: 15,
    markers: [],
    isCollection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.itemId = options.itemId;
    console.log(options.itemId);
    this.getDetailData(options.itemId);
    // this.getCurrentLL();
    this.getCollectSearch(options.itemId);
  },

  getCollectSearch: function (itemId) {
    adverModel.collectSearch(itemId).then(res => {
      console.log(res)
      if (res.code === 40006) {
        this.setData({
          isCollection: false
        })
      } else {
        this.setData({
          isCollection: true
        })
      }
    })
  },
  getDetailData: function (itemId) {
    adverModel.adverDetail(itemId).then(res => {
      const detailData = res.data;
      console.log(res)
      detailData.height = 353
      detailData.circular = true
      detailData.duration = 500
      detailData.interval = 5000
      detailData.autoplay = true
      detailData.indicatorDots = true
      detailData.vertical = false
      detailData.current = 0, //滚动到当前项
      detailData.onChange = 'swiperBannerChange'
      const arr = []
      detailData.imageUrlList.forEach(item => {
        const obj = { imageUrl: item };
        arr.push(obj)
      })
      // console.log(arr)
      detailData.swiperArr = arr
      this.setData({
        detailData: detailData,
        markers: [{
          id: 0,
          longitude: detailData.longitude,
          latitude: detailData.latitude,
          title: detailData.adAddress,
          iconPath: '/images/common/map_icon.png',
          width: 25,
          height: 25
        }]
      })
    })
  },  

  /**
   * 获取当前位置
   */
  getCurrentLL: function () {
    let self = this
    wx.getLocation({
      success: function (res) {
        self.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        self.showAddress(res.longitude, res.latitude);
      },
      cancel: function (res) {
        alert('对不起,请允许获取您的地理位置');
        wx.closeWindow();
      },
      fail: function (res) {
        alert('系统检测到微信没有获取位置权限,请先开启再来哦')
      }
    })
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
        console.log(res.result.location)
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