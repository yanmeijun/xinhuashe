/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * @param {String} type 返回类型,默认返回string
 */
export const getStore = (name, type) => {
  if (!name) return;
  var content = window.localStorage.getItem(name)
  if(type && (type.toLowerCase() == 'object' || type.toLowerCase() == 'array')){
    try{
      content = content && eval('(' + content + ')')
    }catch(ex){}
  }
  return content;
}

/**
 * 获取用户信息，返回一个对象
 */
export const getUserinfo = () => {
  return { 'Userinfo': window.localStorage.getItem('userInfo') }
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
