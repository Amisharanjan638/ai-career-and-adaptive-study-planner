// contact.js — MargZen Contact Us page
// Small UX touch: clicking the phone or email card also copies the value
// to the clipboard, in addition to opening the tel:/mailto: link.

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.contact-card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const valueEl = card.querySelector('.contact-value');
            if (!valueEl) return;

            const value = valueEl.textContent.trim();

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(value).then(() => {
                    showCopiedHint(card, valueEl);
                }).catch(() => {
                    // Clipboard write failed silently; tel:/mailto: link still works.
                });
            }
        });
    });

    function showCopiedHint(card, valueEl) {
        const actionEl = card.querySelector('.contact-action');
        if (!actionEl) return;

        const originalText = actionEl.textContent;
        actionEl.textContent = 'Copied!';

        setTimeout(() => {
            actionEl.textContent = originalText;
        }, 1500);
    }
});