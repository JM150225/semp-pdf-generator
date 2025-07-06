// pdfGenerator.js

// Asegúrate de que jspdf esté cargado globalmente
// window.jspdf ya está disponible si el CDN se carga antes que este script.

// Generate free PDF with watermark
function generateFreePDF() {
  if (typeof window === 'undefined' || !window.jspdf) {
    alert('Error: jsPDF library is not loaded.');
    return;
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

  // Sample document content
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

BENEFICIOS DE LA VERSIÓN PREMIUM:
• Sin marca de agua
• Mejor calidad de impresión
• Uso comercial permitido
• Soporte técnico incluido
• Actualizaciones gratuitas

CONCLUSIONES:

Este documento representa un ejemplo de contenido profesional de alta calidad que puede ser generado por nuestro sistema. Actualiza a la versión Premium para obtener todas las funcionalidades sin restricciones.`;

  const lineHeight = 6;
  const paragraphs = documentContent.split('\n').map(p => p.trim()).filter(p => p.length > 0);

  // Set font and generate content
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  for (const paragraph of paragraphs) {
    if (paragraph.startsWith('DOCUMENTO PROFESIONAL PDF')) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
    } else if (paragraph.includes('CARACTERÍSTICAS') || paragraph.includes('CONTENIDO PRINCIPAL') || 
               paragraph.includes('BENEFICIOS') || paragraph.includes('CONCLUSIONES') || 
               paragraph.includes('NOTA:')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
    }

    const textLines = doc.splitTextToSize(paragraph, contentWidth);
    const paragraphHeight = textLines.length * lineHeight;

    if (currentY + paragraphHeight + margin > pageHeight) {
      doc.addPage();
      currentY = margin;
    }

    doc.text(textLines, margin, currentY);
    currentY += paragraphHeight + 8;
  }

  // Add watermark
  addWatermark(doc);

  try {
    doc.save('SEMP-Gratuito.pdf');
    alert('¡PDF Gratuito generado con marca de agua!');
  } catch (error) {
    console.error('Error saving PDF:', error);
    alert('Error al guardar el PDF.');
  }
}

// Generate premium PDF without watermark
function generatePremiumPDF() {
  if (typeof window === 'undefined' || !window.jspdf) {
    alert('Error: jsPDF library is not loaded.');
    return;
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

  // Sample document content
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

SECCIÓN TÉCNICA:

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus aliquet, enim a volutpat aliquet, lorem libero gravida felis, in malesuada enim sapien vel justo.

Etiam in elit ac nisl facilisis tincidunt. Suspendisse potenti. Ut ac nunc vel sapien blandit euismod. Nam vel nulla sit amet odio vestibulum luctus.

CONCLUSIONES:

Este documento representa un ejemplo de contenido profesional de alta calidad que puede ser generado por nuestro sistema. La versión premium ofrece contenido sin marca de agua para uso comercial y profesional.`;

  const lineHeight = 6;
  const paragraphs = documentContent.split('\n').map(p => p.trim()).filter(p => p.length > 0);

  // Set font and generate content
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  for (const paragraph of paragraphs) {
    if (paragraph.startsWith('DOCUMENTO PROFESIONAL PDF')) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
    } else if (paragraph.includes('CARACTERÍSTICAS') || paragraph.includes('CONTENIDO PRINCIPAL') || 
               paragraph.includes('SECCIÓN TÉCNICA') || paragraph.includes('CONCLUSIONES')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
    }

    const textLines = doc.splitTextToSize(paragraph, contentWidth);
    const paragraphHeight = textLines.length * lineHeight;

    if (currentY + paragraphHeight + margin > pageHeight) {
      doc.addPage();
      currentY = margin;
    }

    doc.text(textLines, margin, currentY);
    currentY += paragraphHeight + 8;
  }

  try {
    doc.save('SEMP-Premium.pdf');
    alert('¡PDF Premium generado exitosamente sin marca de agua!');
  } catch (error) {
    console.error('Error saving PDF:', error);
    alert('Error al guardar el PDF.');
  }
}

// Add watermark to document
function addWatermark(doc) { // `doc` no es de tipo `any` en JS puro
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.saveGraphicsState();
    
    // Set watermark properties
    doc.setGState(new doc.GState({ opacity: 0.3 }));
    doc.setTextColor(255, 0, 0);
    doc.setFont('helvetica', 'bold');

    const currentPageWidth = doc.internal.pageSize.getWidth();
    const currentPageHeight = doc.internal.pageSize.getHeight();
    const xCenter = currentPageWidth / 2;
    const yCenter = currentPageHeight / 2;

    // Main watermark text
    doc.setFontSize(40);
    doc.text('SEMP', xCenter, yCenter - 10, {
      angle: 45,
      align: 'center'
    });

    // Secondary watermark text
    doc.setFontSize(24);
    doc.text('VERSIÓN GRATUITA', xCenter, yCenter + 10, {
      angle: 45,
      align: 'center'
    });

    doc.restoreGraphicsState();
  }
}