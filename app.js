//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  redirect: function (url, redirect, navigateTo) {
      if (redirect) {
          wx.redirectTo({url: url,success:function(e){
              console.log('redirect.success',e);
          },fail:function(err){
              console.log('redirect.fail',err);
          }})
          return;
      }

      if (navigateTo) {
          wx.navigateTo({url: url});
          return;
      }

      var pages = this.getPages();
      if (pages.length < 4) {
          wx.navigateTo({url: url});
      } else {
          wx.redirectTo({url: url})
      }
  },
  getPages: function () {
      var pa = [];
      var pages = getCurrentPages();
      if (pages) {
          for (var i in pages) {
              if (pages[i] && pages[i].__route__) {
                  pa.push('/' + pages[i].__route__)
              }
          }
      }
      return pa;
  },
})