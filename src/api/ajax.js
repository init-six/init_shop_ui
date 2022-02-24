const prefix =`/api`
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject)=>{
    let promise
    if (type=='GET'){
      promise=axios.get(url,{
        params:data
      })
    }else if (type=='POST'){
      promise=axios.post(url,data)
    }

    promise.then(response=>{
      resolve(response)
    }).catch(error=>{
      if (error.response){
        message.error(error.response.status+" "+error.response.data)
      }else if (error.request){
        message.error("request:"+error.request)
      }else{
        message.error("request:"+error.message)
      }
    })
  })
}
