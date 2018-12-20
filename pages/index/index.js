//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    total: '',
    gjj: '7',
    social:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShareAppMessage: function (){
    return {}
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  totalInput (e){
    this.setData({
      total: e.detail.value
    });
  },
  gjjInput (e){
    console.log(e.detail.value)
    var val = e.detail.value;
    if(Math.ceil(e.detail.value)>60){
      val = 60;
    }
    if(Math.floor(e.detail.value)<0){
      val = 1;
    } 
    this.setData({
      gjj: val
    });
  },
  sliderchange (e){
    this.setData({
      gjj: e.detail.value
    });
  },
  socialInput (e){
    this.setData({
      social: e.detail.value
    });
  },
  beginCal (){
    if(this.data.total==''||this.data.total==0){
      wx.showToast({
        title: '请输入税前工资',
        icon: 'none'
      });
      return;
    }
    if(isNaN(this.data.total)){
      wx.showToast({
        title: '输入的税前工资格式不正确',
        icon: 'none'
      });
      return;
    }
    if(this.data.gjj==''||this.data.gjj==0){
      wx.showToast({
        title: '请输入公积金缴纳比例',
        icon: 'none'
      });
      return;
    }
    if(isNaN(this.data.total)){
      wx.showToast({
        title: '输入的公积金缴纳比例格式不正确',
        icon: 'none'
      });
      return;
    }
    wx.reportAnalytics('form_sub', {
      total: this.data.total,
      social: this.data.social,
      percent: this.data.gjj
    })
    app.redirect(`/pages/results/result?total=${this.data.total}&gjj=${this.data.gjj}&social=${this.data.social}`)
  }
})
