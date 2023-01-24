"use strict"
import { displayAlert } from "./alerts";

export const updateUserData = async (userData) => {
    try {
        const response = await fetch("/api/v1/users/update-me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: userData
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.status === "success") {
            displayAlert("success", "Data updated successfully")
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};

export const updateUserPassword = async userData => {
    try {
        const response = await fetch("/api/v1/users/update-password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: userData
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.status === "success") {
            displayAlert("success", "Password updated successfully!")
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};



