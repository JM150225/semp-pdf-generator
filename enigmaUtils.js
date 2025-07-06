/**
 * enigmaUtils.js - Utilidades centralizadas para el Sistema Enigma
 * 
 * Este archivo contiene las funciones principales para:
 * - Generación de contraseñas diarias
 * - Validación de códigos
 * - Detección de pagos de MercadoPago
 */

/**
 * Genera una contraseña diaria de 4 dígitos basada en la fecha UTC actual.
 * Esto asegura que la contraseña sea consistente globalmente.
 * @returns {string} La contraseña diaria de 4 dígitos.
 */
function generateDailyPassword() {
  const now = new Date();
  
  // Crear fecha UTC sin variaciones de zona horaria
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth() + 1;
  const utcDay = now.getUTCDate();
  
  // Formatear fecha como YYYYMMDD para consistencia
  const dateString = `${utcYear}${utcMonth.toString().padStart(2, '0')}${utcDay.toString().padStart(2, '0')}`;
  
  // Algoritmo de hash mejorado para mayor consistencia
  let hash = 5381; // Usar DJB2 hash para mejor distribución
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) + hash) + dateString.charCodeAt(i);
  }
  
  // Asegurar que el hash sea positivo y en rango correcto
  hash = Math.abs(hash);
  const code = (hash % 9000) + 1000;
  
  // Debug en desarrollo
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`[DEBUG] Fecha UTC: ${dateString}, Hash: ${hash}, Código: ${code}`);
  }
  
  return code.toString();
}

/**
 * Valida un código ingresado contra el código diario y el código de administrador
 * @param {string} enteredCode - Código ingresado por el usuario
 * @returns {object} Resultado de la validación
 */
function validateCode(enteredCode) {
  const dailyCode = getDailyCodeSecure();
  const adminCode = '1984';
  
  // Debug en desarrollo
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`[VALIDACIÓN] Código ingresado: ${enteredCode}, Código esperado: ${dailyCode}`);
  }
  
  if (enteredCode === dailyCode) {
    return {
      isValid: true,
      type: 'daily',
      message: 'Código diario válido',
      code: dailyCode
    };
  }
  
  if (enteredCode === adminCode) {
    return {
      isValid: true,
      type: 'admin',
      message: 'Código de administrador válido',
      code: dailyCode // Aún devolvemos el código diario para usar después
    };
  }
  
  return {
    isValid: false,
    type: 'invalid',
    message: 'Código inválido',
    expectedCode: dailyCode // Para debug
  };
}

/**
 * Verifica si la visita actual proviene de una redirección de MercadoPago
 * @returns {boolean} True si proviene de MercadoPago
 */
function checkMercadoPagoRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Verificar parámetros de estado de pago
  const paymentStatus = urlParams.get('payment_status') === 'approved' || 
                       urlParams.get('status') === 'approved' ||
                       urlParams.get('collection_status') === 'approved';
  
  // Verificar referrer
  const referrerFromPayment = document.referrer && (
    document.referrer.includes('mercadopago') || 
    document.referrer.includes('mpago') ||
    document.referrer.includes('mercadolibre')
  );
  
  // Verificar parámetros específicos de MercadoPago
  const hasPaymentId = urlParams.get('payment_id') || urlParams.get('collection_id');
  const hasPreferenceId = urlParams.get('preference_id');
  
  return paymentStatus || referrerFromPayment || (hasPaymentId && hasPreferenceId);
}

/**
 * Obtiene la fecha actual en formato legible
 * @returns {string} Fecha formateada
 */
function getCurrentDateFormatted() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  return now.toLocaleDateString('es-ES', options);
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    // Fallback para navegadores más antiguos
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch (fallbackErr) {
      console.error('Error en fallback de copiado:', fallbackErr);
      return false;
    }
  }
}

/**
 * Verifica la sincronización de códigos entre páginas
 * @returns {object} Estado de sincronización
 */
function verifyCodeSynchronization() {
  const code1 = generateDailyPassword();
  const code2 = generateDailyPassword();
  const code3 = generateDailyPassword();
  
  const isSync = code1 === code2 && code2 === code3;
  
  return {
    synchronized: isSync,
    code: code1,
    timestamp: new Date().toISOString(),
    tests: [code1, code2, code3]
  };
}

/**
 * Obtiene el código diario con validación de consistencia
 * @returns {string} Código diario validado
 */
function getDailyCodeSecure() {
  const syncCheck = verifyCodeSynchronization();
  
  if (!syncCheck.synchronized) {
    console.error('¡ALERTA! Códigos no sincronizados:', syncCheck.tests);
    // En caso de error, usar método alternativo más simple
    const fallbackDate = new Date();
    const simpleCode = (fallbackDate.getUTCDate() * 100 + fallbackDate.getUTCMonth() + 1).toString().padStart(4, '0');
    return simpleCode;
  }
  
  return syncCheck.code;
}

/**
 * Debug: Muestra información del sistema en consola
 */
function debugEnigmaSystem() {
  console.log('=== Sistema Enigma Debug ===');
  
  const syncStatus = verifyCodeSynchronization();
  console.log('Estado de sincronización:', syncStatus.synchronized ? '✓ SINCRONIZADO' : '✗ ERROR');
  console.log('Código diario actual:', syncStatus.code);
  console.log('Pruebas de código:', syncStatus.tests);
  console.log('Fecha UTC:', getCurrentDateFormatted());
  console.log('URL actual:', window.location.href);
  console.log('Referrer:', document.referrer);
  console.log('Parámetros URL:', Object.fromEntries(new URLSearchParams(window.location.search)));
  console.log('Es redirección de MercadoPago:', checkMercadoPagoRedirect());
  console.log('============================');
}

// Exportar funciones para uso global
window.enigmaUtils = {
  generateDailyPassword,
  getDailyCodeSecure,
  verifyCodeSynchronization,
  validateCode,
  checkMercadoPagoRedirect,
  getCurrentDateFormatted,
  copyToClipboard,
  debugEnigmaSystem
};

// Debug automático en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('Modo desarrollo detectado');
  debugEnigmaSystem();
}
