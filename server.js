const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
    
    // Guardar la ubicación en un archivo
    const locationData = { latitude, longitude, timestamp: new Date().toISOString() };
    fs.appendFile('locations.json', JSON.stringify(locationData) + '\n', (err) => {
        if (err) {
            console.error('Error al guardar la ubicación:', err);
            res.status(500).json({ status: 'error', message: 'Error al guardar la ubicación' });
        } else {
            res.json({ status: 'success', message: 'Ubicación guardada' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
