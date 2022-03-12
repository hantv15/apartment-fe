import { API } from '../config'
const axios = require('axios');
export const sigIn = (data) => {
    axios.post('http://localhost:8000/api/login', {
        email: data.email,
        password: data.password,
    })
        .then(function (response) {
            console.log(response.json());
        })
        .catch(function (error) {
            return error;
        });
}

export const sigUp = (user) => {
    return fetch(`${API}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
        next();
    }
}

export const sigOut = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
    }
}

export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    } else {
        return false
    }
}