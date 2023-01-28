"use strict"
import { displayAlert } from "./alerts"

export const addToCart = async (productId, quantity) => {
    try {
        const response = await fetch("/api/v1/cart/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        })
        const data = await response.json()
        if (data.status === "success") {
            displayAlert("success", "Product added to cart!")
        }
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};

export const clearCart = async () => {
    try {
        const response = await fetch("/api/v1/cart/clear-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (data.status === "success") {
            displayAlert("success", "Cart is empty")
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

export const removeItem = async (productId) => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/cart/remove-item", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({productId: productId})
        })
        const data = await response.json()
        if (data.status === "success") {
            displayAlert("success", "Item removed from cart")
            location.reload(true)
        }
        return data;
    }
    catch (error) {
        displayAlert("danger", error.response.data.message)
    }
};
