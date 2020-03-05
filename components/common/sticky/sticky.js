// components/common/sticky/sticky.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    navArr: {
      type: Array,
      value: []
    },
    navbarInitTop: {
      type: String,
      value: '0'
    },
    isFixedTop: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    seleted: 0,
    isDown: false
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectedNav(e) {
      // console.log(e);
      const item = e.currentTarget.dataset.item;
      this.setData({
        seleted: item.checkStatus
      })
      let myEventDetail = {
        navItem: item.checkStatus
      }
      let myEventOption = {}
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
