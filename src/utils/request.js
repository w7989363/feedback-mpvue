export const get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        resolve(res.data)
      },
      fail: function (res) {
        console.log('wx.request fail')
        console.log(res);
        reject(res)
      }
    })
  })
}

export const post = function(url, params = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "POST",
      data: params,
      success: function (res) {
        resolve(res.data)
      },
      fail: function (res) {
        console.log('wx.request fail')
        console.log(res);
        reject(res)
      }
    })
  })
  
}