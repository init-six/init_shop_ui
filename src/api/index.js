/*
 * all of the request funcs
 */
import ajax from './ajax'

export const reqReadCategories=()=>ajax('/api/categories')

export const reqCreateCategory=(data)=>ajax('/api/categories',data,'POST')
