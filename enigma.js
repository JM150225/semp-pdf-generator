/**
 * enigma.js - Lógica para la página enigma.html
 * Maneja la detección de pagos de MercadoPago y acceso administrativo
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const paymentSuccessSection = document.getElementById('paymentSuccessSection');
    const adminAccessSection = document.getElementById('adminAccessSection');
    const restrictedAccessSection = document.getElementById('restrictedAccessSection');
    const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
    const generatedCodeDisplayAdmin = document.getElementById('generatedCodeDisplayAdmin');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const copyCodeAdminBtn = document.getElementById('copyCodeAdminBtn');
    const adminInput = document.getElementById('adminInput');
    const volverAInicioBtn = document.getElementById('volverAInicioBtn');

    // Estado de la aplicación
    let generatedCode = '';
    let isFromPayment = false;
    let isAdminAccess = false;

    // --- Funciones de Utilidad ---
    async function copiarCodigo(codigo) {
        try {
            const success = await copyToClipboard(codigo);
            if (success) {
                // Cambiar temporalmente el texto del botón
                const activeBtn = isAdminAccess ? copyCodeAdminBtn : copyCodeBtn;
                const originalText = activeBtn.innerHTML;
                activeBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Copiado!';
                activeBtn.classList.add('btn-success');
                activeBtn.classList.remove('btn-outline-primary', 'btn-outline-warning');
                
                setTimeout(() => {
                    activeBtn.innerHTML = originalText;
                    activeBtn.classList.remove('btn-success');
                    if (isAdminAccess) {
                        activeBtn.classList.add('btn-outline-warning');
                    } else {
                        activeBtn.classList.add('btn-outline-primary');
                    }
                }, 2000);
            } else {
                alert('No se pudo copiar automáticamente. Por favor, selecciona y copia el código manualmente.');
            }
        } catch (error) {
            console.error('Error al copiar el código:', error);
            alert('Error al copiar el código. Inténtalo manualmente.');
        }
    }

    function updateVisibility(fromPayment, adminAccess, code) {
        // Ocultar todas las secciones primero
        paymentSuccessSection.classList.add('hidden');
        adminAccessSection.classList.add('hidden');
        restrictedAccessSection.classList.add('hidden');

        if (fromPayment && code) {
            // Mostrar sección de pago exitoso
            paymentSuccessSection.classList.remove('hidden');
            generatedCodeDisplay.textContent = code;
            
            // Configurar botón de copiar
            copyCodeBtn.onclick = () => copiarCodigo(code);
            
        } else if (adminAccess && code) {
            // Mostrar sección de acceso admin
            adminAccessSection.classList.remove('hidden');
            generatedCodeDisplayAdmin.textContent = code;
            
            // Configurar botón de copiar admin
            copyCodeAdminBtn.onclick = () => copiarCodigo(code);
            
        } else {
            // Mostrar sección de acceso restringido
            restrictedAccessSection.classList.remove('hidden');
        }
    }

    // --- Detección Inicial ---
    function detectAccessType() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Verificar si viene de MercadoPago
        isFromPayment = checkMercadoPagoRedirect();
        
        // Verificar acceso de administrador vía URL
        const adminCodeUrl = urlParams.get('admin');
        if (adminCodeUrl === '1984') {
            isAdminAccess = true;
        }
        
        // Generar código si es necesario
        if (isFromPayment || isAdminAccess) {
            generatedCode = getDailyCodeSecure();
        }
        
        // Debug en desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('=== Enigma Debug ===');
            console.log('Es pago:', isFromPayment);
            console.log('Es admin:', isAdminAccess);
            console.log('Código generado:', generatedCode);
            console.log('URL params:', Object.fromEntries(urlParams));
            console.log('Referrer:', document.referrer);
        }
        
        // Actualizar visibilidad
        updateVisibility(isFromPayment, isAdminAccess, generatedCode);
    }

    // --- Manejo del Input de Administrador ---
    adminInput.addEventListener('input', (e) => {
        const value = e.target.value;
        
        if (value === '1984') {
            isAdminAccess = true;
            generatedCode = getDailyCodeSecure();
            updateVisibility(false, isAdminAccess, generatedCode);
            
            // Limpiar input después de un momento
            setTimeout(() => {
                adminInput.value = '';
            }, 1000);
        } else {
            // Si el input cambia y no es 1984, revocar acceso admin
            if (isAdminAccess && value !== '1984') {
                isAdminAccess = false;
                generatedCode = '';
                updateVisibility(isFromPayment, isAdminAccess, generatedCode);
            }
        }
    });

    // Permitir Enter en el input de admin
    adminInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.blur(); // Quitar focus para activar validación
        }
    });

    // --- Botón Volver al Inicio ---
    volverAInicioBtn.addEventListener('click', () => {
        if (generatedCode) {
            // Redirigir con el código en la URL
            window.location.href = `/?code=${generatedCode}`;
        } else {
            // Redirigir sin código
            window.location.href = '/';
        }
    });

    // --- Auto-redirección para pagos exitosos ---
    function setupAutoRedirect() {
        if (isFromPayment && generatedCode) {
            // Auto-redirigir después de 10 segundos
            let countdown = 10;
            const countdownInterval = setInterval(() => {
                countdown--;
                
                // Actualizar texto del botón con countdown
                volverAInicioBtn.innerHTML = `
                    <i class="fas fa-arrow-left me-2"></i>
                    Ir al Generador de PDF (${countdown}s)
                `;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    volverAInicioBtn.click();
                }
            }, 1000);
            
            // Cancelar auto-redirect si hay interacción
            document.addEventListener('click', () => {
                clearInterval(countdownInterval);
                volverAInicioBtn.innerHTML = `
                    <i class="fas fa-arrow-left me-2"></i>
                    Ir al Generador de PDF
                `;
            }, { once: true });
        }
    }

    // --- Efectos Visuales ---
    function addVisualEffects() {
        // Animar código cuando se muestra
        const codeDisplays = [generatedCodeDisplay, generatedCodeDisplayAdmin];
        codeDisplays.forEach(display => {
            if (display && display.textContent) {
                display.style.transform = 'scale(0.8)';
                display.style.opacity = '0';
                
                setTimeout(() => {
                    display.style.transition = 'all 0.5s ease';
                    display.style.transform = 'scale(1)';
                    display.style.opacity = '1';
                }, 200);
            }
        });
    }

    // --- Inicialización ---
    function initializeEnigma() {
        detectAccessType();
        setupAutoRedirect();
        addVisualEffects();
        
        // Focus al input de admin si está en acceso restringido
        if (!isFromPayment && !isAdminAccess) {
            setTimeout(() => {
                adminInput.focus();
            }, 500);
        }
    }

    // --- Manejo de Errores ---
    window.addEventListener('error', (event) => {
        console.error('Error en Enigma:', event.error);
        
        // Mostrar mensaje de error amigable
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3';
        errorDiv.style.zIndex = '9999';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            Se produjo un error. Recarga la página si el problema persiste.
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.remove()"></button>
        `;
        document.body.appendChild(errorDiv);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    });

    // --- Inicializar ---
    initializeEnigma();
});
