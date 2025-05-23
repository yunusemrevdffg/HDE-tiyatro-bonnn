function changeVideo(videoSrc) {
    const mainVideo = document.getElementById('mainVideo');
    const source = mainVideo.getElementsByTagName('source')[0];
    source.src = videoSrc;
    mainVideo.load();
    mainVideo.play();
}

// EmailJS initialisieren
(function() {
    emailjs.init("0pCQkqwyOki8sfFSl");
})();

// Beispiel für gebuchte Termine (in der Praxis würde dies von einem Server kommen)
const bookedDates = [
    '2025-03-15',
    '2025-03-20',
    '2025-03-25',
    '2025-04-10',
    '2025-04-18'
];

// Kalender initialisieren
document.addEventListener('DOMContentLoaded', function() {
    const calendar = flatpickr("#calendar", {
        locale: "de",
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: "true",
        disable: bookedDates, // Gebuchte Termine deaktivieren
        onChange: function(selectedDates, dateStr) {
            console.log('Ausgewähltes Datum:', dateStr);
        },
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            if (bookedDates.includes(dayElem.dateObj.toISOString().split('T')[0])) {
                dayElem.classList.add('booked');
            }
        }
    });

    // Formular-Handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const persons = document.getElementById('persons').value;
            const purpose = document.getElementById('purpose').value;
            const message = document.getElementById('message').value;
            const selectedDate = document.getElementById('calendar').value; // Datum im Format YYYY-MM-DD

            if (!selectedDate) {
                alert('Bitte wählen Sie ein Datum aus.');
                return;
            }

            // Überprüfen, ob das ausgewählte Datum gebucht ist
            if (bookedDates.includes(selectedDate)) {
                alert('Dieses Datum ist leider schon ausgebucht. Bitte wählen Sie ein anderes Datum.');
                return;
            }

            // Lade-Animation starten
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;

            try {
                // E-Mail an den Administrator senden
                await emailjs.send("service_2y37t6d", "template_yw8kpao", {
                    to_email: "yunusemreguevercin11@gmail.com",
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    date: selectedDate,
                    time: document.getElementById('time').value,
                    address: document.getElementById('address').value,
                    persons: persons,
                    purpose: purpose,
                    message: message
                });

                // Erfolgsmeldung anzeigen
                alert('Vielen Dank für Ihre Buchung! Sie erhalten in Kürze eine Bestätigung per E-Mail.');
                
                // Formular zurücksetzen
                bookingForm.reset();
                
            } catch (error) {
                console.error('Fehler beim Senden der E-Mail:', error);
                alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            } finally {
                // Lade-Animation beenden
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// E-Mail-Funktion
function sendBookingEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const persons = document.getElementById('persons').value;
    const purpose = document.getElementById('purpose').value;
    const message = document.getElementById('message').value;
    const selectedDate = document.getElementById('calendar').value;

    if (!selectedDate) {
        alert('Bitte wählen Sie ein Datum aus.');
        return false;
    }

    // E-Mail-Vorlage aktualisieren
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        date: selectedDate,
        time: document.getElementById('time').value,
        address: document.getElementById('address').value,
        persons: persons,
        purpose: purpose,
        message: message
    };

    // E-Mail-Vorlage Text
    const emailTemplate = `
Neue Buchungsanfrage:

Name: {{from_name}}
E-Mail: {{from_email}}
Telefon: {{phone}}
Datum: {{date}}
Uhrzeit: {{time}}
Adresse: {{address}}

Anzahl Personen: {{persons}}
Zweck: {{purpose}}
Nachricht: {{message}}

Diese Buchung wurde über das Online-Formular erstellt.
`;

    // E-Mail-Link erstellen
    const mailtoLink = `mailto:yunusemreguevercin11@gmail.com?subject=${encodeURIComponent('Neue Buchungsanfrage - HDE-Tiyatro')}&body=${encodeURIComponent(emailTemplate.replace(/{{(\w+)}}/g, function(_, key) {
        return templateParams[key] || '';
    }))}`;

    // E-Mail-Client öffnen
    window.location.href = mailtoLink;

    // Bestätigung anzeigen
    alert('Vielen Dank für Ihre Buchung! Bitte senden Sie die generierte E-Mail ab, um Ihre Buchung zu bestätigen.');
    
    return false;
} 