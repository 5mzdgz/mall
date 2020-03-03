// pages/home/home.js
import { AdverModel } from '../../models/adver.js';
const adverModel = new AdverModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: false,
    navTitle: 'mall',
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
      swiperArr: [],
    },
    gridArr: [{
      id: 1,
      title: '广告位',
      icon: 'icon-ico_AD',
      iconBackground: '#A40959'
    },
    {
      id: 2,
      title: '媒体资讯',
      icon: 'icon-navzixunzhongxin',
      iconBackground: '#4E89FC'
    },
    {
      id: 3,
      title: '物品置换',
      icon: 'icon-qiehuanmoshi',
      iconBackground: '#31DF76'
    },
    {
      id: 4,
      title: '扫一扫',
      icon: 'icon-saoyisao',
      iconBackground: '#872CC3'
    }
    ],
    consultation: {
      cellData: {
        leftIcon: '',
        rightIcon: '',
        leftName: '资讯',
        leftNameBlod: 'blod',
        leftSub: '',
        rightSub: '',
        pageUrl: ''
      },
      cardData: {
        type: 1,
        height: 250,
        imageUrl: '/images/common/ad_banner2.png',
        title: '金难大道南',
        subArr: ['路口', '高杆'],
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
        icon: 'icon-zixun',
        price: 2000,
        unit: '元/月',
        videoUrl: null,
      }
    },
    recommend: {
      cellData: {
        leftIcon: '',
        rightIcon: '',
        leftName: '热门',
        leftNameBlod: 'blod',
        leftSub: '',
        rightSub: '',
        pageUrl: ''
      },
      cardArr:[
        {
          type: 1,
          height: 324,
          imageUrl: '/images/common/ad_banner2.png',
          title: '金难大道南',
          subArr: ['路口', '高杆'],
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
          icon: 'icon-dianhuazixun',
          price: 2000,
          unit: '元/月',
          videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        }
      ] 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerArr()
  },

  /**
   * 获取banner图
   */
  getBannerArr:function() {
    const swiperData = this.data.swiperData;
    const recommend = this.data.recommend;
    adverModel.adverBanner().then(res => {
      swiperData.swiperArr = res.data.records;
      console.log(res)
      this.setData({
        swiperData: swiperData
      })
    })
    adverModel.adverList().then(res => {
      const adverList = res.data.records;
      adverList.forEach(item => {
        item.height = 324
        item.icon = 'icon-dianhuazixun',
        item.rightText = '咨询'
      })
      recommend.cardArr = adverList
      console.log(res)
      this.setData({
        recommend: recommend
      })
    })
    // adverModel.searchType().then(res => {
    //   console.log(res)
    // })
  },

  /**
   * 搜索广告位
   */
  goadverTap: function() {
    wx.navigateTo({
      url: '../advertisement/advertisement',
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