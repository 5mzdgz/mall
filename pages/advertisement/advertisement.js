// pages/advertisement/advertisement.js
import { AdverModel } from '../../models/adver.js';
const adverModel = new AdverModel();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '广告位',
    navArr: [
      { navName: '区域', checked: false, searchData: [] },
      { navName: '时间', checked: false, searchData: [] },
      { navName: '价格', checked: false, searchData: [] },
      { navName: '更多', checked: false, searchData: [] }
    ],
    searchData: {},
    selected: -1,
    obj: {},
    cardArr: [],
    cardData: {
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
    this.setData({
      navHeight: app.globalData.navHeight
    })
    this.getNavArr()
  },

  /**
   * 选择区域，价格，类型，更多
   */
  selectedTap: function (e) {
    console.log(e)
    let navArr = this.data.navArr;
    let index = e.currentTarget.dataset.index;

    this.setData({
      searchData: navArr[index].searchData,
      selected: index
    })
  },

  getNavArr: function() {
    adverModel.navArr().then(res => {
      let navArr = this.data.navArr
      console.log(res)
      res.data.areaEntityList.forEach(item => {
        item.desc = item.areaName
      })
      navArr[0].searchData = res.data.areaEntityList
      res.data.cycleEntityList.forEach(item => {
        item.desc = item.cycleName
      })
      navArr[1].searchData = res.data.cycleEntityList
      res.data.priceEntityList.forEach(item => {
        item.desc = item.lowPrice + '-' + item.highPrice
      })
      navArr[2].searchData = res.data.priceEntityList
      res.data.industryEntityList.forEach(item => {
        item.desc = item.indName
      })
      res.data.labelEntityList.forEach(item => {
        item.desc = item.labelName
      })
      res.data.typeEntityList.forEach(item => {
        item.desc = item.typeName
      })
      navArr[3].searchData.push(res.data.industryEntityList, res.data.labelEntityList, res.data.typeEntityList)
    })
  },

  navItemTap: function() {
    this.setData({
      selected: -1
    })
  },

  /**
   * 隐藏
   */
  hidePopuTap: function () {
    this.setData({
      selected: -1
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