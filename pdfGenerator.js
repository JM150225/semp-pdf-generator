/**
 * pdfGenerator.js - Generación de PDFs usando jsPDF
 * Versión adaptada para trabajar con CDN de jsPDF
 */

/**
 * Genera PDF gratuito con marca de agua
 */
function generateFreePDF() {
  try {
    // Verificar que jsPDF esté disponible
    if (typeof window.jspdf === 'undefined') {
      throw new Error('jsPDF library no está cargada. Verifica la conexión a internet.');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'letter'
    });

    const margin = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;

    // Contenido del documento
    const documentContent = `DOCUMENTO PROFESIONAL PDF - VERSIÓN GRATUITA

Este es un documento PDF generado por el sistema SEMP en su versión gratuita.

NOTA: Esta versión incluye marca de agua. Para obtener la versión sin marca de agua, 
adquiere la versión Premium por solo $5.00 MXN.

CARACTERÍSTICAS DEL DOCUMENTO:
• Formato profesional de alta calidad
• Contenido estructurado y bien organizado  
• Compatible con todos los lectores de PDF
• Optimizado para impresión y visualización digital
• Marca de agua incluida (removible en versión Premium)

CONTENIDO PRINCIPAL:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

BENEFICIOS DE LA VERSIÓN PREMIUM:
• Sin marca de agua
• Mejor calidad de impresión
• Uso comercial permitido
• Soporte técnico incluido
• Actualizaciones gratuitas

INSTRUCCIONES DE USO:

1. Este documento puede ser usado para fines educativos y de demostración
2. Para uso comercial, actualiza a la versión Premium
3. Conserva este archivo como respaldo de tu transacción

CONCLUSIONES:

Este documento representa un ejemplo de contenido profesional de alta calidad que puede ser generado por nuestro sistema. Actualiza a la versión Premium para obtener todas las funcionalidades sin restricciones.

¡Gracias por usar el Sistema SEMP!`;

    const lineHeight = 6;
    const paragraphs = documentContent.split('\n').map(p => p.trim()).filter(p => p.length > 0);

    // Configurar fuente base
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Procesar cada párrafo
    for (const paragraph of paragraphs) {
      // Configurar estilos según el contenido
      if (paragraph.startsWith('DOCUMENTO PROFESIONAL PDF')) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
      } else if (paragraph.includes('CARACTERÍSTICAS') || paragraph.includes('CONTENIDO PRINCIPAL') || 
                 paragraph.includes('BENEFICIOS') || paragraph.includes('INSTRUCCIONES') ||
                 paragraph.includes('CONCLUSIONES') || paragraph.includes('NOTA:')) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
      } else if (paragraph.startsWith('•')) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }

      // Dividir texto en líneas
      const textLines = doc.splitTextToSize(paragraph, contentWidth);
      const paragraphHeight = textLines.length * lineHeight;

      // Verificar si necesita nueva página
      if (currentY + paragraphHeight + margin > pageHeight) {
        doc.addPage();
        currentY = margin;
      }

      // Añadir texto
      doc.text(textLines, margin, currentY);
      currentY += paragraphHeight + 8;
    }

    // Añadir marca de agua
    addWatermark(doc);

    // Añadir metadatos
    doc.setProperties({
      title: 'SEMP - Documento PDF Gratuito',
      subject: 'Documento generado por Sistema SEMP',
      author: 'Sistema SEMP',
      creator: 'semp-system.com'
    });

    // Guardar archivo
    const filename = `SEMP-Gratuito-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    return true;
  } catch (error) {
    console.error('Error generando PDF gratuito:', error);
    throw error;
  }
}

/**
 * Genera PDF premium sin marca de agua
 */
function generatePremiumPDF() {
  try {
    // Verificar que jsPDF esté disponible
    if (typeof window.jspdf === 'undefined') {
      throw new Error('jsPDF library no está cargada. Verifica la conexión a internet.');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'letter'
    });

    const margin = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;

    // Contenido del documento premium
    const documentContent = `DOCUMENTO PROFESIONAL PDF - VERSIÓN PREMIUM

Este es un documento PDF profesional generado por el sistema SEMP.

CARACTERÍSTICAS DEL DOCUMENTO:
• Formato profesional de alta calidad
• Contenido estructurado y bien organizado  
• Compatible con todos los lectores de PDF
• Optimizado para impresión y visualización digital
• Sin marca de agua para uso profesional

CONTENIDO PRINCIPAL:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

SECCIÓN TÉCNICA:

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus aliquet, enim a volutpat aliquet, lorem libero gravida felis, in malesuada enim sapien vel justo.

Etiam in elit ac nisl facilisis tincidunt. Suspendisse potenti. Ut ac nunc vel sapien blandit euismod. Nam vel nulla sit amet odio vestibulum luctus.

Mauris vehicula metus quis tortor congue fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

ANÁLISIS DETALLADO:

Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.

CONCLUSIONES:

