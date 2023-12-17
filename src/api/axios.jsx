import axios from 'axios';

const BASE_URL = 'http://172.16.4.146:8080/api'

export const signIn = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true,
    })
    return response.data
}

export const verifyJwt = async (jwt) => {
    const response = await axios.post(`${BASE_URL}/auth/verify`, { jwt },
    {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true,
    })
    return response.data
}


// 172.16.4.146
// 10.14.33.78