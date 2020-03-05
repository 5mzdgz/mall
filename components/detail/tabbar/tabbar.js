// components/detail/tabbar/tabbar.js
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
    detailData: {
      type: Object,
      value: {}
    },
    isCollection: {
      type: Boolean,
      value: false
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
    addCollectionTap() {
      console.log(this.data.detailData)
      adverModel.addCollect(this.data.detailData.itemId).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.setData({
            isCollection: true
          })
        }
      })
    }
  }
})
