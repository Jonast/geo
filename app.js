document.getElementById('getLocation').addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir la acción predeterminada del enlace

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition, showError);
    } else {
        document.getElementById('location').textContent = "Geolocalización no es soportada por este navegador.";
    }
});

function sendPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const locationElement = document.getElementById('location');
    locationElement.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;

    // Enviar la ubicación al servidor
    fetch('https://gray-truthful-legume.glitch.me/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showError(error) {
    let errorMessage = "";

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "El usuario denegó la solicitud de geolocalización.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "La información de la ubicación no está disponible.";
            break;
        case error.TIMEOUT:
            errorMessage = "La solicitud para obtener la ubicación ha caducado.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Se ha producido un error desconocido.";
            break;
    }

    document.getElementById('location').textContent = errorMessage;
}
