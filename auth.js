// ============================================================
// MARGZEN - SHARED AUTH HELPERS (Country Code Dropdown)
// Used by: login.js, forgot.js
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

// Populate the dropdown list, optionally with a filtered subset
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

// Filter the list as the user types in the search box
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

// Apply the chosen country to the trigger + hidden field, then close
function selectCountry(country) {
    const flagEl = document.getElementById('selectedFlag');
    const codeEl = document.getElementById('selectedCode');
    const dialCodeEl = document.getElementById('dialCode');

    if (flagEl) flagEl.textContent = country.flag;
    if (codeEl) codeEl.textContent = country.code;
    if (dialCodeEl) dialCodeEl.value = country.code;

    closeCountryDropdown();
}

// Open / close the dropdown when the flag+code+arrow trigger is clicked
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

// Close the dropdown on any outside click
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('countryDropdown');
    const trigger = document.getElementById('countryCodeTrigger');
    if (!dropdown || !trigger) return;
    if (!dropdown.contains(event.target) && !trigger.contains(event.target)) {
        closeCountryDropdown();
    }
});

// The trigger has role="button" and tabindex="0", so it must also respond
// to Enter / Space the way a real <button> would.
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

// Populate on load wherever a #countryList element exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('countryList')) {
        renderCountryList(COUNTRY_CODES);
    }
});