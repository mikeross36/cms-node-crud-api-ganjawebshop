"use strict"

export function qs(selector, parent = document) {
    return parent.querySelector(selector)
}; 

export function headerGlobals() {
    const logoutBtn = qs("#nav-link-logout")
    return {logoutBtn}
}

export function registerFormGlobals() {
    const registerForm = qs(".register-form")
    return {registerForm}
};

export function loginFormGlobals() {
    const loginForm = qs(".login-form")
    const forgotForm = qs(".forgot-form")
    return {loginForm, forgotForm}
}

export function accountGlobals() {
    const userDataForm = qs(".form-user-data")
    const userPasswordForm = qs(".form-user-password")
    const savePassBtn = qs(".save-pass-btn")
    return {userDataForm, userPasswordForm, savePassBtn}
};

export function resetFormGlobals() {
    const resetPassForm = qs(".form-reset-password");
    return {resetPassForm}
}

export function reviewFormGlobals() {
    const reviewForm = qs(".form-user-review")
    return {reviewForm}
};

export function productGlobals() {
    const addToCartForm = qs(".add-to-cart")
    return {addToCartForm}
};