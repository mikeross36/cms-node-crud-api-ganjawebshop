"use strict";
function $8961bee26f1e9538$export$836aee6bce45247(selector, parent = document) {
    return parent.querySelector(selector);
}
function $8961bee26f1e9538$export$df15643b10419775() {
    const logoutBtn = $8961bee26f1e9538$export$836aee6bce45247("#nav-link-logout");
    return {
        logoutBtn: logoutBtn
    };
}
function $8961bee26f1e9538$export$f1b805ecdbe6565f() {
    const registerForm = $8961bee26f1e9538$export$836aee6bce45247(".register-form");
    return {
        registerForm: registerForm
    };
}
function $8961bee26f1e9538$export$eadf1476937b6cd6() {
    const loginForm = $8961bee26f1e9538$export$836aee6bce45247(".login-form");
    const forgotForm = $8961bee26f1e9538$export$836aee6bce45247(".forgot-form");
    return {
        loginForm: loginForm,
        forgotForm: forgotForm
    };
}
function $8961bee26f1e9538$export$2ba628911d24e92f() {
    const userDataForm = $8961bee26f1e9538$export$836aee6bce45247(".form-user-data");
    const userPasswordForm = $8961bee26f1e9538$export$836aee6bce45247(".form-user-password");
    const savePassBtn = $8961bee26f1e9538$export$836aee6bce45247(".save-pass-btn");
    return {
        userDataForm: userDataForm,
        userPasswordForm: userPasswordForm,
        savePassBtn: savePassBtn
    };
}
function $8961bee26f1e9538$export$c28e67b98e828599() {
    const resetPassForm = $8961bee26f1e9538$export$836aee6bce45247(".form-reset-password");
    return {
        resetPassForm: resetPassForm
    };
}
function $8961bee26f1e9538$export$78fa19ff5f750a4b() {
    const reviewForm = $8961bee26f1e9538$export$836aee6bce45247(".form-user-review");
    return {
        reviewForm: reviewForm
    };
}
function $8961bee26f1e9538$export$713257fe28b973f1() {
    const addToCartBtn = $8961bee26f1e9538$export$836aee6bce45247("#add-to-cart-btn");
    return {
        addToCartBtn: addToCartBtn
    };
}
function $8961bee26f1e9538$export$a6d1753478c403b6() {
    const getCartBtn = $8961bee26f1e9538$export$836aee6bce45247("#get-cart-btn");
    const clearCartBtn = $8961bee26f1e9538$export$836aee6bce45247("#clear-cart-btn");
    const removeItemBtn = $8961bee26f1e9538$export$836aee6bce45247(".remove-item-btn");
    return {
        getCartBtn: getCartBtn,
        clearCartBtn: clearCartBtn,
        removeItemBtn: removeItemBtn
    };
}



"use strict";
const $301bd54cd798ac64$var$alertPlaceholder = (0, $8961bee26f1e9538$export$836aee6bce45247)("#liveAlertPlaceholder");
const $301bd54cd798ac64$export$516836c6a9dfc573 = ()=>{
    const element = (0, $8961bee26f1e9538$export$836aee6bce45247)(".alert");
    if (element) element.parentElement.removeChild(element);
};
const $301bd54cd798ac64$export$5e5cfdaa6ca4292c = (type, message)=>{
    $301bd54cd798ac64$export$516836c6a9dfc573();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <h3>${message}</h3>`,
        "</div>"
    ].join("");
    $301bd54cd798ac64$var$alertPlaceholder.append(wrapper);
    const timer = setTimeout(()=>{
        $301bd54cd798ac64$export$516836c6a9dfc573();
    }, 3000);
    return ()=>{
        clearTimeout(timer);
    };
};



"use strict";
const $d94b0862c8420463$export$6503ec6e8aabbaf = async (name, email, password, passwordConfirm)=>{
    try {
        const response = await fetch("/api/v1/users/register", {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "You register successfully!");
            const timer = setTimeout(()=>{
                location.assign("/");
            }, 1500);
            return ()=>{
                clearTimeout(timer);
            };
        }
        return data;
    } catch (error) {
        console.log(error.message);
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $d94b0862c8420463$export$596d806903d1f59e = async (email, password)=>{
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
        });
        const data = await response.json();
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "You loggend in successfully!");
            const timer = setTimeout(()=>{
                location.assign("/");
            }, 1500);
            return ()=>{
                clearTimeout(timer);
            };
        }
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $d94b0862c8420463$export$a0973bcfe11b05c9 = async ()=>{
    console.log("Page reloaded!!!");
    try {
        const response = await fetch("/api/v1/users/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.status === "success") return location.assign("/");
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};



"use strict";
const $dafa1a55c02917a7$export$ca89bc660948fd97 = async (userData)=>{
    try {
        const response = await fetch("/api/v1/users/update-me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: userData
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Data updated successfully");
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $dafa1a55c02917a7$export$e6af0f282bef35a9 = async (userData)=>{
    try {
        const response = await fetch("/api/v1/users/update-password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: userData
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Password updated successfully!");
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};



"use strict";
const $9ef482370ee216ef$export$66791fb2cfeec3e = async (email)=>{
    try {
        const response = await fetch("/api/v1/users/forgot-password", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        const data = await response.json();
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", `Reset token sent to ${email}`);
            const timer = setTimeout(()=>{
                location.assign("/");
            }, 1500);
            return ()=>{
                clearTimeout(timer);
            };
        }
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $9ef482370ee216ef$export$dc726c8e334dd814 = async (password, passwordConfirm, token)=>{
    try {
        const response = await fetch(`/api/v1/users/reset-password/${token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                passwordConfirm: passwordConfirm
            })
        });
        const data = await response.json();
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Password reset successful");
            const timer = setTimeout(()=>{
                location.assign("/");
            }, 1500);
            return ()=>{
                clearTimeout(timer);
            };
        }
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};



