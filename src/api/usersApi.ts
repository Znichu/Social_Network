import {GetUsersType, instance} from "./api";

export const usersAPI = {
    getUsers(currentPage: number = 1, totalPageCount: number, term: string, friend: null | boolean) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${totalPageCount}${term.length === 0 ? '' : `&term=${term}`}${friend === null ? '' : `&friend=${friend}`}`)
            .then(response => response.data)
    }
};