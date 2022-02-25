const TOKEN_KEY="init_token";
const USER_KEY="init_user";

export const saveAccessToken=(token)=>{
  localStorage.setItem(TOKEN_KEY,token);
};

export const getAccessToken=()=>{
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAccessToken=()=>{
  localStorage.removeItem(TOKEN_KEY);
};

export const saveAccessUser=(user)=>{
  localStorage.setItem(USER_KEY,JSON.stringify(user));
};

export const getAccessUser=()=>{
  return JSON.parse(localStorage.getItem(USER_KEY)||'{}');
};

export const removeAccessUser=()=>{
  localStorage.removeItem(USER_KEY);
};

