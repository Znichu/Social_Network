import {CaptchaUrlType, instance} from "./api";

export const securityAPI = {
    captchaUrl() {
        return instance.get<CaptchaUrlType>("/security/get-captcha-url")
            .then(response => response.data)
    }
};