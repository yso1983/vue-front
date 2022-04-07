export default class DnwDetail {
  constructor(id, accountId, itemId, userId, amount, dt, remark, toAccountId, std_account_amount, latest_account_amount) {
    this.id = id;
    this.account_id = accountId;
    this.dnw_item_id = itemId;
    this.user_id = userId;
    this.amount = amount;
    this.standard_dt = dt;
    this.remark = remark;
    this.to_account_id = toAccountId;
    this.std_account_amount = std_account_amount;
    this.latest_account_amount = latest_account_amount;
  }
}