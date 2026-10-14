// ============================================================
// MARGZEN - OTP VERIFY SCRIPT
// ============================================================

function maskMobile(fullNumber) {
    // fullNumber looks like "+919142612345" -> show last 2 digits only
    if (!fullNumber) return 'your registered mobile number';
    const digitsOnly = fullNumber.replace(/[^\d]/g, '');
    if (digitsOnly.length < 4) return fullNumber;
    const visible = digitsOnly.slice(-2);
    const dialMatch = fullNumber.match(/^\+\d{1,4}/);
    const dialCode = dialMatch ? dialMatch[0] : '';
    const dialDigits = dialCode.replace('+', '').length;
    // Math.max guards against a negative count -- String.repeat(-n) throws
    // a RangeError, which used to abort the rest of page setup.
    const hiddenCount = Math.max(0, digitsOnly.length - dialDigits - 2);
    return `${dialCode} ${'•'.repeat(hiddenCount)}${visible}`;
}

function handleOtpInput() {
    const input = document.getElementById('userOtp');
    input.value = input.value.replace(/\D/g, '').slice(0, 6);
    clearOtpError();
}

function isOtpValid(value) {
    // Demo-only check: a complete 6-digit numeric code counts as valid
    // since there is no backend wired up yet.
    return /^\d{6}$/.test(value);
}

function showOtpError() {
    document.getElementById('otpError').classList.add('show');
    document.getElementById('otpFieldBox').classList.add('error-state');
}

function clearOtpError() {
    document.getElementById('otpError').classList.remove('show');
    document.getElementById('otpFieldBox').classList.remove('error-state');
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

function handleOtpSubmit(e) {
    e.preventDefault();
    const otpInput = document.getElementById('userOtp');

    // Re-sanitize here too: SMS autofill / paste can drop text into the
    // field (e.g. "123456 is your MargZen code") without firing the
    // oninput handler that normally strips it down to digits.
    const value = otpInput.value.replace(/\D/g, '').slice(0, 6);
    otpInput.value = value;

    if (!isOtpValid(value)) {
        showOtpError();
        showToast('Invalid OTP. Please try again.', '⚠️', true);
        return;
    }

    clearOtpError();

    const btn = document.getElementById('btnVerifyOtp');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Verifying...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        showToast('OTP verified!', '✅');

        const params = new URLSearchParams(window.location.search);
        const mobile = params.get('mobile') || '';

        setTimeout(() => {
            window.location.href = `reset.html?mobile=${encodeURIComponent(mobile)}`;
        }, 800);
    }, 700);
}

function resendOtp() {
    const btn = document.getElementById('resendBtn');
    btn.disabled = true;
    showToast('OTP resent to your mobile number', '📩');

    let seconds = 30;
    const originalLabel = 'Resend OTP';
    btn.textContent = `Resend in ${seconds}s`;

    const interval = setInterval(() => {
        seconds -= 1;
        if (seconds <= 0) {
            clearInterval(interval);
            btn.disabled = false;
            btn.textContent = originalLabel;
        } else {
            btn.textContent = `Resend in ${seconds}s`;
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Wire the form up FIRST so a display problem can never leave the
    // Verify button dead.
    const form = document.getElementById('otpForm');
    if (form) form.addEventListener('submit', handleOtpSubmit);

    try {
        const params = new URLSearchParams(window.location.search);
        const mobile = params.get('mobile');
        const maskedEl = document.getElementById('maskedMobile');
        if (mobile && maskedEl) {
            maskedEl.textContent = maskMobile(mobile);
        }
    } catch (err) {
        console.warn('Could not mask the mobile number:', err);
    }
});