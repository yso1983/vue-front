export default class AutomaticDnw {
  constructor(id, accountId, itemId, userId, amount, day) {
    this.id = id;
    this.account_id = accountId;
    this.dnw_item_id = itemId;
    this.user_id = userId;
    this.amount = amount;
    this.day = day;
  }
}