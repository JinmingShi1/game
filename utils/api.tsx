import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    // console.log('config', config);
    const tmpUserToken = await AsyncStorage.getItem('userToken');
    if (tmpUserToken) {
      config.headers.Authorization = `Bearer ${tmpUserToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

const _get = (url: string, params: any) => {
  return axios.get(url, params);
};

const _post = (url: string, params: any) => {
  return axios.post(url, params);
};

const PREFIX = 'http://10.0.2.2:9000';

export const logIn = (params: any) => {
  console.log(`${PREFIX}/login`, params)
  return _post(`${PREFIX}/login`, params);
};
export const registerUser = (params: any) => {
  return _post(`${PREFIX}/createUser`, params);
};

export const logout = (params: any) => {
};


export const getTeamsByPlayerId = (playerId: string) => {
  
  return _get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats`, {stats: 'yearByYear'});
};


export const queryPlayer = (keyWord: string) => {
  return _get(`https://www.puckdoku.com/api/players?query=${keyWord}`, {});
}

export const getHistory = () => {
  return _get(`${PREFIX}/getHistory`, {});
}

export const addHistory = (params: any) => {
  return _post(`${PREFIX}/addHistory`, params);
}