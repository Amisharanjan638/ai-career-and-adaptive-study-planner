// ============================================================
// MARGZEN - SIGN UP SCRIPT
// ============================================================

let currentMethod = 'mobile'; // 'mobile' or 'email' — NEW

// ============================================================
// NEW: Switch between Mobile No & Email (inside the contact field)
// ============================================================
function switchAuthInput(method) {
    currentMethod = method;
    const tabMobile = document.getElementById('tabBtnMobile');
    const tabEmail = document.getElementById('tabBtnEmail');
    const mobileBlock = document.getElementById('mobileInputBlock');
    const emailBlock = document.getElementById('emailInputBlock');
    const mobileInput = document.getElementById('userMobile');
    const emailInput = document.getElementById('userEmail');

    if (method === 'mobile') {
        tabMobile.classList.add('active');
        tabEmail.classList.remove('active');
        mobileBlock.hidden = false;
        emailBlock.hidden = true;
        mobileInput.required = true;
        emailInput.required = false;
    } else {
        tabEmail.classList.add('active');
        tabMobile.classList.remove('active');
        emailBlock.hidden = false;
        mobileBlock.hidden = true;
        emailInput.required = true;
        mobileInput.required = false;
        closeCountryDropdown(); // no country selector needed on the email tab
    }
}

// ============================================================
// NEW: Country Code Data + Dropdown
// ============================================================
const COUNTRY_CODES = [
    { name: "India", flag: "🇮🇳", code: "+91" },
    { name: "United States", flag: "🇺🇸", code: "+1" },
    { name: "Canada", flag: "🇨🇦", code: "+1" },
    { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
    { name: "Australia", flag: "🇦🇺", code: "+61" },
    { name: "United Arab Emirates", flag: "🇦🇪", code: "+971" },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "+966" },
    { name: "Qatar", flag: "🇶🇦", code: "+974" },
    { name: "Kuwait", flag: "🇰🇼", code: "+965" },
    { name: "Oman", flag: "🇴🇲", code: "+968" },
    { name: "Bahrain", flag: "🇧🇭", code: "+973" },
    { name: "Singapore", flag: "🇸🇬", code: "+65" },
    { name: "Germany", flag: "🇩🇪", code: "+49" },
    { name: "France", flag: "🇫🇷", code: "+33" },
    { name: "Italy", flag: "🇮🇹", code: "+39" },
    { name: "Spain", flag: "🇪🇸", code: "+34" },
    { name: "Netherlands", flag: "🇳🇱", code: "+31" },
    { name: "Switzerland", flag: "🇨🇭", code: "+41" },
    { name: "Sweden", flag: "🇸🇪", code: "+46" },
    { name: "Ireland", flag: "🇮🇪", code: "+353" },
    { name: "China", flag: "🇨🇳", code: "+86" },
    { name: "Japan", flag: "🇯🇵", code: "+81" },
    { name: "South Korea", flag: "🇰🇷", code: "+82" },
    { name: "Hong Kong", flag: "🇭🇰", code: "+852" },
    { name: "Nepal", flag: "🇳🇵", code: "+977" },
    { name: "Bangladesh", flag: "🇧🇩", code: "+880" },
    { name: "Sri Lanka", flag: "🇱🇰", code: "+94" },
    { name: "Pakistan", flag: "🇵🇰", code: "+92" },
    { name: "Nigeria", flag: "🇳🇬", code: "+234" },
    { name: "Kenya", flag: "🇰🇪", code: "+254" },
    { name: "South Africa", flag: "🇿🇦", code: "+27" },
    { name: "Egypt", flag: "🇪🇬", code: "+20" },
    { name: "Brazil", flag: "🇧🇷", code: "+55" },
    { name: "Mexico", flag: "🇲🇽", code: "+52" },
    { name: "Russia", flag: "🇷🇺", code: "+7" },
    { name: "Indonesia", flag: "🇮🇩", code: "+62" },
    { name: "Malaysia", flag: "🇲🇾", code: "+60" },
    { name: "Thailand", flag: "🇹🇭", code: "+66" },
    { name: "Vietnam", flag: "🇻🇳", code: "+84" },
    { name: "Philippines", flag: "🇵🇭", code: "+63" },
    { name: "New Zealand", flag: "🇳🇿", code: "+64" }
];

