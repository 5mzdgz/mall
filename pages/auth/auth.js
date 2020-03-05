// pages/auth/auth.js
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
    navTitle: '资质认证',
    companyImage: '',
    tempFilePaths: null
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

  shagnchuangImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePaths
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  saveRecommendTap: function (e) {
    console.log(this.data.tempFilePaths)
    let that = this;
    let value = e.detail.value;
    wx.showToast({
      icon: "loading",
      title: "正在提交"
    })
    wx.uploadFile({
      url: config.api_base_url + '/upload/checkImg',
      method: 'post',
      filePath: that.data.tempFilePaths[0],
      name: 'file',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('loginToken')
      },
      success: function (res) {
        console.log(1111111)
        console.log(res)
        let companyImage = JSON.parse(res.data).date.url;
        if (res.statusCode != 200) {
          wx.showToast({
            icon: "loading",
            duration: 1000,
            title: "上传失败"
          })
        } else {
          const obj = {
            companyName: value.companyName,
            companyCode: value.companyCode,
            companyAddress: value.companyAddress,
            companyContact: value.companyContact,
            contactPhone: value.contactPhone,
            companyFaren: value.companyFaren,
            companyFarenId: value.companyFarenId,
            companyImage: companyImage,
            mark: value.mark
          }
          adverModel.companyAdd(obj).then(res => {
            console.log(res)
            if(res.code === 200) {
              wx.navigateTo({
                url: '../my/my',
              })
            }
            wx.hideToast(); //隐藏Toast
          })
        }
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          icon: "loading",
          duration: 1000,
          title: "上传失败"
        })
      },
      complete: function () {
        // wx.hideToast(); //隐藏Toast
      }
    })
  },

  // 地图中选地址
  chooseLocationTap: function () {
    var that = this;

    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        if (res.address) {
          var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
          var REGION_PROVINCE = [];
          var addressBean = {
            REGION_PROVINCE: null,
            REGION_COUNTRY: null,
            REGION_CITY: null,
            ADDRESS: null
          };
          function regexAddressBean(address, addressBean) {
            regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
            var addxress = regex.exec(address);
            addressBean.REGION_CITY = addxress[1];
            addressBean.REGION_COUNTRY = addxress[2];
            // addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
            addressBean.ADDRESS = addxress[3] + res.name;
          }
          if (!(REGION_PROVINCE = regex.exec(res.address))) {
            regex = /^(.*?(省|自治区))(.*?)$/;
            REGION_PROVINCE = regex.exec(res.address);
            // console.log(REGION_PROVINCE);
            if (REGION_PROVINCE != null) {
              addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
              regexAddressBean(REGION_PROVINCE[3], addressBean);
            } else {
              wx.showToast({
                title: '请选择完整地址信息选项',
                icon: 'none'
              })
            }
          } else {
            addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
            regexAddressBean(res.address, addressBean);
          }
          if (REGION_PROVINCE != null) {
            that.setData({
              companyAddress: addressBean.REGION_PROVINCE + addressBean.REGION_CITY + addressBean.REGION_COUNTRY + addressBean.ADDRESS,
            });
          }
        } else {
          wx.showToast({
            title: '请选择完整地址信息选项',
            icon: 'none'
          })
        }
      },
      fail: function (e) {
        // console.log(e)
      },
      cancel: function (e) {
        // console.log(e)
      }
    });
  },

  getLocation: function () {
    let _this = this;
    wx.getSetting({
      success(res) {
        // 判断定位的授权
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              _this.chooseLocationTap();
            },
            fail(errMsg) {
              console.log(errMsg)
              _this.showSettingToast("请授权")
            }
          })
        } else {
          _this.chooseLocationTap();
        }
      }
    })
  },

  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
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