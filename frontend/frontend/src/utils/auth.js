const base = '/account/auth/';

const auth_request = {
    fetchRegister: base + "users/",
    fetchUser: base + 'users/me/',
    fetchActivate: base + 'users/activation/',
    fetchChangePassword: base + 'users/set_password/',
    fetchResetPassword: base + 'users/reset_password/',
    fetchResetPasswordConfirm: base + 'users/reset_password_confirm/',

    fetchLogin: base + 'api/token/',
    fetchRefresh: base + 'jwt/refresh/',
    fetchVerify: base + 'jwt/verify/',
}

export default auth_request;

