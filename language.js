// Standardsprache basierend auf Browser-Einstellungen
let currentLanguage = navigator.language.split('-')[0];
if (!['de', 'tr', 'en'].includes(currentLanguage)) {
    currentLanguage = 'de'; // Fallback auf Deutsch
}

// Funktion zum Ändern der Sprache
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    updateContent();
    localStorage.setItem('preferredLanguage', lang);
}

// Funktion zum Aktualisieren des Inhalts
function updateContent() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    // Gespeicherte Spracheinstellung laden
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    updateContent();
}); 