/*
 * all of the request funcs
 */
import ajax from './ajax'

//export const reqReadCategories=()=>ajax('/api/categories')

//export const reqCreateCategory=(data)=>ajax('/api/categories',data,'POST')

export const reqLogin=(email,password)=>ajax('/api/user/login',{email,password},'POST')

export const reqRegister=(user)=>ajax('/api/user/register',user,'POST')
