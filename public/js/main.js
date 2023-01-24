"use strict"
import { displayAlert } from "./alerts";
import { qs, registerFormGlobals, headerGlobals, loginFormGlobals, accountGlobals, reviewFormGlobals, resetFormGlobals, productGlobals } from "./utils";
import { register, logout, login,  } from "./registerLoginLogout";
import { updateUserData, updateUserPassword } from "./updateSettings";
import { forgotPassword, resetPassword } from "./forgotResetPassword";
import { addReview } from "./addReview";

const { registerForm } = registerFormGlobals();
const { loginForm, forgotForm } = loginFormGlobals();
const { logoutBtn } = headerGlobals();
const { userDataForm, userPasswordForm, savePassBtn } = accountGlobals();
const { reviewForm } = reviewFormGlobals();
const { resetPassForm } = resetFormGlobals();

if (registerForm) {
    registerForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = qs("#name").value;
        const email = qs("#email").value;
        const password = qs("#password").value;
        const passwordConfirm = qs("#password-confirm").value;

        if (!name || !email || !password || !passwordConfirm) displayAlert("danger", "All fields are mandatory!")

        register(name, email, password, passwordConfirm)
    })
};

if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault()
        const email = qs("#email").value;
        const password = qs("#password").value;
      
        if (!email || !password) displayAlert("danger", "All fields are mandatory!")

        login(email, password)
    })
};

if (logoutBtn) logoutBtn.addEventListener("click", logout)

if (forgotForm) {
    forgotForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = qs("#email").value;

        if (!email) displayAlert("danger", "All fields are mandatory!")

        forgotPassword(email)
    })
};

if (resetPassForm) {
    resetPassForm.addEventListener("submit", e => {
        e.preventDefault()
        const password = qs("#password").value;
        const passwordConfirm = qs("#password-confirm").value;
        const token = qs("#token").value;

        resetPassword(password, passwordConfirm, token)
    })
}

if (userDataForm) {
    userDataForm.addEventListener("submit", e => {
        e.preventDefault()
        const form = new FormData();
        form.append("name", qs("#name").value);
        form.append("email", qs("#email").value)
        form.append("photo", qs("#photo").files[0])

        updateUserData(form)
    })
};

if (userPasswordForm) {
    userPasswordForm.addEventListener("submit", e => {
        e.preventDefault()
        savePassBtn.textContent = "Updating...";
        const loginPassword = qs("#login-password").value;
        const password = qs("#password").value;
        const passwordConfirm = qs("#password-confirm").vlaue;

        updateUserPassword({ loginPassword, password, passwordConfirm })
        
        savePassBtn.textContent = "Save";
        qs("#login-password").value = "";
        qs("#password").value = "";
        qs("#password-confirm").value = "";
    })
}

if (reviewForm) {
    reviewForm.addEventListener("submit", e => {
        e.preventDefault()
        const rating = qs("#rating").value;
        const content = qs("#content").value;
        const id = qs("#hidden-id").value;
        
        addReview(rating, content, id)
        
        qs("#rating").value = "";
        qs("#content").value = "";
    })
};




