// components/common/grid/grid.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    gridArr: {
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
    selectedItemTap(e) {
      const index = e.currentTarget.dataset.index;
      console.log(index);
      if (index === 3) {
        this.getScancode()
      }
      
    },
    getScancode() {
      let _this = this;
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          const result = res.result;
          console.log(res)
        }
      })

    }
  }
})
