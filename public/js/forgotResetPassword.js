"use strict"
import { displayAlert } from "./alerts";

export const forgotPassword = async email => {
    try {
        const response = await fetch("/api/v1/users/forgot-password", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        const data = await response.json();
        if (data.status === "success") {
            displayAlert("success", `Reset token sent to ${email}`)
            const timer = setTimeout(() => {
                location.assign("/")
            }, 1500)
            return () => {
                clearTimeout(timer)
            }
        }
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};

export const resetPassword = async (password, passwordConfirm, token) => {
    try {
        const response = await fetch(`/api/v1/users/reset-password/${token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                passwordConfirm: passwordConfirm,
            })
        })
        const data = await response.json()
        if (data.status === "success") {
            displayAlert("success", "Password reset successful")
            const timer = setTimeout(() => {
                location.assign("/")
            }, 1500)
            return () => {
                clearTimeout(timer)
            }
        }
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};