"use strict";
const $efe4b63ddc0e541c$export$757c0bd9156f0e39 = async (rating, content, id)=>{
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
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Review created successfully");
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};



"use strict";
const $b3b5de9e8a91a101$export$576b6dd9d68b37bc = async (productId, quantity)=>{
    try {
        const response = await fetch("http://localhost:3000/api/v1/cart/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        });
        const data = await response.json();
        if (data.status === "success") (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Product added to cart!");
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $b3b5de9e8a91a101$export$810121176e3e3671 = async ()=>{
    try {
        const response = await fetch("/api/v1/cart/clear-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Cart is empty");
            const timer = setTimeout(()=>{
                location.assign("/");
            }, 1500);
            return ()=>{
                clearTimeout(timer);
            };
        }
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};
const $b3b5de9e8a91a101$export$fe2d9b4e03920b4c = async (productId)=>{
    try {
        const response = await fetch("http://localhost:3000/api/v1/cart/remove-item", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                productId: productId
            })
        });
        const data = await response.json();
        if (data.status === "success") {
            (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("success", "Item removed from cart");
            location.reload(true);
        }
        return data;
    } catch (error) {
        (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", error.response.data.message);
    }
};


"use strict";
const { registerForm: $719dd7005ed08b4f$var$registerForm  } = (0, $8961bee26f1e9538$export$f1b805ecdbe6565f)();
const { loginForm: $719dd7005ed08b4f$var$loginForm , forgotForm: $719dd7005ed08b4f$var$forgotForm  } = (0, $8961bee26f1e9538$export$eadf1476937b6cd6)();
const { logoutBtn: $719dd7005ed08b4f$var$logoutBtn  } = (0, $8961bee26f1e9538$export$df15643b10419775)();
const { userDataForm: $719dd7005ed08b4f$var$userDataForm , userPasswordForm: $719dd7005ed08b4f$var$userPasswordForm , savePassBtn: $719dd7005ed08b4f$var$savePassBtn  } = (0, $8961bee26f1e9538$export$2ba628911d24e92f)();
const { reviewForm: $719dd7005ed08b4f$var$reviewForm  } = (0, $8961bee26f1e9538$export$78fa19ff5f750a4b)();
const { resetPassForm: $719dd7005ed08b4f$var$resetPassForm  } = (0, $8961bee26f1e9538$export$c28e67b98e828599)();
const { addToCartBtn: $719dd7005ed08b4f$var$addToCartBtn  } = (0, $8961bee26f1e9538$export$713257fe28b973f1)();
const { updateCartBtn: $719dd7005ed08b4f$var$updateCartBtn , clearCartBtn: $719dd7005ed08b4f$var$clearCartBtn , removeItemBtn: $719dd7005ed08b4f$var$removeItemBtn  } = (0, $8961bee26f1e9538$export$a6d1753478c403b6)();
if ($719dd7005ed08b4f$var$registerForm) $719dd7005ed08b4f$var$registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = (0, $8961bee26f1e9538$export$836aee6bce45247)("#name").value;
    const email = (0, $8961bee26f1e9538$export$836aee6bce45247)("#email").value;
    const password = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password").value;
    const passwordConfirm = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password-confirm").value;
    if (!name || !email || !password || !passwordConfirm) (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", "All fields are mandatory!");
    (0, $d94b0862c8420463$export$6503ec6e8aabbaf)(name, email, password, passwordConfirm);
});
if ($719dd7005ed08b4f$var$loginForm) $719dd7005ed08b4f$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = (0, $8961bee26f1e9538$export$836aee6bce45247)("#email").value;
    const password = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password").value;
    if (!email || !password) (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", "All fields are mandatory!");
    (0, $d94b0862c8420463$export$596d806903d1f59e)(email, password);
});
if ($719dd7005ed08b4f$var$logoutBtn) $719dd7005ed08b4f$var$logoutBtn.addEventListener("click", (0, $d94b0862c8420463$export$a0973bcfe11b05c9));
if ($719dd7005ed08b4f$var$forgotForm) $719dd7005ed08b4f$var$forgotForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = (0, $8961bee26f1e9538$export$836aee6bce45247)("#email").value;
    if (!email) (0, $301bd54cd798ac64$export$5e5cfdaa6ca4292c)("danger", "All fields are mandatory!");
    (0, $9ef482370ee216ef$export$66791fb2cfeec3e)(email);
});
if ($719dd7005ed08b4f$var$resetPassForm) $719dd7005ed08b4f$var$resetPassForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const password = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password").value;
    const passwordConfirm = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password-confirm").value;
    const token = (0, $8961bee26f1e9538$export$836aee6bce45247)("#token").value;
    (0, $9ef482370ee216ef$export$dc726c8e334dd814)(password, passwordConfirm, token);
});
if ($719dd7005ed08b4f$var$userDataForm) $719dd7005ed08b4f$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", (0, $8961bee26f1e9538$export$836aee6bce45247)("#name").value);
    form.append("email", (0, $8961bee26f1e9538$export$836aee6bce45247)("#email").value);
    form.append("photo", (0, $8961bee26f1e9538$export$836aee6bce45247)("#photo").files[0]);
    (0, $dafa1a55c02917a7$export$ca89bc660948fd97)(form);
});
if ($719dd7005ed08b4f$var$userPasswordForm) $719dd7005ed08b4f$var$userPasswordForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    $719dd7005ed08b4f$var$savePassBtn.textContent = "Updating...";
    const loginPassword = (0, $8961bee26f1e9538$export$836aee6bce45247)("#login-password").value;
    const password = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password").value;
    const passwordConfirm = (0, $8961bee26f1e9538$export$836aee6bce45247)("#password-confirm").vlaue;
    (0, $dafa1a55c02917a7$export$e6af0f282bef35a9)({
        loginPassword: loginPassword,
        password: password,
        passwordConfirm: passwordConfirm
    });
    $719dd7005ed08b4f$var$savePassBtn.textContent = "Save";
    (0, $8961bee26f1e9538$export$836aee6bce45247)("#login-password").value = "";
    (0, $8961bee26f1e9538$export$836aee6bce45247)("#password").value = "";
    (0, $8961bee26f1e9538$export$836aee6bce45247)("#password-confirm").value = "";
});
if ($719dd7005ed08b4f$var$reviewForm) $719dd7005ed08b4f$var$reviewForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const rating = (0, $8961bee26f1e9538$export$836aee6bce45247)("#rating").value;
    const content = (0, $8961bee26f1e9538$export$836aee6bce45247)("#content").value;
    const id = (0, $8961bee26f1e9538$export$836aee6bce45247)("#hidden-id").value;
    (0, $efe4b63ddc0e541c$export$757c0bd9156f0e39)(rating, content, id);
    (0, $8961bee26f1e9538$export$836aee6bce45247)("#rating").value = "";
    (0, $8961bee26f1e9538$export$836aee6bce45247)("#content").value = "";
});
if ($719dd7005ed08b4f$var$addToCartBtn) $719dd7005ed08b4f$var$addToCartBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const productId = $719dd7005ed08b4f$var$addToCartBtn.dataset.id;
    const quantity = (0, $8961bee26f1e9538$export$836aee6bce45247)("#quantity").value;
    (0, $b3b5de9e8a91a101$export$576b6dd9d68b37bc)(productId, quantity);
});
if ($719dd7005ed08b4f$var$clearCartBtn) $719dd7005ed08b4f$var$clearCartBtn.addEventListener("click", ()=>{
    if (!window.confirm("Do you want to clear cart?")) return false;
    (0, $b3b5de9e8a91a101$export$810121176e3e3671)();
});
if ($719dd7005ed08b4f$var$removeItemBtn) $719dd7005ed08b4f$var$removeItemBtn.addEventListener("click", ()=>{
    const productId = $719dd7005ed08b4f$var$removeItemBtn.dataset.id;
    (0, $b3b5de9e8a91a101$export$fe2d9b4e03920b4c)(productId);
});
 // if (updateCartBtn) {
 //     updateCartBtn.addEventListener("click", e => {
 //         e.preventDefault();
 //         const productId = removeItemBtn.dataset.id;
 //         const removeItemBtn = qs("#remove-item-btn")
 //         if (e.target === removeItemBtn) {
 //             removeFromCart(productId)
 //         }
 //     })
 // };


//# sourceMappingURL=main.js.map
