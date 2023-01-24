export class DtoTransaction{
  constructor(hour, day, productName, value, type, business){
    this.product = productName
    this.hour = hour
    this.type = type
    this.value = value
    this.day = day
    this.business = business
  }
}