function renderCountryList(list) {
    const ul = document.getElementById('countryList');
    if (!ul) return;
    ul.innerHTML = '';

    if (list.length === 0) {
        ul.innerHTML = '<li class="no-results">No matching country</li>';
        return;
    }

    list.forEach(country => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.innerHTML = `
            <span class="flag">${country.flag}</span>
            <span class="country-name">${country.name}</span>
            <span class="country-dial">${country.code}</span>
        `;
        li.addEventListener('click', () => selectCountry(country));
        ul.appendChild(li);
    });
}

function filterCountryList() {
    const searchInput = document.getElementById('countrySearchInput');
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();

    const filtered = COUNTRY_CODES.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.code.replace('+', '').includes(query.replace('+', ''))
    );

    renderCountryList(filtered);
}

function selectCountry(country) {
    document.getElementById('selectedFlag').textContent = country.flag;
    document.getElementById('selectedCode').textContent = country.code;
    document.getElementById('dialCode').value = country.code;
    closeCountryDropdown();
}

function toggleCountryDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('countryDropdown');
    const trigger = document.getElementById('countryCodeTrigger');
    if (!dropdown || !trigger) return;

    const isOpen = dropdown.classList.contains('show');
    if (isOpen) {
        closeCountryDropdown();
        return;
    }

    renderCountryList(COUNTRY_CODES);
    dropdown.classList.add('show');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');

    const searchInput = document.getElementById('countrySearchInput');
    if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 50);
    }
}

function closeCountryDropdown() {
    const dropdown = document.getElementById('countryDropdown');
    const trigger = document.getElementById('countryCodeTrigger');
    if (!dropdown || !trigger) return;

    dropdown.classList.remove('show');
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
}

// The trigger has role="button" + tabindex="0", so Enter / Space must work.
document.addEventListener('keydown', (event) => {
    const trigger = document.getElementById('countryCodeTrigger');
    if (!trigger) return;

    if (event.key === 'Escape') {
        closeCountryDropdown();
        return;
    }

    if (document.activeElement === trigger && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        toggleCountryDropdown(event);
    }
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('countryDropdown');
    const trigger = document.getElementById('countryCodeTrigger');
    if (!dropdown || !trigger) return;
    if (!dropdown.contains(event.target) && !trigger.contains(event.target)) {
        closeCountryDropdown();
    }
});

// ============================================================
// 1. Toggle Password Visibility (Eye Icon)
// ============================================================
function togglePasswordView() {
    const pwd = document.getElementById('userPassword');
    const eye = document.getElementById('pwdEyeSvg');
    if (!pwd || !eye) return;

    if (pwd.type === 'password') {
        pwd.type = 'text';
        // Eye Slash
        eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        pwd.type = 'password';
        // Normal Eye
        eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

// 2. Toast Notification
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
// 3. Form Submission Handler
// CHANGED: no longer reads a single "userContact" field — now reads
// either the mobile number (with dial code) or the email, based on
// whichever tab is active.
// ============================================================
function handleSignupSubmit(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const pwd = document.getElementById('userPassword').value;

    let userContact = '';

    if (currentMethod === 'mobile') {
        const dialCode = document.getElementById('dialCode').value;
        const mobile = document.getElementById('userMobile').value.trim();
        if (!mobile) {
            showToast('Please enter your mobile number.', '⚠️', true);
            return;
        }
        userContact = dialCode + mobile;
    } else {
        const email = document.getElementById('userEmail').value.trim();
        if (!email) {
            showToast('Please enter your email address.', '⚠️', true);
            return;
        }
        userContact = email;
    }

    if (!firstName || !lastName || !userContact || !pwd) {
        showToast('Please fill all required fields.', '⚠️', true);
        return;
    }

    if (pwd.length < 6) {
        showToast('Password must be at least 6 characters.', '⚠️', true);
        return;
    }

    const btn = document.getElementById('btnProceed');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btnSpan.textContent = 'Creating Account...';
    btn.disabled = true;

    setTimeout(() => {
        btnSpan.textContent = originalText;
        btn.disabled = false;

        // stream.html reads this to greet the user in the navbar
        localStorage.setItem('margzen_user_name', firstName);

        showToast(`Welcome ${firstName}! Account created successfully 🚀`, '🎉');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    }, 900);
}

// ============================================================
// NEW: Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    renderCountryList(COUNTRY_CODES);
});