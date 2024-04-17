const base = '/account/auth/';

const auth_request = {
    fetchRegister: base + "users/",
    fetchUser: base + 'users/me/',
    fetchActivate: base + 'users/activation/',
    fetchChangePass: base + 'users/set_password/',
    fetchResetPass: base + 'users/reset_password/',
    fetchResetPassConfirm: base + 'users/reset_password_confirm/',

    fetchLogin: base + 'jwt/create/',
    fetchRefresh: base + 'jwt/refresh/',
    fetchVerify: base + 'jwt/verify/',
}

export default auth_request;
