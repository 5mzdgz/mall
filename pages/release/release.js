// pages/release/release.js
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
    navTitle: '发布',
    src: '',
    width: 375,//宽度
    height: 175,//高度  
    isUqloadImg: false,
    date: '',
    latitude: '',
    longitude: '',
    labelId: '',
    modelAreaArr: [],
    typeEntityList:[],
    areaEntityList: [],
    modelTypeArr: [],
    labelArr: [],
    status: '0',
    imagePathArr: [],
    statusArray: ['请选择状态', '空闲', '在租'],
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
    ],
    releaseData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.releaseData))
    let releaseData = null;
    if (options.releaseData) {
      releaseData = JSON.parse(options.releaseData);
      this.setData({
        releaseData: releaseData
      })
    }
    this.getNavArr(releaseData);
  },

  saveRecommendTap: function(e) {
    let typeId, areaId;
    const modelType = e.detail.value.modelType;
    const modelArea = e.detail.value.modelArea;
    console.log(modelType);
    this.data.typeEntityList.forEach(item => {
      if (modelType === item.typeName) {
        typeId = item.typeId
      }
    })

    this.data.areaEntityList.forEach(item => {
      if (modelArea === item.areaName) {
        areaId = item.areaId
      }
    })
    
    let value = e.detail.value;
    if (this.data.status === '0') {
      wx.showToast({
        title: '请选择租赁状态',
        icon: 'none'
      })
      return false;
    }
    const obj = {
      itemName: value.itemName,
      adSecond: value.adSecond,
      descr: value.descr,
      adHigh: value.adHigh,
      adWide: value.adWide,
      imageUrl: '',
      typeId: typeId,
      areaId: areaId,
      labelId: this.data.labelId,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      adAddress: value.adAddress,
      price: value.lowPrice + '-' + value.highPrice,
      status: this.data.status,
      contactName: value.contactName,
      contactPhone: value.contactPhone,
      endTimeStr: value.endTimeStr
    }
    console.log(obj)
    let data = {
      url: config.api_base_url + '/upload/file',//这里是你图片上传的接
      path: this.data.imagePathArr,//这里是选取的图片的地址数组
    }
    let uploadImages;
    this.uploadimg(data, uploadImages, obj, this);
  },

  showModel: function() {
    this.cropper.getImg(res => {
      console.log(res)
    })
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
    this.setData({
      isUqloadImg: true
    })
    this.cropper = this.selectComponent("#image-cropper");
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
    let imagePathArr = this.data.imagePathArr;
    console.log(e.detail);
    this.cropper.getImg(res => {
      console.log(res.url)
      if (res.url) {
        imagePathArr.push(res.url)
        this.setData({
          imagePathArr: imagePathArr
        })
      }
    })
    console.log(this.data.imagePathArr)
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },

  cancelImgItem: function(e) {
    let imagePathArr = this.data.imagePathArr
    const index = e.currentTarget.dataset.index;
    imagePathArr.splice(index, 1);
    this.setData({
      imagePathArr: imagePathArr
    })
    console.log(index, imagePathArr)
  },

  selectedLabelTap: function(e) {
    const labelArr = this.data.labelArr;
    let arr = []
    
    const index = e.currentTarget.dataset.index;
    if (labelArr[index].checked) {
      labelArr[index].checked = false;
    } else {
      labelArr[index].checked = true;
    }
    labelArr.forEach(item => {
      if (item.checked) {
        arr.push(item)
      }
    })
    if (arr.length === 4) {
      labelArr.forEach(item => {
        if (arr[0] === item) {
          item.checked = false
        }
      })
    }
    let str = '', labelId;
    arr.forEach(item => {
      str += item.labelId + ','
    })
    if (arr.length === 4) {
      labelId = str.substring(0, str.length - 1);
      labelId = labelId.substr(2);
    } else {
      labelId = str.substring(0, str.length - 1);
    }
    console.log(labelId);
    this.setData({
      labelArr: labelArr,
      labelId: labelId
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
              region: [addressBean.REGION_PROVINCE, addressBean.REGION_CITY, addressBean.REGION_COUNTRY],
              adAddress: addressBean.REGION_PROVINCE + addressBean.REGION_CITY + addressBean.REGION_COUNTRY + addressBean.ADDRESS,
              latitude: res.latitude,
              longitude: res.longitude
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

  getNavArr: function (releaseData) {
    adverModel.navArr().then(res => {
      console.log(res)
      const modelAreaArr = this.data.modelAreaArr;
      const modelTypeArr = this.data.modelTypeArr;
      let labelArr = this.data.labelArr;
      res.data.typeEntityList.forEach(item => {
        modelTypeArr.push(item.typeName)
      })
      res.data.areaEntityList.forEach(item => {
        modelAreaArr.push(item.areaName)
      })
      res.data.labelEntityList.forEach(item => {
        item.checked = false
        labelArr.push(item)
      })
      
      this.setData({
        typeEntityList: res.data.typeEntityList,
        areaEntityList: res.data.areaEntityList,
        modelAreaArr: modelAreaArr,
        modelTypeArr: modelTypeArr,
        labelArr: labelArr
      })
      console.log(releaseData.adLabelEntityList)
      if (releaseData) {
        labelArr.forEach(items => {
          releaseData.adLabelEntityList.forEach(item => {
            if (item.labelName === items.labelName) {
              items.checked = true
            }
          })
        })

        this.setData({
          labelArr: labelArr
        })

        for (let i = 0; i < modelTypeArr.length; i++) {
          if (releaseData.adTypeEntity.typeName === modelTypeArr[i]) {
            this.setData({
              modelType: i
            })
          }
        }

        for (let i = 0; i < modelTypeArr.length; i++) {
          if (releaseData.adAreaEntityList.areaName === modelAreaArr[i]) {
            this.setData({
              modelArea: i
            })
          }
        }

        let str = '', labelId;
        releaseData.adLabelEntityList.forEach(item => {
          str += item.labelId + ','
        })
        labelId = str.substring(0, str.length - 1);
        
        this.setData({
          adAddress: releaseData.adAddress,
          itemName: releaseData.itemName,
          adSecond: releaseData.adSecond ? releaseData.adSecond : null,
          descr: releaseData.descr,
          adHigh: releaseData.adHigh,
          adWide: releaseData.adWide,
          imagePathArr: releaseData.imageUrlList,
          // typeId:
          // areaId:
          // imageUrl:
          labelId: labelId,
          latitude: releaseData.latitude,
          longitude: releaseData.longitude,
          lowPrice: releaseData.adPriceEntity.lowPrice,
          highPrice: releaseData.adPriceEntity.highPrice,
          status: releaseData.status,
          contactName: releaseData.adLeaseEntity.contactName,
          contactPhone: releaseData.adLeaseEntity.contactPhone,
          endTimeStr: releaseData.endTime
        })
      }
    })
  },

  modelPickerChange:function(e) {
    console.log(e.detail.value)
    this.setData({
      modelType: e.detail.value
    })
  },
  areaPickerChange: function(e) {
    this.setData({
      modelArea: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  statusPickerChange: function(e) {
    console.log(e)
    this.setData({
      status: e.detail.value
    })
  },

  // 图片
  uploadimg: function (data, uploadImages, obj) {
    var loginToken = wx.getStorageSync('loginToken');
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
      console.log(data.path[i])
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: null,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('loginToken')
      },
      success: (res) => {
        const resData = JSON.parse(res.data)
        console.log(res)
        if (i == 0 || i === 0) {
          that.data.imagePathArr.forEach(item => {
            if (item.indexOf('https') >= 0) {
              uploadImages += resData.date + "," + item
              console.log(1111)
            } else {
              uploadImages = resData.date
            }
          })
        } else {
          that.data.imagePathArr.forEach(item => {
            if (item.indexOf('https') >= 0) {
              uploadImages += uploadImages + "," + resData.date + "," + item
            } else {
              uploadImages = uploadImages + "," + resData.date;
            }
          })
        }
        console.log(1111)
        console.log(uploadImages)
        if (uploadImages) {
          obj.imageUrl = uploadImages
        }
        success++;
        // console.log(i);
        //这里可能有BUG，失败也会执行这里
      },
      fail: (res) => {
        fail++;
        // console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        // console.log(i);
        i++;
        if (i == data.path.length) {   //当图片传完时，停止调用
          if (!obj.imageUrl) {
            that.data.imagePathArr.forEach(item => {
              obj.imageUrl += item + ','
            })
          }
          that.saveRelease(obj)
          // console.log(uploadImages);
          // console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          // console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data, uploadImages, obj);
        }
      }
    });
  },

  saveRelease: function(obj) {
    console.log(obj)
    for (let key in obj) {
      if (key != 'adSecond' && key != 'endTimeStr') {
        if(!obj[key]) {
          wx.showToast({
            title: '请完成必填项',
            icon: 'none'
          })
          return;
        }
      }
    }
    let url = '/ad/adAdd'
    if (this.data.releaseData) {
      url = '/ad/updateMine'
      obj.itemId = this.data.releaseData.itemId
    }

    adverModel.adAdd(url, obj).then(res => {
      console.log(res)
      wx.navigateTo({
        url: '../record/record',
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})