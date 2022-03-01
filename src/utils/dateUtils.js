export function formateDate(time){
  if (!time) return ''
  let date=new Date(time)
  return (date.getMonth()+1)+'-'+date.getDate()+'-'+date.getFullYear()
}
