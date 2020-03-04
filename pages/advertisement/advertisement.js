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
      { id: 0,  navName: '区域', checked: false, searchData: [] },
      { id: 1, navName: '时间', checked: false, searchData: [] },
      { id: 2, navName: '价格', checked: false, searchData: [] },
      { id: 3, navName: '趋向', checked: false, searchData: [] },
      { id: 4, navName: '类型', checked: false, searchData: [] },
      { id: 5, navName: '更多', checked: false, searchData: [] }
    ],
    searchData: {},
    searchArr: [],
    selected: -1,
    labelCheckedArr: [],
    obj: {
      page: 1,
      pageSize: 2
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight
    })
    this.getNavArr();
    this.getSearchArr(this.data.obj);
  },

  /**
   * 关键字搜索
   */
  nameSaerchData: function (e) {
    const name = e.detail.value
    let obj = this.data.obj;
    obj['searchName'] = e.detail.value
    adverModel.searchType(obj).then(res => {
      console.log(res)
      const searchArr = res.data.records;
      if (searchArr.length > 0) {
        searchArr.forEach(item => {
          item.height = 324
          item.icon = 'icon-dianhuazixun',
          item.rightText = '咨询'
        })
      }
      this.setData({
        searchArr: searchArr,
        obj: {
          page: 1,
          pageSize: 2
        }
      })
    })
  },

  /**
   * 选择类型，小箱
   */
  navItemTap: function (e) {
    this.setData({
      recommendArr: []
    })
    let navArr = this.data.navArr;
    let items = e.currentTarget.dataset.item;
    console.log(items)
    navArr[this.data.selected].checked = true
    navArr[this.data.selected].searchData.forEach(item => {
      item.checked = false
      if (items.desc === item.desc) {
        item.checked = true
      }
    })

    let obj = this.data.obj;
    if (this.data.selected === 0) {
      obj.areaId = items.areaId
    }
    if (this.data.selected === 1) {
      obj.cycleId = items.cycleId
    }
    if (this.data.selected === 2) {
      obj.priceId = items.priceId
    }

    if (this.data.selected === 3) {
      obj.industryId = items.industryId
    }

    if (this.data.selected === 4) {
      obj.typeId = items.typeId
    }
    console.log(navArr)
    this.getSearchArr(obj);
    this.setData({
      navArr: navArr,
      selected: -1
    })
  },

  getSearchArr: function (obj) {
    adverModel.searchType(obj).then(res => {
      console.log(res.data.records)
      const searchArr = res.data.records;
      if (searchArr.length > 0) {
        searchArr.forEach(item => {
          item.height = 324
          item.icon = 'icon-dianhuazixun',
          item.rightText = '咨询'
        })
      }
      this.setData({
        searchArr: searchArr
      })
    })
  },

  calerNavItemTap: function() {
    let obj = this.data.obj;
    const navArr = this.data.navArr;
    navArr[this.data.selected].checked = false
    navArr[this.data.selected].searchData.forEach(item => {
      item.checked = false
    })
    switch (this.data.selected) {
      case 0:
        obj.areaId = ''
        break
      case 1:
        obj.cycleId = ''
        break
      case 2:
        obj.priceId = ''
        break
      case 3:
        obj.industryId = ''
        break
      case 4:
        obj.typeId = ''
        break
      default:
        
        break
    }
    console.log(obj)
    this.getSearchArr(obj)
    this.setData({
      navArr: navArr,
      obj: obj,
      selected: -1
    })
  },

  labelItemTap:function(e) {
    const items = e.currentTarget.dataset.item;
    const navArr = this.data.navArr;
    let labelCheckedArr = this.data.labelCheckedArr;
    navArr[this.data.selected].checked = true
    console.log(items)
    
    navArr[this.data.selected].searchData[0].labelArr.forEach(item => {

      if (items.desc === item.desc) {
        if (item.checked) {
          item.checked = false
        } else {
          if (labelCheckedArr.length === 3) {
            wx.showToast({
              icon: 'none',
              title: '最多可选三个标签'
            })
            return false;
          }
          item.checked = true
          labelCheckedArr.push(item)
        }
      }
    })

    const obj = this.data.obj;
    let str = '';
    labelCheckedArr.forEach(item => {
      str += item.labelId + ','
    })
    obj.labelId = str.substring(0, str.length - 1);
    this.getSearchArr(obj);
    this.setData({
      navArr: navArr,
      labelCheckedArr: labelCheckedArr
    })
  },

  cancelLabelTap: function() {
    const obj = this.data.obj;
    obj.labelId = '';
    const navArr = this.data.navArr;
    navArr[this.data.selected].checked = false
    navArr[this.data.selected].searchData[0].labelArr.forEach(item => {
      item.checked = false
    })
    this.getSearchArr(obj)
    this.setData({
      navArr: navArr,
      obj: obj,
      selected: -1
    })
  },

  confrimLabelTap: function() {
    this.setData({
      selected:-1
    })
  },

  /**
   * 选择区域，价格，类型，更多
   */
  selectedTap: function (e) {
    // console.log(e)
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
        item.checked = false
      })
      navArr[0].searchData = res.data.areaEntityList
      res.data.cycleEntityList.forEach(item => {
        item.desc = item.cycleName
        item.checked = false
      })
      navArr[1].searchData = res.data.cycleEntityList
      res.data.priceEntityList.forEach(item => {
        item.desc = item.lowPrice + '-' + item.highPrice
        item.checked = false
      })
      navArr[2].searchData = res.data.priceEntityList
      res.data.industryEntityList.forEach(item => {
        item.desc = item.indName
        item.checked = false
      })
      navArr[3].searchData = res.data.industryEntityList
      res.data.typeEntityList.forEach(item => {
        item.desc = item.typeName
        item.checked = false
      })
      navArr[4].searchData = res.data.typeEntityList
      let arr = [
        {
          labelTitel: '',
          labelArr: []
        }
      ]
      res.data.labelEntityList.forEach(item => {
        item.desc = item.labelName
        item.checked = false
      })
      arr[0].labelTitel = '标签'
      arr[0].checked = false
      arr[0].labelArr = res.data.labelEntityList
      navArr[5].searchData = arr
      // console.log(navArr[5].searchData)
      console.log(navArr)
      this.setData({
        navArr: navArr
      })
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