/**
 * main.js - Lógica principal para la página index.html
 * Maneja la verificación de códigos, generación de PDFs y notificaciones
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const digitInputs = document.querySelectorAll('.digit-input');
    const verificarClaveBtn = document.getElementById('verificarClaveBtn');
    const downloadPremiumPDFBtn = document.getElementById('downloadPremiumPDFBtn');
    const generateFreePDFBtn = document.getElementById('generateFreePDFBtn');
    const initiateMercadoPagoBtn = document.getElementById('initiateMercadoPagoBtn');
    const notificationsContainer = document.getElementById('notificationsContainer');

    // Estado de la aplicación
    let isPremiumUnlocked = false;
    let generatedCode = '';

    // --- Funciones de Utilidad para Notificaciones ---
    function showNotification(type, title, message, icon = '') {
        // Limpiar notificaciones anteriores
        notificationsContainer.innerHTML = '';

        // Determinar icono si no se proporciona
        if (!icon) {
            switch (type) {
                case 'success': icon = 'fas fa-check-circle'; break;
                case 'error': icon = 'fas fa-times-circle'; break;
                case 'info': icon = 'fas fa-info-circle'; break;
                case 'warning': icon = 'fas fa-exclamation-triangle'; break;
                default: icon = 'fas fa-bell';
            }
        }

        const notificationDiv = document.createElement('div');
        notificationDiv.className = `alert alert-${type === 'error' ? 'danger' : type} notification-card notification-${type} d-flex align-items-center`;
        notificationDiv.innerHTML = `
            <div class="me-3 fs-4">
                <i class="${icon}"></i>
            </div>
            <div class="flex-grow-1">
                <h5 class="alert-heading mb-1">${title}</h5>
                <p class="mb-0">${message}</p>
            </div>
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        notificationsContainer.appendChild(notificationDiv);

        // Auto-ocultar después de 7 segundos (excepto errores)
        if (type !== 'error') {
            setTimeout(() => {
                if (notificationDiv.parentElement) {
                    notificationDiv.remove();
                }
            }, 7000);
        }
    }

    // --- Inicialización ---
    function initializeApp() {
        // Verificar si hay código desde URL (Flask)
        if (window.generatedCodeFromUrl) {
            generatedCode = window.generatedCodeFromUrl;
            showNotification('info', '¡Pago Detectado!', 
                `Gracias por tu pago. Tu código de desbloqueo es: ${generatedCode}`, 
                'fas fa-credit-card');
            
            // Limpiar URL para evitar notificaciones repetidas
            if (window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        // Mostrar información del código diario actual (solo en desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const dailyCode = getDailyCodeSecure();
            console.log(`Código diario actual: ${dailyCode}`);
            
            // Verificar sincronización
            const syncStatus = verifyCodeSynchronization();
            if (!syncStatus.synchronized) {
                console.warn('⚠️ ADVERTENCIA: Problemas de sincronización detectados');
            }
        }
    }

    // --- Manejo de Inputs de Dígitos ---
    digitInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            let value = e.target.value;

            // Solo permitir dígitos numéricos
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 1) {
                value = value.charAt(0);
            }
            e.target.value = value;

            // Auto-focus al siguiente input
            if (value && index < digitInputs.length - 1) {
                digitInputs[index + 1].focus();
            }
            
            // Focus al botón si es el último input
            if (index === digitInputs.length - 1 && value) {
                verificarClaveBtn.focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            // Backspace: volver al input anterior
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                digitInputs[index - 1].focus();
            }
            
            // Enter: verificar código
            if (e.key === 'Enter') {
                verificarClaveBtn.click();
            }
        });

        // Manejar pegado de códigos completos
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');
            const digits = pastedText.replace(/[^0-9]/g, '').slice(0, 4);
            
            if (digits.length >= 4) {
                digitInputs.forEach((input, i) => {
                    input.value = digits[i] || '';
                });
                // Focus al botón de verificar después del pegado
                setTimeout(() => verificarClaveBtn.focus(), 100);
            }
        });
    });

    // --- Verificación de Código ---
    verificarClaveBtn.addEventListener('click', () => {
        const enteredCode = Array.from(digitInputs).map(input => input.value).join('');
        
        if (enteredCode.length !== 4) {
            showNotification('warning', 'Código Incompleto', 
                'Por favor, ingresa los 4 dígitos del código.', 
                'fas fa-exclamation-triangle');
            digitInputs[0].focus();
            return;
        }

        // Validar código usando enigmaUtils
        const validation = validateCode(enteredCode);
        
        // Limpiar inputs
        digitInputs.forEach(input => input.value = '');
        digitInputs[0].focus();

        if (validation.isValid) {
            isPremiumUnlocked = true;
            
            // Mostrar botón premium con animación
            downloadPremiumPDFBtn.classList.remove('d-none');
            downloadPremiumPDFBtn.classList.add('animate-pulse-scale');
            
            const typeText = validation.type === 'admin' ? 'Administrador' : 'Premium';
            showNotification('success', '¡Felicidades!', 
                `Código ${typeText} correcto. Ahora puedes descargar tu PDF Premium sin marca de agua.`, 
                'fas fa-crown');
        } else {
            isPremiumUnlocked = false;
            
            // Ocultar botón premium
            downloadPremiumPDFBtn.classList.add('d-none');
            downloadPremiumPDFBtn.classList.remove('animate-pulse-scale');
            
            showNotification('error', 'Código Incorrecto', 
                'La contraseña ingresada no es válida. Verifica el código e inténtalo de nuevo.', 
                'fas fa-times-circle');
        }
    });

    // --- Generación de PDFs ---
    generateFreePDFBtn.addEventListener('click', () => {
        const button = generateFreePDFBtn;
        const originalText = button.innerHTML;
        
        // Estado de carga
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generando PDF...';
        button.disabled = true;
        
        try {
            generateFreePDF();
            
            showNotification('success', 'PDF Generado', 
                'Tu PDF gratuito con marca de agua ha sido generado exitosamente.', 
                'fas fa-file-pdf');
        } catch (error) {
            console.error('Error generando PDF gratuito:', error);
            showNotification('error', 'Error al Generar PDF', 
                'Hubo un problema generando el PDF. Inténtalo de nuevo.', 
                'fas fa-exclamation-triangle');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1000);
        }
    });

    downloadPremiumPDFBtn.addEventListener('click', () => {
        if (!isPremiumUnlocked) {
            showNotification('warning', 'Acceso Denegado', 
                'Necesitas ingresar un código de desbloqueo válido primero.', 
                'fas fa-lock');
            return;
        }

        const button = downloadPremiumPDFBtn;
        const originalText = button.innerHTML;
        
        // Estado de carga
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generando PDF Premium...';
        button.disabled = true;
        
        try {
            generatePremiumPDF();
            
            showNotification('success', 'PDF Premium Generado', 
                'Tu PDF Premium sin marca de agua ha sido generado exitosamente.', 
                'fas fa-crown');
        } catch (error) {
            console.error('Error generando PDF premium:', error);
            showNotification('error', 'Error al Generar PDF Premium', 
                'Hubo un problema generando el PDF Premium. Inténtalo de nuevo.', 
                'fas fa-exclamation-triangle');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1000);
        }
    });

    // --- Botón de Pago ---
    initiateMercadoPagoBtn.addEventListener('click', () => {
        // Confirmar antes de redirigir
        const confirmed = confirm('¿Deseas proceder al pago de $5.00 MXN para desbloquear la versión Premium?');
        
        if (confirmed) {
            showNotification('info', 'Redirigiendo al Pago', 
                'Te estamos redirigiendo a MercadoPago para procesar tu pago...', 
                'fas fa-credit-card');
            
            // Pequeño delay para mostrar la notificación
            setTimeout(() => {
                window.open('https://mpago.la/2yCDH8K', '_blank');
            }, 1500);
        }
    });

    // --- Atajos de Teclado ---
    document.addEventListener('keydown', (e) => {
        // Alt + V: Verificar código
        if (e.altKey && e.key === 'v') {
            e.preventDefault();
            verificarClaveBtn.click();
        }
        
        // Alt + F: Generar PDF gratuito
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            generateFreePDFBtn.click();
        }
        
        // Alt + P: Generar PDF premium (si está desbloqueado)
        if (e.altKey && e.key === 'p' && isPremiumUnlocked) {
            e.preventDefault();
            downloadPremiumPDFBtn.click();
        }
    });

    // --- Inicializar Aplicación ---
    initializeApp();
    
    // Auto-focus al primer input
    if (digitInputs.length > 0) {
        digitInputs[0].focus();
    }
});
