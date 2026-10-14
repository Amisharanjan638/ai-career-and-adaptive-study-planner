// ============================================================
// MARGZEN - INTERACTIVE SCRIPTS & POPUP MODAL
// ============================================================

let currentMethod = 'mobile'; // 'mobile' or 'email'

// 1. Navbar Scroll Shadow Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
});

// 2. Open / Close Auth Modal
function openAuthModal() {
    const overlay = document.getElementById('authModalOverlay');
    if (!overlay) return;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const overlay = document.getElementById('authModalOverlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on clicking backdrop
function handleOverlayClick(event) {
    if (event.target.id === 'authModalOverlay') {
        closeAuthModal();
    }
}

// Close on 'Escape' key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAuthModal();
    }
});

// 3. Switch between Mobile No & Email
function switchAuthInput(method) {
    currentMethod = method;
    const tabMobile = document.getElementById('tabBtnMobile');
    const tabEmail = document.getElementById('tabBtnEmail');
    const mobileBlock = document.getElementById('mobileInputBlock');
    const emailBlock = document.getElementById('emailInputBlock');
    const mobileInput = document.getElementById('userMobile');
    const emailInput = document.getElementById('userEmail');

    if (method === 'mobile') {
        if (tabMobile) tabMobile.classList.add('active');
        if (tabEmail) tabEmail.classList.remove('active');
        if (mobileBlock) mobileBlock.style.display = 'block';
        if (emailBlock) emailBlock.style.display = 'none';
        if (mobileInput) mobileInput.required = true;
        if (emailInput) emailInput.required = false;
    } else {
        if (tabEmail) tabEmail.classList.add('active');
        if (tabMobile) tabMobile.classList.remove('active');
        if (emailBlock) emailBlock.style.display = 'block';
        if (mobileBlock) mobileBlock.style.display = 'none';
        if (emailInput) emailInput.required = true;
        if (mobileInput) mobileInput.required = false;
    }
}

// 4. Toggle Password Visibility (Eye Icon)
function togglePasswordView() {
    const pwd = document.getElementById('userPassword');
    const eye = document.getElementById('pwdEyeSvg');
    if (!pwd || !eye) return;

    if (pwd.type === 'password') {
        pwd.type = 'text';
        eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        pwd.type = 'password';
        eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

// 5. Toast Notifications
function showToast(message, icon = '✨') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastMsg || !toastIcon) return;

    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toast.style.transform = 'translateX(0)';

    setTimeout(() => {
        toast.style.transform = 'translateX(160%)';
    }, 3500);
}

// 6. Form Submission Handler
function handleAuthSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('btnProceed');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Verifying...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        showToast('Login successful! Welcome to Career Planner 🎉', '🚀');
        e.target.reset();
        closeAuthModal();
    }, 900);
}