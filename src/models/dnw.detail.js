export default class DnwDetail {
  constructor(id, accountId, itemId, userId, amount, dt, remark) {
    this.id = id;
    this.account_id = accountId;
    this.dnw_item_id = itemId;
    this.user_id = userId;
    this.amount = amount;
    this.standard_dt = dt;
    this.remark = remark;
  }
}