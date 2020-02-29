Component({
  options: {
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    swiperData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperBannerChange(e) {
      let swiperData = this.data.swiperData
      swiperData.current = e.detail.current,
      this.setData({
        swiperData: swiperData,
      })
    },
    swiperNewsChange(e) {

    }
  }
})