// enigmaUtils.js

/**
 * Genera una contraseña diaria de 4 dígitos basada en la fecha UTC actual.
 * Esto asegura que la contraseña sea consistente globalmente.
 * @returns {string} La contraseña diaria de 4 dígitos.
 */
function generateDailyPassword() {
  const now = new Date();
  // Usar métodos UTC para asegurar la consistencia global de la fecha
  const dateString = now.getUTCFullYear() + '' + 
                   String(now.getUTCMonth() + 1).padStart(2, '0') + '' + 
                   String(now.getUTCDate()).padStart(2, '0');
  
  // Algoritmo simple basado en la fecha para generar un hash
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  // Convertir a un código de 4 dígitos (entre 1000 y 9999)
  const code = Math.abs(hash % 9000) + 1000;
  return code.toString();
}

// Nota: checkMercadoPagoRedirect y validateCode de enigmaUtils.ts
// se han integrado directamente en la lógica de main.js y enigma.js según sea necesario,
// para evitar dependencias de módulos que no existen en JS puro global.
// Si deseas mantenerlas como funciones separadas globales, simplemente las dejas aquí.
// Por ahora, solo mantengo generateDailyPassword aquí ya que es la única realmente usada de forma externa en Home.js