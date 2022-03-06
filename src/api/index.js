/*
 * all of the request funcs
 */
import authajax from './ajax'

//export const reqReadCategories=()=>ajax('/api/categories')

//export const reqCreateCategory=(data)=>ajax('/api/categories',data,'POST')

export const reqLogin=(email,password)=>authajax('/api/user/login',{email,password},'POST')

export const reqRegister=(user)=>authajax('/api/user/register',user,'POST')

export const reqCategories=()=>authajax('/api/categories')

export const reqAddCategory=(name)=>authajax('/api/categories',{name},'POST')

export const reqUpdateCategory=(name,categoryID)=>authajax(`/api/categories/${categoryID}`,{name},'PUT')

export const reqUpdateSecCategory=(name,categoryID,secCategoryID)=>authajax(`/api/category/${categoryID}/sec_categories/${secCategoryID}`,{name},'PUT')

export const reqUpdateThirdCategory=(name,secCategoryID,thirdCategoryID)=>authajax(`/api/sec_categories/${secCategoryID}/third_categories/${thirdCategoryID}`,{name},'PUT')

export const reqSecCategories=(categoryID)=>authajax(`/api/categories/${categoryID}`)

export const reqThirdCategories=(categoryID,secCategoryID)=>authajax(`/api/category/${categoryID}/sec_categories/${secCategoryID}`)
