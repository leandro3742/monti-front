export const createDate = () => {
  let month = new Date().getMonth() + 1
  month < 10 ? month = '0' + month : month = month
  let day = new Date().getFullYear() + '-' + month + '-' + new Date().getDate()
  let minutes;
  new Date().getMinutes() < 10 ? minutes = '0' + new Date().getMinutes() : minutes = new Date().getMinutes()
  let hour = new Date().getHours() + ':' + minutes
  return {day, hour}
}