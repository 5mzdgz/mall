// components/common/product/product.js
import { AdverModel } from '../../../models/adver.js';
const adverModel = new AdverModel();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    productList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail: function(e) {
      wx.navigateTo({
        url: '../detail/detail?itemId=' + e.currentTarget.dataset.itemid,
      })
    },
    /***
    *下架
    */
    downUpdateAd(e) {
      let obj = {
        itemId: e.currentTarget.dataset.item.itemId,
        checkStatus: 5
      }
      adverModel.updateAd(obj).then(res => {
        console.log(res)
        if (res.code === 200) {
          const productList = this.data.productList.filter(item => {
            return item.itemId !=  obj.itemId
          })
          this.setData({
            productList: productList
          })
        }
      })
    },
    deleteUpdateAd(e) {
      console.log(e)
      let obj = {
        itemId: e.currentTarget.dataset.item.itemId,
        checkStatus: 6
      }
      adverModel.updateAd(obj).then(res => {
        console.log(res)
        if (res.code === 200) {
          const productList = this.data.productList.filter(item => {
            return item.itemId != obj.itemId
          })
          this.setData({
            productList: productList
          })
        }
      })
    },
    gengxinTap(e) {
      const releaseData = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '../release/release?releaseData=' + releaseData,
      })
    }
  }
})
