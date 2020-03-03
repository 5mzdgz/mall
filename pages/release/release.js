// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    navTitle: '发布',
    src: '',
    width: 375,//宽度
    height: 175,//高度  
    isUqloadImg: true,
    date: '2020-03-09',
    array: ['基础信息', '发布', '大雨', '基础信息'],
    labelArr: [
      {
        labelName: '高速路',
        checked: false
      },
      {
        labelName: '高速路',
        checked: false
      }, 
      {
        labelName: '高速路',
        checked: false
      },
    ],
    cellArr: [
      {
        leftIcon: '',
        rightIcon: '',
        leftName: '基础信息',
        leftNameBlod: 'blod',
        leftSub: '',
        rightSub: '',
        pageUrl: ''
      },
      {
        leftIcon: '',
        rightIcon: '',
        leftName: '租凭信息',
        leftNameBlod: 'blod',
        leftSub: '',
        rightSub: '',
        pageUrl: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
  },

  showModel: function() {
    this.setData({
      isUqloadImg: false
    })
  },
  hideModel: function () {
    this.setData({
      isUqloadImg: false
    })
  },

  shagnchuangImg: function() {
    this.cropper = this.selectComponent("#image-cropper");
    this.setData({
      isUqloadImg: true
    })
    this.cropper.upload()
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },

  selectedLabelTap: function(e) {
    const labelArr = this.data.labelArr;
    const index = e.currentTarget.dataset.index;
    if (labelArr[index].checked) {
      labelArr[index].checked = false;
    } else {
      labelArr[index].checked = true;
    }
    this.setData({
      labelArr: labelArr
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
              // ADDRESS_1_STR:
              //   addressBean.REGION_PROVINCE + " "
              //   + addressBean.REGION_CITY + ""
              //   + addressBean.REGION_COUNTRY
              region: [addressBean.REGION_PROVINCE, addressBean.REGION_CITY, addressBean.REGION_COUNTRY],
              address: addressBean.ADDRESS,
            });
            // that.setData(addressBean); 
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