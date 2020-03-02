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

  searchType() {
    return this.request({
      url: '/search/param',
      method: 'POST',
      data: {
        page: 1,
        pageSize: 2
      }
    })
  }

}


export {
  AdverModel
}