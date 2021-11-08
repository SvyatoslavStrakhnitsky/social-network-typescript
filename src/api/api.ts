import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "64dd2168-8e99-4f16-bfba-3b57d35d8236",
    },
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(userId: number) {
        return instance
            .post(`follow/${userId}`, {})
            .then(response => {
                return response.data
            })
    },
    unfollowUser(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getProfile(userId: string) {
        console.warn('Obsolete method')
        return profileAPI.getProfile
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },

    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status}
        )
    },

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
