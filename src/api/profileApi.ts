import {ProfileType} from "../type/types";
import {instance, ResponseType, SavePhotoType} from "./api";

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>("profile/" + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>("profile/status/" + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>("/profile/status/", {status: status})
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>("/profile", profile)
            .then(res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoType>("/profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};