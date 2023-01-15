import Axios, { AxiosResponse } from 'axios'

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

axios.interceptors.request.use((request) => {
    return request
})

axios.interceptors.response.use(
    async (response: AxiosResponse) => response.data,
)

export default axios
