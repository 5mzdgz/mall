Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cellData: {
      type: Object,
      value: {}
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
    goClickUrl(e) {
      const pageurl = e.currentTarget.dataset.pageurl;
      if (pageurl) {
        wx.navigateTo({
          url: pageurl,
        })
      }
    }
  }
})