import {instance, LoginType, MeType} from "./api";

export const authAPI = {
    getAuth() {
        return instance.get<MeType>("/auth/me")
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>("/auth/login", {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>("/auth/login")
            .then(response => response.data)
    }
};