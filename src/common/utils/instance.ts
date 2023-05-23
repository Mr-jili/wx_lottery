class Bill {

  private bill: Bill

  public isBill?: boolean // true 是缴费 false 是预付费

  private constructor() {
    // 禁止外部使用 new 创建对象
  }
  static instance () {
    if (!Bill.prototype.bill) {
      Bill.prototype.bill = new Bill()
    }
    return Bill.prototype.bill
  }

}

export default Bill
