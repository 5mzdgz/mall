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

  adverDetail(itemId) {
    return this.request({
      url: '/ad/detail',
      method: 'POST',
      data: {
        itemId: itemId,
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

  adAdd(url, obj) {
    return this.request({
      url: url,
      method: 'POST',
      data: obj
    })
  }

  updateMine(obj) {
    return this.request({
      url: '/ad/updateMine',
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

  companyAdd(obj) {
    return this.request({
      url: '/company/add',
      method: 'POST',
      data: obj
    })
  }

  addCollect(itemId) {
    return this.request({
      url: '/ad/addCollect',
      method: 'POST',
      data: {
        itemId: itemId
      }
    })
  }

  collectList(obj) {
    console.log(obj)
    return this.request({
      url: '/ad/meCollect',
      method: 'POST',
      data: obj
    })
  }

  cancelCollect(itemId) {
    return this.request({
      url: '/ad/cancelCollect',
      method: 'POST',
      data: {
        itemId: itemId
      }
    })
  }

  collectSearch(itemId) {
    return this.request({
      url: '/ad/collectSearch',
      method: 'POST',
      data: {
        itemId: itemId
      }
    })
  }

  updateAd(obj) {
    return this.request({
      url: '/ad/updateAd',
      method: 'POST',
      data: obj
    })
  }

}


export {
  AdverModel
}