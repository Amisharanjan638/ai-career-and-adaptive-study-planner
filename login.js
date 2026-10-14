// ============================================================
// MARGZEN - LOGIN SCRIPT
// (Country-code dropdown logic lives in auth.js)
// ============================================================

let currentMethod = 'mobile'; // 'mobile' or 'email'

// ============================================================
// 1. Switch between Mobile No & Email Tabs
// ============================================================
function switchAuthInput(method) {
    currentMethod = method;
    const tabMobile = document.getElementById('tabBtnMobile');
    const tabEmail = document.getElementById('tabBtnEmail');
    const mobileBlock = document.getElementById('mobileInputBlock');
    const emailBlock = document.getElementById('emailInputBlock');

    clearFieldError('mobileError', 'mobileFieldBox');
    clearFieldError('emailError', 'emailFieldBox');
    hideFormError();

    if (method === 'mobile') {
        tabMobile.classList.add('active');
        tabEmail.classList.remove('active');
        mobileBlock.hidden = false;
        emailBlock.hidden = true;
    } else {
        tabEmail.classList.add('active');
        tabMobile.classList.remove('active');
        emailBlock.hidden = false;
        mobileBlock.hidden = true;
        closeCountryDropdown(); // no country selector on the email tab
    }
}

// ============================================================
// 2. Live Validation: Mobile Number (must be exactly 10 digits)
// ============================================================
function handleMobileInput() {
    const input = document.getElementById('userMobile');
    // Strip anything that isn't a digit, cap at 10
    input.value = input.value.replace(/\D/g, '').slice(0, 10);

    const isEmpty = input.value.length === 0;
    const isValid = input.value.length === 10;

    if (isEmpty || isValid) {
        clearFieldError('mobileError', 'mobileFieldBox');
    } else {
        showFieldError('mobileError', 'mobileFieldBox');
    }
    hideFormError();
    return isValid;
}

function isMobileValid() {
    const input = document.getElementById('userMobile');
    return /^\d{10}$/.test(input.value);
}

// ============================================================
// 3. Live Validation: Email
// ============================================================
function handleEmailInput() {
    const input = document.getElementById('userEmail');
    const isEmpty = input.value.trim().length === 0;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

    if (isEmpty || isValid) {
        clearFieldError('emailError', 'emailFieldBox');
    } else {
        showFieldError('emailError', 'emailFieldBox');
    }
    hideFormError();
    return isValid;
}

function isEmailValid() {
    const input = document.getElementById('userEmail');
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
}

// ============================================================
// 4. Live Validation: Password
//    Rules: at least 6 characters, at least 1 uppercase letter,
//    only letters, numbers, underscore (_) or @ are allowed.
// ============================================================
function isPasswordValid(pwd) {
    if (pwd.length < 6) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/^[A-Za-z0-9_@]+$/.test(pwd)) return false;
    return true;
}

function handlePasswordInput() {
    const input = document.getElementById('userPassword');
    const val = input.value;

    if (val.length === 0) {
        clearFieldError('passwordError', 'pwdFieldBox');
        hideFormError();
        return;
    }

    if (isPasswordValid(val)) {
        clearFieldError('passwordError', 'pwdFieldBox');
    } else {
        showFieldError('passwordError', 'pwdFieldBox');
    }
    hideFormError();
}

// ============================================================
// 5. Small helpers for showing / hiding field errors
// ============================================================
function showFieldError(errorId, boxId) {
    const errEl = document.getElementById(errorId);
    const boxEl = document.getElementById(boxId);
    if (errEl) errEl.classList.add('show');
    if (boxEl) boxEl.classList.add('error-state');
}

function clearFieldError(errorId, boxId) {
    const errEl = document.getElementById(errorId);
    const boxEl = document.getElementById(boxId);
    if (errEl) errEl.classList.remove('show');
    if (boxEl) boxEl.classList.remove('error-state');
}

function showFormError() {
    const formErrorEl = document.getElementById('formError');
    if (formErrorEl) formErrorEl.classList.add('show');
}

function hideFormError() {
    const formErrorEl = document.getElementById('formError');
    if (formErrorEl) formErrorEl.classList.remove('show');
}

// ============================================================
// 6. Toggle Password View (single Eye Icon)
// ============================================================
function togglePasswordView() {
    const pwd = document.getElementById('userPassword');
    const eye = document.getElementById('pwdEyeSvg');
    if (!pwd || !eye) return;

    if (pwd.type === 'password') {
        pwd.type = 'text';
        eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        pwd.type = 'password';
        eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

// ============================================================
// 7. Toast Notifications
// ============================================================
function showToast(message, icon = '✨', isError = false) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastMsg || !toastIcon) return;

    toast.classList.toggle('error', isError);
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toast.style.transform = 'translateX(0)';

    setTimeout(() => {
        toast.style.transform = 'translateX(160%)';
    }, 3500);
}

// ============================================================
// 8. Form Submission Handler
// ============================================================
function handleAuthSubmit(e) {
    e.preventDefault();

    const mobileInput = document.getElementById('userMobile');
    const emailInput = document.getElementById('userEmail');
    const pwdInput = document.getElementById('userPassword');

    const identifierValid = currentMethod === 'mobile' ? isMobileValid() : isEmailValid();
    const passwordValid = isPasswordValid(pwdInput.value);

    // Surface field-level errors for anything left empty or invalid
    if (currentMethod === 'mobile' && !identifierValid) {
        showFieldError('mobileError', 'mobileFieldBox');
    }
    if (currentMethod === 'email' && !identifierValid) {
        showFieldError('emailError', 'emailFieldBox');
    }
    if (!passwordValid) {
        showFieldError('passwordError', 'pwdFieldBox');
    }

    if (!identifierValid || !passwordValid) {
        // Reset both fields and show the general error message
        mobileInput.value = '';
        emailInput.value = '';
        pwdInput.value = '';
        clearFieldError('mobileError', 'mobileFieldBox');
        clearFieldError('emailError', 'emailFieldBox');
        clearFieldError('passwordError', 'pwdFieldBox');
        showFormError();
        showToast('Invalid mobile no. or password', '⚠️', true);
        return;
    }

    hideFormError();

    const btn = document.getElementById('btnProceed');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Verifying...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        showToast('Login successful! Redirecting to Career Planner...', '🎉');

        setTimeout(() => {
            window.location.href = 'stream.html';
        }, 1200);
    }, 900);
}

// ============================================================
// 9. Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('standaloneAuthForm');
    if (form) form.addEventListener('submit', handleAuthSubmit);
});