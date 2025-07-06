// enigma.js

document.addEventListener('DOMContentLoaded', () => {
    const paymentSuccessSection = document.getElementById('paymentSuccessSection');
    const adminAccessSection = document.getElementById('adminAccessSection');
    const restrictedAccessSection = document.getElementById('restrictedAccessSection');
    const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
    const generatedCodeDisplayAdmin = document.getElementById('generatedCodeDisplayAdmin');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const copyCodeAdminBtn = document.getElementById('copyCodeAdminBtn');
    const adminInput = document.getElementById('adminInput');
    const volverAInicioBtn = document.getElementById('volverAInicioBtn');

    let generatedCode = ''; // Almacenar el código para la navegación

    // Helper para copiar al portapapeles
    const copiarCodigo = (codigo) => {
        navigator.clipboard.writeText(codigo).then(() => {
            alert('Código copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar el código:', err);
            alert('No se pudo copiar el código. Inténtalo manualmente.');
        });
    };

    // Función para manejar la visibilidad de las secciones
    const updateVisibility = (isFromPayment, isAdminAccess, code) => {
        if (isFromPayment && code) {
            paymentSuccessSection.classList.remove('hidden');
            adminAccessSection.classList.add('hidden');
            restrictedAccessSection.classList.add('hidden');
            generatedCodeDisplay.textContent = code;
            copyCodeBtn.onclick = () => copiarCodigo(code);
        } else if (isAdminAccess && code) {
            adminAccessSection.classList.remove('hidden');
            paymentSuccessSection.classList.add('hidden');
            restrictedAccessSection.classList.add('hidden');
            generatedCodeDisplayAdmin.textContent = code;
            copyCodeAdminBtn.onclick = () => copiarCodigo(code);
        } else {
            restrictedAccessSection.classList.remove('hidden');
            paymentSuccessSection.classList.add('hidden');
            adminAccessSection.classList.add('hidden');
        }
    };

    // Lógica inicial al cargar la página (equivalente a useEffect)
    const urlParams = new URLSearchParams(window.location.search);
    
    // Verificar si viene de MercadoPago
    const paymentStatus = urlParams.get('payment_status') === 'approved' || 
                          urlParams.get('status') === 'approved';
    const referrerFromPayment = document.referrer.includes('mercadopago') || 
                                document.referrer.includes('mpago');
    const isFromPayment = paymentStatus || referrerFromPayment;

    // Verificar si es acceso de admin
    const adminCodeUrl = urlParams.get('admin');
    let isAdminAccess = false;
    if (adminCodeUrl === '1984') {
        isAdminAccess = true;
    }

    // Generar código si aplica
    if (isFromPayment || isAdminAccess) {
        // Asumiendo que generateDailyPassword está disponible globalmente desde enigmaUtils.js
        generatedCode = generateDailyPassword(); 
    }

    updateVisibility(isFromPayment, isAdminAccess, generatedCode);

    // Manejo del input de administrador
    adminInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value === '1984') {
            isAdminAccess = true;
            // Generar el código de nuevo para el admin
            generatedCode = generateDailyPassword();
            updateVisibility(false, isAdminAccess, generatedCode); // isFromPayment = false
        } else {
            // Si el admin input cambia y no es 1984, revocar acceso admin si lo tenía
            if (isAdminAccess) {
                isAdminAccess = false;
                generatedCode = '';
                updateVisibility(isFromPayment, isAdminAccess, generatedCode);
            }
        }
    });

    // Botón Volver al Inicio
    volverAInicioBtn.addEventListener('click', () => {
        if (generatedCode) {
            window.location.href = `index.html?code=${generatedCode}`; // Redirigir con el código
        } else {
            window.location.href = 'index.html'; // Redirigir sin código
        }
    });
});