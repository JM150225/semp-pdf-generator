// main.js

document.addEventListener('DOMContentLoaded', () => {
    const digitInputs = Array.from(document.querySelectorAll('.digit-input'));
    const verificarClaveBtn = document.getElementById('verificarClaveBtn');
    const downloadPremiumPDFBtn = document.getElementById('downloadPremiumPDFBtn');
    const generateFreePDFBtn = document.getElementById('generateFreePDFBtn');
    const initiateMercadoPagoBtn = document.getElementById('initiateMercadoPagoBtn');
    const notificationsContainer = document.getElementById('notificationsContainer');

    let isPremiumUnlocked = false; // Simula el estado de desbloqueo
    let generatedCode = ''; // Almacena el código generado de la URL si existe

    // --- Funciones de Utilidad para Notificaciones ---
    function showNotification(type, title, message, icon) {
        // Eliminar notificaciones existentes para simplificar
        // Puedes ajustar esto para permitir múltiples notificaciones si lo prefieres
        notificationsContainer.innerHTML = ''; 

        const notificationDiv = document.createElement('div');
        let bgColor, textColor, iconColor;

        switch (type) {
            case 'success':
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                iconColor = 'text-green-500';
                break;
            case 'error':
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                iconColor = 'text-red-500';
                break;
            case 'info':
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-800';
                iconColor = 'text-blue-500';
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                iconColor = 'text-gray-500';
        }

        notificationDiv.className = `p-4 rounded-lg shadow-md mb-4 flex items-center animate-slide-in ${bgColor}`;
        notificationDiv.innerHTML = `
            <div class="text-2xl mr-3 ${iconColor}"><i class="${icon}"></i></div>
            <div>
                <h4 class="font-bold ${textColor}">${title}</h4>
                <p class="text-sm ${textColor}">${message}</p>
            </div>
        `;
        notificationsContainer.appendChild(notificationDiv);

        // Ocultar la notificación después de unos segundos
        setTimeout(() => {
            notificationDiv.remove();
        }, 5000); // 5 segundos
    }

    // --- Lógica del componente Home ---

    // Equivalente a useEffect para manejar parámetros de URL
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    if (codeFromUrl) {
        generatedCode = codeFromUrl; // Almacenar el código
        showNotification('info', '¡Pago Detectado!', `Gracias por tu pago. Tu código de desbloqueo es: ${generatedCode}`, 'fas fa-info-circle');
        // Limpiar URL para evitar que la notificación aparezca en futuras cargas
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Manejo de entrada de dígitos
    digitInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const target = e.target;
            let value = target.value;

            // Asegurarse de que solo se ingrese un dígito numérico
            value = value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
            if (value.length > 1) {
                value = value.charAt(0);
            }
            target.value = value;

            if (target.value && index < digitInputs.length - 1) {
                digitInputs[index + 1].focus(); // Mover al siguiente input automáticamente
            }
            // Si es el último input y tiene valor, enfocar el botón de verificar
            if (index === digitInputs.length - 1 && target.value) {
                verificarClaveBtn.focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                digitInputs[index - 1].focus(); // Mover al input anterior al borrar
            }
        });
    });

    // Función de verificación de clave
    verificarClaveBtn.addEventListener('click', () => {
        const enteredCode = digitInputs.map(input => input.value).join('');
        
        // Asumiendo que generateDailyPassword y validateCode están disponibles globalmente (desde enigmaUtils.js)
        const dailyCode = generateDailyPassword(); 
        const adminCode = '1984'; // Código de administrador fijo

        // Limpiar inputs
        digitInputs.forEach(input => input.value = '');
        digitInputs[0].focus(); // Volver a enfocar el primer input

        if (enteredCode === dailyCode || enteredCode === adminCode) {
            isPremiumUnlocked = true;
            downloadPremiumPDFBtn.classList.remove('hidden');
            downloadPremiumPDFBtn.classList.add('block', 'animate-pulse-scale'); // Mostrar y animar
            showNotification('success', '¡Felicidades!', 'Tu contraseña es correcta. Ahora puedes descargar tu PDF Premium sin marca de agua.', 'fas fa-check-circle');
        } else {
            isPremiumUnlocked = false;
            downloadPremiumPDFBtn.classList.add('hidden'); // Ocultar si la clave es incorrecta
            downloadPremiumPDFBtn.classList.remove('block', 'animate-pulse-scale');
            showNotification('error', 'Error - Contraseña Incorrecta', 'La contraseña ingresada es incorrecta. Por favor, verifica e inténtalo de nuevo.', 'fas fa-times-circle');
        }
    });

    // Manejo de botones de descarga
    generateFreePDFBtn.addEventListener('click', () => {
        // Asumiendo que generateFreePDF está disponible globalmente (desde pdfGenerator.js)
        generateFreePDF();
    });

    downloadPremiumPDFBtn.addEventListener('click', () => {
        if (!isPremiumUnlocked) {
            alert('¡Acceso denegado! Necesitas ingresar el código de desbloqueo primero.');
            return;
        }
        // Asumiendo que generatePremiumPDF está disponible globalmente (desde pdfGenerator.js)
        generatePremiumPDF();
    });

    initiateMercadoPagoBtn.addEventListener('click', () => {
        // Redirige a Mercado Pago (URL de ejemplo)
        window.open('https://mpago.la/2yCDH8K', '_blank');
    });
});