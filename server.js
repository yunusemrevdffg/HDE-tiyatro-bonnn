// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Der Port, auf dem dein Server laufen wird. Du kannst ihn ändern.

// Middleware
app.use(cors()); // Erlaubt Anfragen von deinem Frontend
app.use(bodyParser.json()); // Ermöglicht das Verarbeiten von JSON im Request Body

// Simuliert eine Datenbank: Eine Liste von gebuchten Daten (im Format YYYY-MM-DD)
// **WICHTIG:** Diese Liste geht verloren, wenn der Server stoppt. Für persistente Daten brauchst du eine echte Datenbank.
let bookedDates = [
    '2025-03-15',
    '2025-03-20',
    '2025-03-25',
    '2025-04-10',
    '2025-04-18'
];

// Endpoint zum Abrufen aller gebuchten Termine
app.get('/booked-dates', (req, res) => {
    console.log('GET /booked-dates Anfrage erhalten');
    // Sende die Liste der gebuchten Daten zurück
    res.status(200).json(bookedDates);
});

// Endpoint zum Hinzufügen einer neuen Buchung
app.post('/book-date', (req, res) => {
    console.log('POST /book-date Anfrage erhalten');
    const bookingDetails = req.body;
    const dateToBook = bookingDetails.date; // Wir erwarten das Datum im Format YYYY-MM-DD

    console.log('Buchungsdetails:', bookingDetails);

    // Einfache Validierung
    if (!dateToBook) {
        console.log('Fehler: Datum fehlt.');
        return res.status(400).json({ message: 'Datum fehlt in der Anfrage.' });
    }

    // Prüfen, ob das Datum bereits gebucht ist
    if (bookedDates.includes(dateToBook)) {
        console.log(`Datum ${dateToBook} ist bereits gebucht.`);
        return res.status(409).json({ message: 'Dieses Datum ist leider schon ausgebucht.' }); // 409 Conflict
    }

    // Datum zur Liste hinzufügen (In einer echten App: In die Datenbank schreiben)
    bookedDates.push(dateToBook);
    console.log(`Neuer Termin gebucht: ${dateToBook}`);
    console.log('Aktuelle gebuchte Termine:', bookedDates);

    // Hier (im Backend) würdest du die EmailJS-Logik aufrufen!
    // await emailjs.send(...)  <-- Das müsste hierher verschoben werden!
    // Dafür müsstest du EmailJS auch im Backend installieren und konfigurieren.
    // Für dieses einfache Beispiel senden wir die E-Mail noch vom Frontend.

    // Erfolgsantwort senden
    res.status(200).json({ message: 'Buchung erfolgreich', bookedDate: dateToBook });
});

// Server starten
app.listen(port, () => {
    console.log(`Node.js Server läuft auf http://localhost:${port}`);
    console.log(`Gebuchte Termine abrufen unter: http://localhost:${port}/booked-dates`);
    console.log(`Buchungen senden an: http://localhost:${port}/book-date (POST)`);
}); 