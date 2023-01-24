"use strict"
import { displayAlert } from "./alerts";

export const register = async (name, email, password, passwordConfirm) => {
    try {
        const response = await fetch("/api/v1/users/register", {
            method: "POST",
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.status === "success") {
            displayAlert("success", "You register successfully!")
            const timer = setTimeout(() => {
                location.assign("/")
            }, 1500)
            return () => {
                clearTimeout(timer)
            }
        }
        return data;
    }
    catch (error) {
        console.log(error.message)
        displayAlert("danger", error.response.data.message)
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch("/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json();
        
        if (data.status === "success") {
            displayAlert("success", "You loggend in successfully!")
            const timer = setTimeout(() => {
                location.assign("/")
            }, 1500)
            return () => {
                clearTimeout(timer)
            }
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};

export const logout = async () => {
    console.log("Page reloaded!!!")
    try {
        const response = await fetch("/api/v1/users/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        
        if (data.status === "success") {
            return location.assign("/")
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};

// export const register = (name, email, password, passwordConfirm) => {
//     const url = "/api/v1/users/register";
//     const data = {
//         name: name,
//         email: email,
//         password: password,
//         passwordConfirm: passwordConfirm,
//     };
//     const customHeaders = { "Content-Type": "application/json" }
    
//     fetch(url, {
//         method: "POST",
//         headers: customHeaders,
//         body: JSON.stringify(data),
//     })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error(error));
// };
