//index.js
//获取应用实例
const app = getApp()
const COMMON_SALARY = 5000;//国家最低征收额度5000
Page({
  data: {
    params: {
      preTax: '',
      gjj: ''
    },
    totalSocialInsurance: 0,
    afterTax: 0,
    totalGjj: 0,
    payTax: 0,
    yanglao: 0,
    yiliao: 0,
    shiye: 0
  },
  onLoad: function (options) {
    this.setData({
      params: {
          preTax: options.total,
          gjj: options.gjj,
          social: options.social||options.total
      }
    });
    wx.setNavigationBarTitle({title: '计算结果'});
    this.calTotalSocialInsurance();
    this.calTotalGjj();
    this.calAfterTax();
    console.log(this.data.params.social)
  },

  calTax (){
    let pretax = parseInt(this.data.params.preTax, 10);
    if(pretax<5000){
      this.setData({
        payTax: 0
      })
      return 0;
    }
    let calnum = pretax - this.calTotalSocialInsurance()-COMMON_SALARY
    let paytax = 0;
    if(calnum<3000){
      paytax = parseInt(calnum*0.03, 10);
    }else if(calnum>=3000 && calnum<12000){
      paytax = parseInt(calnum*0.1, 10)-210;
    }else if(calnum>=12000 && calnum<25000){
      paytax = parseInt(calnum*0.2, 10)-1410;
    }else if(calnum>=25000 && calnum<35000){
      paytax = parseInt(calnum*0.25, 10)-2660;
    }else if(calnum>=35000 && calnum<55000){
      paytax = parseInt(calnum*0.3, 10)-4410;
    }else if(calnum>=55000 && calnum<80000){
      paytax = parseInt(calnum*0.35, 10)-7160;
    }else{
      paytax = parseInt(calnum*0.45, 10)-15160;
    }
    this.setData({
      payTax: paytax
    })
    return paytax;
  },

  calTotalSocialInsurance (){
    this.setData({
      totalSocialInsurance: this.calYanglao()+this.calMedical()+this.calShiye()
    })
    return this.calYanglao()+this.calMedical()+this.calShiye();
  },

  calTotalGjj (){
    this.setData({
      totalGjj: this.calGjj()
    })
    return this.calGjj();
  },

  //养老
  calYanglao (){
    this.setData({
      yanglao: parseInt(parseInt(this.data.params.social)*0.08, 10)
    });
    return this.data.yanglao;
  },
  //医疗
  calMedical (){
    this.setData({
      yiliao: parseInt(parseInt(this.data.params.social)*0.02, 10)
    });
    return this.data.yiliao;
  },
  //失业保险
  calShiye (){
    this.setData({
      shiye: parseInt(parseInt(this.data.params.social)*0.02, 10)
    });
    return this.data.shiye;
  },
  calGjj (){
    return parseInt(parseInt(this.data.params.preTax)*parseFloat(this.data.params.gjj)/100, 10)
  },
  calAfterTax (){
    let res =  parseInt(this.data.params.preTax, 10)-this.calTotalSocialInsurance()-this.calGjj()-this.calTax();
    this.setData({
      afterTax: res
    })
  },
  backCal (){
    app.redirect(`/pages/index/index`)
  }
})
