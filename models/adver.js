import {
  HTTP
}
  from '../utils/http.js'

class AdverModel extends HTTP {

  adverBanner() {
    return this.request({
      url: '/ad/ban',
      method: 'POST',
      data: {
        page: 1,
        pageSize: 2
      }
    })
  }

  adverList() {
    return this.request({
      url: '/ad/adList',
      method: 'POST',
      data: {
        page: 1,
        pageSize: 2,
        status: 1
      }
    })
  }

  adverDetail() {
    return this.request({
      url: '/ad/detail',
      method: 'POST',
      data: {
        itemId: 1,
        userId: 2
      }
    })
  }

  navArr() {
    return this.request({
      url: '/search/item',
      method: 'GET'
    })
  }

  searchType(obj) {
    return this.request({
      url: '/search/param',
      method: 'POST',
      data: obj
    })
  }

  adAdd(obj) {
    return this.request({
      url: '/ad/adAdd',
      method: 'POST',
      data: obj
    })
  }

  adStatusList(obj) {
    return this.request({
      url: '/ad/adStatusList',
      method: 'POST',
      data: obj
    })
  }

}


export {
  AdverModel
}