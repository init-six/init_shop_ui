/*
 * 封装axios
 * 函数返回promise
 */

const prefix =`/api`
import axios from 'axios'

export default function ajax(url,data={},type='GET'){
  if (type=='GET'){
    return axios.get(url,{
      params:data
    })
  }else if (type=='POST'){
    return axios.post(url,data)
  }
}
