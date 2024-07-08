import axios from 'axios';
import auth_request from "../utils/auth";
import profile_request from '../utils/profile';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

export const register = async (email: string, password: string, re_password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password, re_password });

    return axios.post(auth_request.fetchRegister, body, config);
}


export const activate = async (uid: string, token: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token });

    return axios.post(auth_request.fetchActivate, body, config);
}


export const login = async (email: string, password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    return axios.post(auth_request.fetchLogin, body, config);
}


export const changePassword = async (new_password: string, current_password: string) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({new_password, current_password });

    return axios.post(auth_request.fetchChangePassword, body, config);
}


export const resetPassword = async (email: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });

    return axios.post(auth_request.fetchResetPassword, body, config);
}


export const resetPasswordConfirm = async (uid: string, token: string, new_password: string, re_new_password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    return axios.post(auth_request.fetchResetPasswordConfirm, body, config);
}


export const checkAuthenticated = () => {
    return new Promise(async (resolve, reject) => {
        let token;
        try {
            token = localStorage.getItem('token');
        } catch (error) {
            token = null;
        }
        
        if (token != null) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ token: token });
            await axios.post(auth_request.fetchVerify, body, config)
                .then((res) => {
                    if (res.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(error => {
                    console.error("Error while verifying token:", error);
                    resolve(false);
                });
        } else {
            resolve(false);
        }
    });
}


export const getProfile = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    return axios.get(profile_request.fetchProfile, config)
};


export function updateProfile(data: any) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    return axios.put(profile_request.fetchUpdateProfile, data, config)
}
