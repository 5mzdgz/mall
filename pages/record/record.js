// pages/record/record.js
import { config } from '../../config.js';
import { AdverModel } from '../../models/adver.js';
const adverModel = new AdverModel();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '记录',
    navbarInitTop: app.globalData.navHeight, //导航栏初始化距顶部的距离
    isFixedTop: false, //是否固定顶部
    obj: {
      page: 1,
      pageSize: 10
    },
    productList: [],
    navArr: [
      {
        checkStatus: 0,
        navName: '全部',
        icon: ''
      },
      {
        checkStatus: 1,
        navName: '已通过',
        icon: ''
      },
      {
        checkStatus: 2,
        navName: '待审核',
        icon: ''
      },
      {
        checkStatus: 3,
        navName: '未通过',
        icon: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdStatusList(this.data.obj)
  },

  navCall: function(e) {
    let obj = this.data.obj;
    if (e.detail.navItem) {
      obj.checkStatus = e.detail.navItem;
    } else {
      obj = {
        page: 1,
        pageSize: 10
      }
    }
    this.getAdStatusList(obj);
  },

  getAdStatusList: function (obj) {
    adverModel.adStatusList(obj).then(res => {
      console.log(res)
      const productList = res.data.records
      if (productList.length > 0) {
        productList.forEach(item => {
          switch (item.checkStatus) {
            case 1:
              item.checkStatusName = '已通过'
            break;
            case 2:
              item.checkStatusName = '待审核'
            break;
            case 3:
              item.checkStatusName = '未通过'
            break;
          }
        })
      }
      this.setData({
        productList: productList
      })
    })
  },
  /**
   * 监听页面滑动事件
   */
  onPageScroll: function (e) {
    var that = this;
    var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度

    //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
    var isSatisfy = scrollTop >= that.data.navbarInitTop ? true : false;
    //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
    if (that.data.isFixedTop === isSatisfy) {
      return false;
    }
    // console.log(isSatisfy)
    that.setData({
      isFixedTop: isSatisfy
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.navSticky = this.selectComponent('#sticky');
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