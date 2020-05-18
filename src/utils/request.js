//导入axios
import axios from 'axios'
axios.defaults.withCredentials=true;
//使用ui显示错误
import {Message} from 'element-ui'

//全局拦截
//两个参数 成功config 失败 err
axios.interceptors.request.use(config => {
    return config;
  }, err => {
//请求失败
    Message.error({message: '请求超时!'});
    // return Promise.resolve(err);
  })
 
 //相应 
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 500) {
      Message.error({message: data.data.msg});
      return;
    }
    // if (data.data.msg) {
    //   Message.success({message: data.data.msg});
    // }
    return data;
  }, err => {
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    } else if (err.response.status == 401) {
      Message.error({message: err.response.data.msg});
    } else {
      if (err.response.data.msg) {
        Message.error({message: err.response.data.msg});
      }else{
        Message.error({message: '未知错误!'});
      }
    }
    // return Promise.resolve(err);
  })

  let base =process.env.API_ROOT;
  export const postRequest = (url, params) => {
    return axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      //类型
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  
  }
  
  export const uploadFileRequest = (url, params) => {
    return axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
  }
  
  export const putRequest = (url, params) => {
    return axios({
      method: 'put',
      url: `${base}${url}`,
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  
  export const deleteRequest = (url) => {
    return axios({
      method: 'delete',
      url: `${base}${url}`
    });
  
  }
  
  export const getRequest = (url) => {
    return axios({
      method: 'get',
      url: `${base}${url}`
    });
  
  }