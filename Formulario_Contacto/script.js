document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${apellido};${nombre}\nFN:${nombre} ${apellido}\nTEL;TYPE=CELL:${telefono}\nEMAIL:${correo}\nEND:VCARD`;

    generateQRCode(vcard);
    openModal();
});

function generateQRCode(text) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Limpiar cualquier código QR anterior
    new QRCode(qrCodeContainer, {
        text: text,
        width: 256, // Ajustado para hacer el código QR más grande
        height: 256, // Ajustado para hacer el código QR más grande
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function openModal() {
    document.getElementById('qrModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

document.getElementsByClassName('close')[0].onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    if (event.target == document.getElementById('qrModal')) {
        closeModal();
    }
}