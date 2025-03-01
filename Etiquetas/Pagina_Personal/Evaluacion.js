const selectElement = document.getElementById('S_Seccion');


        // Agregar un evento de cambio al select
        selectElement.addEventListener('change', function() {
            // Cambiar el color de fondo del contenedor según la opción seleccionada
            const selectedValue = selectElement.value;
            if (selectedValue) {
                // Redirigir a la página seleccionada
                window.location.href = selectedValue;
            }
        });