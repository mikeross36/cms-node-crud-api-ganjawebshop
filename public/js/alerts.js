"use strict"
import { qs } from "./utils";

const alertPlaceholder = qs('#liveAlertPlaceholder')

export const hideAlert = () => {
    const element = qs(".alert")
    if(element) element.parentElement.removeChild(element)
}

export const displayAlert = (type, message) => {
    hideAlert()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <h3>${message}</h3>`,
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)

    const timer = setTimeout(() => {
        hideAlert()
    }, 3000)
    return () => {
        clearTimeout(timer)
    }
};