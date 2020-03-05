// pages/Collection/Collection.js
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
    navTitle: '收藏',
    obj: {
      page: 1,
      pageSize: 5
    },
    collectArr: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList(this.data.obj);
  },

  getCollectList: function (obj) {
    adverModel.collectList(obj).then(res => {
      console.log(res)
      res.data.records.forEach(item => {
        item.height = 324
        item.icon = 'icon-dianhuazixun'
        item.rightText = '咨询'
        item.isColletion = true
      })
      this.setData({
        collectArr: res.data.records
      })
    })
  },

  canecl:function(e) {
    let collectArr = this.data.collectArr;
    let itemIds = e.detail.itemId
    console.log(itemIds)
    adverModel.cancelCollect(itemIds).then(res => {
      if(res.code === 200) {
        const filterArr = collectArr.filter(item => {
          return item.itemId != itemIds
        })
        this.setData({
          collectArr: filterArr
        })
      }
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