Este documento representa un ejemplo de contenido profesional de alta calidad que puede ser generado por nuestro sistema. La versión premium ofrece contenido sin marca de agua para uso comercial y profesional.

INFORMACIÓN ADICIONAL:

• Documento generado el ${new Date().toLocaleDateString('es-ES')}
• Versión Premium sin restricciones
• Válido para uso comercial
• Soporte técnico incluido

¡Gracias por elegir la versión Premium del Sistema SEMP!`;

    const lineHeight = 6;
    const paragraphs = documentContent.split('\n').map(p => p.trim()).filter(p => p.length > 0);

    // Configurar fuente base
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Procesar cada párrafo
    for (const paragraph of paragraphs) {
      // Configurar estilos según el contenido
      if (paragraph.startsWith('DOCUMENTO PROFESIONAL PDF')) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
      } else if (paragraph.includes('CARACTERÍSTICAS') || paragraph.includes('CONTENIDO PRINCIPAL') || 
                 paragraph.includes('SECCIÓN TÉCNICA') || paragraph.includes('ANÁLISIS DETALLADO') ||
                 paragraph.includes('CONCLUSIONES') || paragraph.includes('INFORMACIÓN ADICIONAL')) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
      } else if (paragraph.startsWith('•')) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }

      // Dividir texto en líneas
      const textLines = doc.splitTextToSize(paragraph, contentWidth);
      const paragraphHeight = textLines.length * lineHeight;

      // Verificar si necesita nueva página
      if (currentY + paragraphHeight + margin > pageHeight) {
        doc.addPage();
        currentY = margin;
      }

      // Añadir texto
      doc.text(textLines, margin, currentY);
      currentY += paragraphHeight + 8;
    }

    // Añadir footer premium
    addPremiumFooter(doc);

    // Añadir metadatos premium
    doc.setProperties({
      title: 'SEMP - Documento PDF Premium',
      subject: 'Documento Premium generado por Sistema SEMP',
      author: 'Sistema SEMP',
      creator: 'semp-system.com',
      keywords: 'premium, sin marca de agua, profesional'
    });

    // Guardar archivo
    const filename = `SEMP-Premium-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    return true;
  } catch (error) {
    console.error('Error generando PDF premium:', error);
    throw error;
  }
}

/**
 * Añade marca de agua al documento
 * @param {jsPDF} doc - Instancia de jsPDF
 */
function addWatermark(doc) {
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.saveGraphicsState();
    
    try {
      // Configurar propiedades de la marca de agua
      doc.setGState(new doc.GState({ opacity: 0.3 }));
      doc.setTextColor(255, 0, 0);
      doc.setFont('helvetica', 'bold');

      const currentPageWidth = doc.internal.pageSize.getWidth();
      const currentPageHeight = doc.internal.pageSize.getHeight();
      const xCenter = currentPageWidth / 2;
      const yCenter = currentPageHeight / 2;

      // Marca de agua principal
      doc.setFontSize(40);
      doc.text('SEMP', xCenter, yCenter - 10, {
        angle: 45,
        align: 'center'
      });

      // Marca de agua secundaria
      doc.setFontSize(24);
      doc.text('VERSIÓN GRATUITA', xCenter, yCenter + 10, {
        angle: 45,
        align: 'center'
      });

      // Marca de agua en esquinas
      doc.setFontSize(16);
      doc.setTextColor(200, 0, 0);
      doc.text('SEMP', 20, 20, { angle: 45 });
      doc.text('SEMP', currentPageWidth - 40, currentPageHeight - 20, { angle: 45 });
    } catch (error) {
      console.warn('Error añadiendo marca de agua avanzada, usando método simple:', error);
      
      // Fallback: marca de agua simple
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(30);
      doc.text('SEMP - VERSIÓN GRATUITA', 50, 150, { angle: 45 });
    }

    doc.restoreGraphicsState();
  }
}

/**
 * Añade footer premium al documento
 * @param {jsPDF} doc - Instancia de jsPDF
 */
function addPremiumFooter(doc) {
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Footer premium
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    
    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20);
    
    // Texto del footer
    const footerText = `SEMP Premium - Sin marca de agua | Página ${i} de ${pageCount} | Generado: ${new Date().toLocaleDateString('es-ES')}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
}

// Verificación de disponibilidad de jsPDF al cargar
document.addEventListener('DOMContentLoaded', () => {
  // Verificar que jsPDF esté disponible
  if (typeof window.jspdf === 'undefined') {
    console.warn('jsPDF no está disponible. Verifica la conexión a internet.');
    
    // Mostrar mensaje de error si hay contenedor de notificaciones
    const notificationsContainer = document.getElementById('notificationsContainer');
    if (notificationsContainer) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-warning d-flex align-items-center';
      errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <div>
          <strong>Atención:</strong> La librería de generación de PDF no está disponible. 
          Verifica tu conexión a internet y recarga la página.
        </div>
      `;
      notificationsContainer.appendChild(errorDiv);
    }
  } else {
    console.log('jsPDF cargado correctamente');
  }
});
