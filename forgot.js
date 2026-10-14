// ============================================================
// MARGZEN - FORGOT PASSWORD SCRIPT
// (Country-code dropdown logic lives in auth.js)
// ============================================================

function handleMobileInput() {
    const input = document.getElementById('userMobile');
    input.value = input.value.replace(/\D/g, '').slice(0, 10);

    const isEmpty = input.value.length === 0;
    const isValid = input.value.length === 10;

    if (isEmpty || isValid) {
        clearFieldError();
    } else {
        showFieldError();
    }
}

function isMobileValid() {
    const input = document.getElementById('userMobile');
    return /^\d{10}$/.test(input.value);
}

function showFieldError() {
    document.getElementById('mobileError').classList.add('show');
    document.getElementById('mobileFieldBox').classList.add('error-state');
}

function clearFieldError() {
    document.getElementById('mobileError').classList.remove('show');
    document.getElementById('mobileFieldBox').classList.remove('error-state');
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

function handleForgotSubmit(e) {
    e.preventDefault();

    if (!isMobileValid()) {
        showFieldError();
        showToast('Please enter a valid 10-digit mobile number', '⚠️', true);
        return;
    }

    clearFieldError();

    const dialCode = document.getElementById('dialCode').value;
    const mobile = document.getElementById('userMobile').value;

    const btn = document.getElementById('btnSendOtp');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        showToast('OTP sent to your mobile number', '📩');

        setTimeout(() => {
            // Pass the mobile number along so the OTP page can show a masked hint
            window.location.href = `otp.html?mobile=${encodeURIComponent(dialCode + mobile)}`;
        }, 900);
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    if (form) form.addEventListener('submit', handleForgotSubmit);
});