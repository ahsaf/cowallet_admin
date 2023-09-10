import store from '../store';

import axios from 'axios';
import { BASE_URL } from '../components/constants';
import decode from 'jwt-decode';

// import {  Tost_Massages } from '../components/general';
export const Post = (api_url, post, cb) => {
  axios.post(`${BASE_URL}${api_url}`,{...post,
    // user_id:store.getState().user.user.id?store.getState().user.user.id:"",
    // username:store.getState().user.user.username?store.getState().user.user.username:"",
    // company_id:get_company_id()
  }, {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + store.getState().user.user.token
    }
  }).then(res => {
    cb(true, res.data);
    console.log(api_url,res.data);
  }).catch(function (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
      cb(false, error.response);
      if ([401, 403].includes(error.response.status)) {
        // inavlid token  ==> logout
        // Tost('unauthorized access')
        // store.dispatch(LogOut())
        localStorage.removeItem('user').then((r) => {
          // reset({
          //   index: 0,
          //   routes: [{ name: 'Loginstack' }],
          // });
        }).catch((e) => {
          console.log(e);
        })
      }
    } else {
      cb(false, {});
    }
  })
}

export const GetAuthApi = (api_url, cb) => {
  axios.get(`${BASE_URL}${api_url}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + store.getState().user.user.token
    }
  }).then(res => {
    cb(true, res.data);
    console.log(api_url,res.data);
  }).catch(function (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
      cb(false, error.response);
      if ([401, 403].includes(error.response.status)) {
        // inavlid token  ==> logout
        // Tost('unauthorized access')
        // store.dispatch(LogOut())
        localStorage.removeItem('user').then((r) => {
          // reset({
          //   index: 0,
          //   routes: [{ name: 'Loginstack' }],
          // });
        }).catch((e) => {
          console.log(e);
        })
      }
    } else {
      cb(false, {});
    }
  })
}


export const Get_API = (api_url, post, cb) => {
  axios.get(`${BASE_URL}${api_url}`,{
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + store.getState().user.user.token
    }
  }).then(res => {
    cb(true, res.data);
  }).catch(function (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
      cb(false, error.response);
      if ([401, 403].includes(error.response.status)) {
        // inavlid token  ==> logout
        // Tost('unauthorized access')
        // store.dispatch(LogOut())
        localStorage.removeItem('user').then((r) => {
          // reset({
          //   index: 0,
          //   routes: [{ name: 'Loginstack' }],
          // });
        }).catch((e) => {
          console.log(e);
        })
      }
    } else {
      cb(false, {});
    }
  })
}

export const get_user = async (cb) => {
  try {
    const jsonValue = await localStorage.getItem('token');
			  let decoded_token = decode(jsonValue)

    cb(decoded_token != null ? {...decoded_token,token:jsonValue} : null);
  } catch (e) {
    cb(false)
  }
}












