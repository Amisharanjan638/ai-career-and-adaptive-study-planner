// ============================================================
// MARGZEN - RESET PASSWORD SCRIPT
// ============================================================

// Same rule set as login/signup: min 6 chars, at least 1 uppercase,
// only letters, numbers, underscore (_) or @ allowed.
function isPasswordValid(pwd) {
    if (pwd.length < 6) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/^[A-Za-z0-9_@]+$/.test(pwd)) return false;
    return true;
}

function showFieldError(errorId, boxId) {
    document.getElementById(errorId).classList.add('show');
    document.getElementById(boxId).classList.add('error-state');
}

function clearFieldError(errorId, boxId) {
    document.getElementById(errorId).classList.remove('show');
    document.getElementById(boxId).classList.remove('error-state');
}

function handleNewPasswordInput() {
    const val = document.getElementById('newPassword').value;

    if (val.length === 0) {
        clearFieldError('newPasswordError', 'newPwdFieldBox');
    } else if (isPasswordValid(val)) {
        clearFieldError('newPasswordError', 'newPwdFieldBox');
    } else {
        showFieldError('newPasswordError', 'newPwdFieldBox');
    }

    // Re-check match whenever the new password changes
    checkPasswordsMatch();
}

function handleConfirmPasswordInput() {
    checkPasswordsMatch();
}

function checkPasswordsMatch() {
    const newVal = document.getElementById('newPassword').value;
    const confirmVal = document.getElementById('confirmPassword').value;

    if (confirmVal.length === 0) {
        clearFieldError('confirmPasswordError', 'confirmPwdFieldBox');
        return;
    }

    if (newVal === confirmVal) {
        clearFieldError('confirmPasswordError', 'confirmPwdFieldBox');
    } else {
        showFieldError('confirmPasswordError', 'confirmPwdFieldBox');
    }
}

function toggleEye(inputId, svgId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(svgId);
    if (!input || !eye) return;

    if (input.type === 'password') {
        input.type = 'text';
        eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        input.type = 'password';
        eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

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

function handleResetSubmit(e) {
    e.preventDefault();

    const newVal = document.getElementById('newPassword').value;
    const confirmVal = document.getElementById('confirmPassword').value;

    const isStrong = isPasswordValid(newVal);
    const doMatch = newVal === confirmVal && confirmVal.length > 0;

    if (!isStrong) {
        showFieldError('newPasswordError', 'newPwdFieldBox');
    }
    if (!doMatch) {
        showFieldError('confirmPasswordError', 'confirmPwdFieldBox');
    }

    if (!isStrong || !doMatch) {
        showToast(!doMatch ? 'Passwords do not match' : 'Not a strong password', '⚠️', true);
        return;
    }

    const btn = document.getElementById('btnResetProceed');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Saving...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        showToast('Password reset successful! Redirecting to login...', '🎉');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    if (form) form.addEventListener('submit', handleResetSubmit);
});