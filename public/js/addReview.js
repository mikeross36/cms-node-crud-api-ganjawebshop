"use strict"
import { displayAlert } from "./alerts";

export const addReview = async (rating, content, id) => {
    try {
        const response = await fetch(`/api/v1/ganjas/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                rating: rating,
                content: content
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.status === "success") {
            displayAlert("success", "Review created successfully")
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};