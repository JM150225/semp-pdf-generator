document.addEventListener('DOMContentLoaded', function () {
    // ... (FUNCIONES DEL MENÚ) ...
const menuButton = document.getElementById('menuButton');
const menuContent = document.getElementById('menuContent');
const themeButton = document.getElementById('themeButton');

// 📌 NUEVO: Captura enlaces ancla en menú para scroll y fade
    const anchorLinks = menuContent.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        menuContent.style.transition = 'opacity 0.7s ease';
        menuContent.style.opacity = 0;
        setTimeout(() => {
          menuContent.style.display = 'none';
          menuContent.style.opacity = 1;
        }, 700);
      });
    });

// Alternar visibilidad del menú
menuButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se cierre de inmediato
    const isVisible = menuContent.style.display === 'block';
    menuContent.style.display = isVisible ? 'none' : 'block';
});

// Cerrar el menú al hacer clic fuera
document.addEventListener('click', (event) => {
    if (!menuContent.contains(event.target) && event.target !== menuButton) {
        menuContent.style.display = 'none';
    }
});

// Alternar tema claro/oscuro con transición tipo "anochecer"
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Control editable del tiempo de transición (si lo deseas)
// document.documentElement.style.setProperty('--transition-speed', '1.5s');

// ===============================

// Función para mostrar el horario del tema

// ===============================

themeScheduleButton.addEventListener('click', () => {
    alert('El tema se activa automáticamente de 7 p.m. a 7 a.m.');
    menuContent.style.display = 'none'; // Oculta el menú al mostrar el horario
});

// Buscamos el botón que tiene el ícono info-circle y el texto "Acerca de"
const acercaDeButton = Array.from(document.querySelectorAll('button')).find(btn =>
    btn.textContent.trim().includes('Acerca de')
);

if (acercaDeButton) {
    acercaDeButton.addEventListener('click', () => {
        alert(`⚠️ Versión • Beta-basic (β) 1.0.0 ⚠️

Esta es la primer versión de prueba y lanzamiento

---
Versiones y Categorías:

(Versiones de servicio empresarial.)

• Alfa-Omega (A-Ω) - Para Empresas privadas / Rentas de servicio desde $6,930.00 mensuales
• Delta (Δ) - Para Agencias laborales / Rentas de servicio $3,690.00

(Versiones de servicio al público.)

• Ultra (✡) - $40.00
• Saturn (♄) - $30.00
• Gamma (Γ) - $20.00
• Beta-basic (β) - $10.00
`);
    });
}

// ===============================

// FIN FUNCIONES DEL MENU FLOTANTE

// ===============================


  



// SelecTOR DE COLOR
const colorPicker = document.getElementById('colorPicker');
const headerPreview = document.getElementById('headerPreview');

// Función para actualizar la vista previa del membrete
function updateHeaderPreview(color) {
    headerPreview.style.backgroundColor = color;
    //Opcional - Maneja el contraste en el color del texto
    headerPreview.style.color = contrastColor(color);
}

// Función para contrastar el color del texto
function contrastColor(hexColor){

	const r = parseInt(hexColor.substring(1,3),16);
	const g = parseInt(hexColor.substring(3,5),16);
	const b = parseInt(hexColor.substring(5,7),16);

	const yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';

};

// Agregar evento de escucha al selector de color
colorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    updateHeaderPreview(newColor);
});

const profileFrame = document.querySelector('.profile-frame');
let rotation = 0;

profileFrame.addEventListener('mouseover', () => {
  rotation += 360; // Rota una vuelta completa
  profileFrame.style.transition = 'transform 0.5s ease-in-out';
  profileFrame.style.transform = `rotate(${rotation}deg)`;
});

profileFrame.addEventListener('mouseout', () => {
  profileFrame.style.transition = 'transform 0.3s ease-in-out'; // Transición más rápida al salir
  profileFrame.style.transform = 'rotate(0deg)'; // Regresa a la posición original
});




// (NOTA RH)
const textarea = document.getElementById('nota-rh');
const caracterCount = document.getElementById('caracter-count');
const clearX = caracterCount.querySelector('.clear-x');

// Contador de caracteres
textarea.addEventListener('input', () => {
  const count = textarea.value.length;
  caracterCount.childNodes[0].nodeValue = `${count}/60 `;
});

// Limpiar el campo al hacer clic en la "×"
clearX.addEventListener('click', () => {
  textarea.value = '';
  caracterCount.childNodes[0].nodeValue = `0/60 `;
  textarea.focus();
});

// Referencias a los selectores de fecha de nacimiento
    const diaNacimientoSelect = document.getElementById('diaNacimiento');
    const mesNacimientoSelect = document.getElementById('mesNacimiento');
    const anioNacimientoSelect = document.getElementById('anioNacimiento');

    // Función para llenar los días (CORREGIDA)
    function llenarDias(mes, anio) {
        // --- INICIO DE LA CORRECCIÓN ---
        const diaSeleccionadoAnterior = diaNacimientoSelect.value; // Guarda el día seleccionado actual
        // --- FIN DE LA CORRECCIÓN ----

        diaNacimientoSelect.innerHTML = ''; // Limpiar los días anteriores (esto es necesario)

        // Asegurarse de que mes y anio son números válidos antes de usarlos
        const mesNum = parseInt(mes);
        const anioNum = parseInt(anio);

        if (isNaN(mesNum) || isNaN(anioNum)) {
            console.error("Mes o año inválido recibido en llenarDias:", mes, anio);
            return; // Salir si los valores no son válidos
        }

        // Obtener la cantidad de días en el mes (mes es 1-based en el select, pero 0-based en Date)
        const diasEnMes = new Date(anioNum, mesNum, 0).getDate();

        // Crear opción por defecto si se desea (opcional)
        // const optionDefault = new Option('Día', '');
        // diaNacimientoSelect.appendChild(optionDefault);

        for (let i = 1; i <= diasEnMes; i++) {
            const option = new Option(i, i); // Texto y valor son 'i'
            diaNacimientoSelect.appendChild(option);
        }

        // --- INICIO DE LA CORRECCIÓN ---
        // Intentar restaurar la selección anterior si todavía es un día válido
        // Comprobamos que diaSeleccionadoAnterior tenía un valor y que es menor o igual
        // al nuevo número de días en el mes.
        if (diaSeleccionadoAnterior && parseInt(diaSeleccionadoAnterior) <= diasEnMes) {
            diaNacimientoSelect.value = diaSeleccionadoAnterior;
        }
        // Si el día anterior ya no es válido (ej: era 31 y se cambió a Febrero),
        // se quedará seleccionada la primera opción por defecto (el día 1).
        // --- FIN DE LA CORRECCIÓN ----
    }

    // Función para llenar los años (desde 1950 hasta el año actual)
    function llenarAnios() {
        anioNacimientoSelect.innerHTML = ''; // Limpiar por si acaso
        // const optionDefault = new Option('Año', ''); // Opcional: Añadir opción por defecto
        // anioNacimientoSelect.appendChild(optionDefault);
        const anioActual = new Date().getFullYear();
        for (let i = anioActual; i >= 1950; i--) {
            const option = new Option(i, i);
            anioNacimientoSelect.appendChild(option);
        }
        // Establecer un valor por defecto si no se añadió la opción 'Año'
        // anioNacimientoSelect.value = anioActual; // Opcional: seleccionar el año actual por defecto
    }

    // Función para llenar los meses (Asumiendo que ya existen en el HTML)
    // Si no existen, necesitarías una función similar a llenarAnios para los meses.
    // Ejemplo básico si necesitas crearlos:
    /*
    function llenarMeses() {
        mesNacimientoSelect.innerHTML = ''; // Limpiar
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        // const optionDefault = new Option('Mes', ''); // Opcional
        // mesNacimientoSelect.appendChild(optionDefault);
        meses.forEach((nombreMes, index) => {
            // El valor será index + 1 (1 para Enero, 2 para Febrero, etc.)
            const option = new Option(nombreMes, index + 1);
            mesNacimientoSelect.appendChild(option);
        });
    }
    llenarMeses(); // Llamar si los meses se generan dinámicamente
    */

    // --- INICIALIZACIÓN ---
    llenarAnios();

    // Asegurarse de que mes y año tengan un valor inicial válido antes de llamar a llenarDias
    // Si los selectores pueden no tener un valor inicial, establece uno o comprueba
    const mesInicial = mesNacimientoSelect.value || '1'; // Usar '1' (Enero) si no hay valor
    const anioInicial = anioNacimientoSelect.value || new Date().getFullYear(); // Usar año actual si no hay valor

    // Establecer los valores iniciales en los selectores si es necesario
    // mesNacimientoSelect.value = mesInicial; // Descomentar si es necesario
    // anioNacimientoSelect.value = anioInicial; // Descomentar si es necesario

    // Llenar los días al cargar la página (con el mes y año iniciales)
    llenarDias(mesInicial, anioInicial);


    // --- EVENT LISTENERS ---
    mesNacimientoSelect.addEventListener('change', function () {
        // Pasar el mes seleccionado (this.value) y el año actualmente seleccionado
        llenarDias(this.value, anioNacimientoSelect.value);
    });

    anioNacimientoSelect.addEventListener('change', function () {
        // Pasar el mes actualmente seleccionado y el año nuevo (this.value)
        llenarDias(mesNacimientoSelect.value, this.value);
    });

}); // Fin del DOMContentLoaded






//---FUNCION ¿TIENE HIJOS?---
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a los elementos del DOM
  const tieneHijosSelect = document.getElementById('tieneHijos');
  const datosHijosDiv = document.getElementById('datosHijos');
  const cantidadHijosSelect = document.getElementById('cantidadHijos');
  const hijosContainerDiv = document.getElementById('hijosContainer');

  // Función para mostrar u ocultar la sección de datos de hijos
  function toggleDatosHijos() {
    if (tieneHijosSelect.value === 'si') {
      datosHijosDiv.style.display = 'block';
      actualizarCamposHijos(); // Asegurarse de generar los campos al mostrar
    } else {
      datosHijosDiv.style.display = 'none';
      hijosContainerDiv.innerHTML = ''; // Limpiar los campos si se oculta
    }
  }

  // Función para actualizar dinámicamente los campos para cada hijo
  function actualizarCamposHijos() {
    const cantidadHijos = parseInt(cantidadHijosSelect.value);
    hijosContainerDiv.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos campos

    for (let i = 1; i <= cantidadHijos; i++) {
      // Crear elementos para cada hijo
      const hijoDiv = document.createElement('div');
      hijoDiv.classList.add('hijo-group'); // Agregar una clase para estilos (opcional)

      const nombreLabel = document.createElement('label');
      nombreLabel.textContent = `Nombre del hijo ${i}:`;
      nombreLabel.setAttribute('for', `nombreHijo${i}`);  // Importante para la accesibilidad
      const nombreInput = document.createElement('input');
      nombreInput.type = 'text';
      nombreInput.id = `nombreHijo${i}`;
      nombreInput.name = `nombreHijo${i}`;  // Importante para el envío del formulario
      nombreInput.classList.add('form-control'); // Agregar clase de bootstrap para estilo (opcional)

      const edadLabel = document.createElement('label');
      edadLabel.textContent = `Edad del hijo ${i}:`;
      edadLabel.setAttribute('for', `edadHijo${i}`); // Importante para la accesibilidad
      const edadInput = document.createElement('input');
      edadInput.type = 'number';
      edadInput.id = `edadHijo${i}`;
      edadInput.name = `edadHijo${i}`; // Importante para el envío del formulario
      edadInput.classList.add('form-control'); // Agregar clase de bootstrap para estilo (opcional)
      edadInput.min = '0'; // Evita edades negativas
      // --- Comando para restringir a 2 dígitos numéricos ---
edadInput.type = 'text'; // Convierte a 'text' para control estricto
edadInput.inputmode = 'numeric'; // Muestra teclado numérico en móviles
edadInput.maxLength = 2; // Limita la entrada a 2 caracteres
edadInput.pattern = '[0-9]{2}'; // Requiere exactamente 2 dígitos numéricos para validación final
edadInput.title = 'Ingrese exactamente 2 dígitos numéricos para la edad (ej. 05, 12).'; // Mensaje de ayuda

edadInput.addEventListener('keydown', function(event) {
    if (
        !(event.key >= '0' && event.key <= '9') && // No es un dígito
        event.key !== 'Backspace' && event.key !== 'Tab' &&
        event.key !== 'Enter' && event.key !== 'Delete' &&
        event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'
    ) {
        event.preventDefault(); // Impide escribir caracteres no permitidos (incluida la 'e')
    }
});

edadInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, ''); // Limpia cualquier no-número al pegar
});
// --- Fin del comando ---

      // Agregar los elementos al contenedor del hijo
      hijoDiv.appendChild(nombreLabel);
      hijoDiv.appendChild(nombreInput);
      hijoDiv.appendChild(edadLabel);
      hijoDiv.appendChild(edadInput);

      // Agregar el contenedor del hijo al contenedor principal
      hijosContainerDiv.appendChild(hijoDiv);
    }
  }

  // Escuchar los cambios en el select "¿Tiene hijos?"
  tieneHijosSelect.addEventListener('change', toggleDatosHijos);

  // Escuchar los cambios en el select "¿Cuántos?"
  cantidadHijosSelect.addEventListener('change', actualizarCamposHijos);

  // Llamar a toggleDatosHijos inicialmente para manejar el estado inicial
  toggleDatosHijos(); // Importante!  Se asegura de que al cargar la página, el estado sea correcto.
});






// ... (Escolaridad) ...
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[name="estudiosRealizados"]');
    const seccionesEscolaridad = document.getElementById('seccionesEscolaridad');

// Función para crear un input de tipo date (AJUSTADA PARA QUE LOS ID SEAN CONSISTENTES)
function createDateInput(idPrefix, label, namePrefix) {
    // Aquí el ID ahora incluirá 'Inicio' para coincidir con el PDF
    return `
        <div class="form-group">
            <label for="${idPrefix}Inicio">${label}</label>
            <input type="date" id="${idPrefix}Inicio" name="${namePrefix}Inicio">
        </div>
    `;
}

const sections = {
    primaria: `
        <section>
            <h3>Sección de primaria</h3>
            <div class="form-group">
                <label for="nombrePrimaria">¿Nombre de tu primaria?</label>
                <input type="text" id="nombrePrimaria" name="nombrePrimaria">
            </div>
            <div class="form-group">
                <label for="direccionPrimaria">¿Dirección de tu primaria?</label>
                <input type="text" id="direccionPrimaria" name="direccionPrimaria">
            </div>
            ${createDateInput("periodoPrimaria", "¿Periodo en qué comenzaste tu primaria?", "periodoPrimaria")}
            <div class="form-group">
                <label for="anosPrimaria">¿Total de años cursados?</label>
                <select id="anosPrimaria" name="anosPrimaria">
                    <option value="">Selecciona</option> <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tituloPrimaria">¿Título recibido?</label>
                <select id="tituloPrimaria" name="tituloPrimaria">
                    <option value="Ninguno">Ninguno</option>
                    <option value="certificado">Certificado</option>
                    <option value="truncado">Truncado</option>
                </select>
            </div>
        </section>
    `,
    secundaria: `
        <section>
            <h3>Sección de secundaria</h3>
            <div class="form-group">
                <label for="nombreSecundaria">¿Nombre de tu secundaria?</label>
                <input type="text" id="nombreSecundaria" name="nombreSecundaria">
            </div>
            <div class="form-group">
                <label for="direccionSecundaria">¿Dirección de tu secundaria?</label>
                <input type="text" id="direccionSecundaria" name="direccionSecundaria">
            </div>
            ${createDateInput("periodoSecundaria", "¿Periodo en qué cursaste tu secundaria?", "periodoSecundaria")}
            <div class="form-group">
                <label for="anosSecundaria">¿Total de años cursados?</label>
                <select id="anosSecundaria" name="anosSecundaria">
                    <option value="">Selecciona</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tituloSecundaria">¿Título recibido?</label>
                <select id="tituloSecundaria" name="tituloSecundaria">
                    <option value="Ninguno">Ninguno</option>
                    <option value="certificado">Certificado</option>
                    <option value="truncado">Truncado</option>
                </select>
            </div>
        </section>
    `,
    preparatoria: `
        <section>
            <h3>Sección de preparatoria</h3>
            <div class="form-group">
                <label for="nombrePreparatoria">¿Nombre de tu preparatoria?</label>
                <input type="text" id="nombrePreparatoria" name="nombrePreparatoria">
            </div>
            <div class="form-group">
                <label for="direccionPreparatoria">¿Dirección de tu preparatoria?</label>
                <input type="text" id="direccionPreparatoria" name="direccionPreparatoria">
            </div>
            ${createDateInput("periodoPreparatoria", "¿Periodo en qué cursaste tu preparatoria?", "periodoPreparatoria")}
            <div class="form-group">
                <label for="anosPreparatoria">¿Total de años cursados?</label>
                <select id="anosPreparatoria" name="anosPreparatoria">
                    <option value="">Selecciona</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tituloPreparatoria">¿Título recibido?</label>
                <select id="tituloPreparatoria" name="tituloPreparatoria">
                    <option value="Ninguno">Ninguno</option>
                    <option value="certificado">Certificado</option>
                    <option value="truncado">Truncado</option>
                </select>
            </div>
        </section>
    `,
    universidad: `
        <section>
            <h3>Sección de universidad</h3>
            <div class="form-group">
                <label for="nombreUniversidad">¿Nombre de tu universidad?</label>
                <input type="text" id="nombreUniversidad" name="nombreUniversidad">
            </div>
            <div class="form-group">
                <label for="direccionUniversidad">¿Dirección de tu universidad?</label>
                <input type="text" id="direccionUniversidad" name="direccionUniversidad">
            </div>
            ${createDateInput("periodoUniversidad", "¿Periodo en qué cursaste tu universidad?", "periodoUniversidad")}
            <div class="form-group">
                <label for="anosUniversidad">¿Total de años cursados?</label>
                <select id="anosUniversidad" name="anosUniversidad">
                    <option value="">Selecciona</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tituloUniversidad">¿Título recibido?</label>
                <select id="tituloUniversidad" name="tituloUniversidad">
                    <option value="Ninguno">Ninguno</option>
                    <option value="truncado">Truncado</option>
                    <option value="Título/Profesión">Título/Profesión</option>
                    <option value="Título/Profesión+Cédula-profesional">Título/Profesión+Cédula-profesional</option>
                </select>
            </div>
        </section>
    `,
    adicionales: `
        <section>
            <h3>Sección institución de estudios adicionales</h3>
            <div class="form-group">
                <label for="nombreAdicionales">¿Nombre de la institución de estudio adicional?</label>
                <input type="text" id="nombreAdicionales" name="nombreAdicionales">
            </div>
            <div class="form-group">
                <label for="direccionAdicionales">¿Dirección de la institución de estudio adicional?</label>
                <input type="text" id="direccionAdicionales" name="direccionAdicionales">
            </div>
            ${createDateInput("periodoAdicionales", "¿Periodo en qué cursaste la institución de estudio adicional?", "periodoAdicionales")}
            <div class="form-group">
                <label for="anosAdicionales">¿Total de años cursados?</label>
                <select id="anosAdicionales" name="anosAdicionales">
                    <option value="">Selecciona</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tituloAdicionales">¿Título recibido?</label>
                <select id="tituloAdicionales" name="tituloAdicionales">
                    <option value="Ninguno">Ninguno</option>
                    <option value="Truncado">Truncado</option>
                    <option value="Certificado">Certificado</option>
                    <option value="Diploma/Certificado">Diploma/Certificado</option>
                </select>
            </div>
        </section>
    `,
};

    function updateSections() {
        seccionesEscolaridad.innerHTML = '';
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                seccionesEscolaridad.innerHTML += sections[checkbox.value];
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSections);
    });

    // Estudios actuales
    const estudiaSi = document.getElementById('estudiaSi');
    const estudiaNo = document.getElementById('estudiaNo');
    const seccionEstudiosActuales = document.getElementById('seccionEstudiosActuales');
    seccionEstudiosActuales.style.display = 'none'; // Ocultar por defecto

    estudiaSi.addEventListener('change', function () {
        seccionEstudiosActuales.style.display = 'block';
    });

    estudiaNo.addEventListener('change', function () {
        seccionEstudiosActuales.style.display = 'none';
    });

    // Llama a la función al cargar la página para establecer el estado inicial
    // en caso de que un radio button ya esté seleccionado (ej. al recargar con datos).
    // Esto es importante para que la sección se muestre si 'Sí' ya estaba marcado.
    // También, si tienes el style="display: none;" en el HTML, esto asegurará que inicie oculto.
    if (estudiaSi.checked) {
        seccionEstudiosActuales.style.display = 'block';
    } else {
        seccionEstudiosActuales.style.display = 'none';
    }
})






// Función para generar las secciones de empleo
document.addEventListener('DOMContentLoaded', function () {
    function generarSeccionEmpleo(numero) {
        // Usar números del 1 al 4 para coincidir con el PDF
        const empleo = numero;
        
        // Determinar el tipo de empleo para el título
        let tipoEmpleo;
        switch (numero) {
            case 1:
                tipoEmpleo = "Actual o Reciente";
                break;
            case 2:
                tipoEmpleo = "Anterior";
                break;
            case 3:
                tipoEmpleo = "Penúltimo";
                break;
            case 4:
                tipoEmpleo = "Antepenúltimo";
                break;
        }
        
        return `
            <section>
                <h3>Empleo ${tipoEmpleo}</h3>
                <div class="form-group">
                    <label for="nombreEmpresa${empleo}">¿Nombre de la empresa?</label>
                    <input type="text" id="nombreEmpresa${empleo}" name="nombreEmpresa${empleo}">
                </div>
                <div class="form-group">
                    <label>¿Tiempo que prestó sus servicios?</label>
                    <div class="fechas">
                        <label for="fechaIngreso${empleo}">Fecha de ingreso:</label>
                        <input type="date" id="fechaIngreso${empleo}" name="fechaIngreso${empleo}">

                        <label for="fechaRenuncia${empleo}">Fecha de renuncia:</label>
                        <input type="date" id="fechaRenuncia${empleo}" name="fechaRenuncia${empleo}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="direccionEmpresa${empleo}">¿Dirección de la empresa?</label>
                    <input type="text" id="direccionEmpresa${empleo}" name="direccionEmpresa${empleo}">
                </div>
                <div class="form-group">
                    <label for="telefonoEmpresa${empleo}">¿Teléfono de la empresa?</label>
                    <input type="tel" id="telefonoEmpresa${empleo}" name="telefonoEmpresa${empleo}" pattern="[0-9]{10}" inputmode="numeric" maxlength="10" class="solo-numeros">
                </div>
                <div class="form-group">
                    <label for="puestoDesempenado${empleo}">¿Puesto que desempeñaste?</label>
                    <input type="text" id="puestoDesempenado${empleo}" name="puestoDesempenado${empleo}">
                </div>
                <div class="form-group sueldo-container">
                    <label for="sueldoGanabas${empleo}">¿Sueldo que ganabas?</label>
                    <input type="text" id="sueldoGanabas${empleo}" name="sueldoGanabas${empleo}" class="sueldo" inputmode="numeric" pattern="[0-9,.]*" placeholder="$">
                </div>
                <div class="form-group">
                    <label for="motivoSeparacion${empleo}">¿Motivo de tu separación de la empresa?</label>
                    <select id="motivoSeparacion${empleo}" name="motivoSeparacion${empleo}">
                        <option value="">Seleccione un motivo</option>
                        <option value="sueldo">Sueldo</option>
                        <option value="sinCrecimiento">Sin crecimiento</option>
                        <option value="ambienteLaboral">Ambiente laboral</option>
                        <option value="renunciaForzada">Renuncia forzada</option>
                        <option value="cortePersonal">Corte de personal</option>
                        <option value="renunciaVoluntaria">Renuncia voluntaria</option>
                        <option value="renunciaConspiracion">Renuncia por conspiración</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nombreJefe${empleo}">¿Nombre de tu jefe directo?</label>
                    <input type="text" id="nombreJefe${empleo}" name="nombreJefe${empleo}">
                </div>
                <div class="form-group">
                    <label for="puestoJefe${empleo}">¿Puesto de tu jefe directo?</label>
                    <select id="puestoJefe${empleo}" name="puestoJefe${empleo}">
                        <option value="">Seleccione un puesto</option>
                        <option value="encargadoTurno">Encargado de turno</option>
                        <option value="jefeLinea">Jefe de línea</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="rh">RH</option>
                        <option value="copropietario">Copropietario</option>
                        <option value="duenoPropietario">Dueño y propietario</option>
                    </select>
                </div>
            </section>
        `;
    }

    const cantidadEmpleosSelect = document.getElementById('cantidadEmpleos');
    const seccionesEmpleoDiv = document.getElementById('seccionesEmpleo');
    const informesEmpresasSelect = document.getElementById('informesEmpresas');
    const razonNoInformesDiv = document.getElementById('razonNoInformes');

    function actualizarSeccionesEmpleo() {
        const cantidad = parseInt(cantidadEmpleosSelect.value);
        seccionesEmpleoDiv.innerHTML = ''; // Limpiar las secciones existentes

        // Generar empleos del 1 al 4 según la cantidad seleccionada
        for (let i = 1; i <= cantidad; i++) {
            seccionesEmpleoDiv.innerHTML += generarSeccionEmpleo(i);
        }
        
        // Después de crear las secciones, aplicar la restricción de números al teléfono y el formato de moneda al sueldo
        restringirInputNumerico();
        formatearCamposSueldo();
    }

    // Resto de las funciones permanecen igual...
    function restringirInputNumerico() {
        const soloNumerosInputs = document.querySelectorAll('.solo-numeros');
        soloNumerosInputs.forEach(input => {
            input.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        });
    }

    function formatearCamposSueldo() {
        const sueldoInputs = document.querySelectorAll('.sueldo');
        sueldoInputs.forEach(input => {
            input.addEventListener('input', function (e) {
                let value = e.target.value;
                value = value.replace(/[^\d.]/g, '');

                const decimalCount = value.split('.').length - 1;
                if (decimalCount > 1) {
                    value = value.substring(0, value.lastIndexOf('.'));
                }

                let [integerPart, decimalPart] = value.split('.');
                integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                value = integerPart + (decimalPart ? '.' + decimalPart : '');
                
                if (!value.startsWith('$') && value.length > 0) {
                    value = '$ ' + value;
                }

                e.target.value = value;
            });
        });
    }

    cantidadEmpleosSelect.addEventListener('change', actualizarSeccionesEmpleo);
    actualizarSeccionesEmpleo();

    if (informesEmpresasSelect) {
        informesEmpresasSelect.addEventListener('change', function () {
            if (this.value === 'no') {
                razonNoInformesDiv.style.display = 'block';
            } else {
                razonNoInformesDiv.style.display = 'none';
            }
        });
    }
});






// Función para generar la sección de Referencias Personales
document.addEventListener('DOMContentLoaded', function () {
  function generarSeccionReferencia(numero) {
    return `
      <section>
        <h3>Referencia ${numero}</h3>
        <div class="form-group">
          <label for="nombreReferencia${numero}">¿Nombre de tu referencia?</label>
          <input type="text" id="nombreReferencia${numero}" name="nombreReferencia${numero}">
        </div>
        <div class="form-group">
          <label>¿Domicilio de tu referencia?</label>
          <div class="direccion">
            <input type="text" id="calleReferencia${numero}" name="calleReferencia${numero}" placeholder="Calle">
            <input type="text" id="coloniaReferencia${numero}" name="coloniaReferencia${numero}" placeholder="Colonia">
          </div>
        </div>
        <div class="form-group">
          <label for="telefonoReferencia${numero}">¿Teléfono de tu referencia?</label>
          <input type="tel" id="telefonoReferencia${numero}" name="telefonoReferencia${numero}" maxlength="10" inputmode="tel">
          <span id="contadorTelefono${numero}">0/10</span>
        </div>
        <div class="form-group">
          <label for="ocupacionReferencia${numero}">¿Ocupación de tu referencia?</label>
          <input type="text" id="ocupacionReferencia${numero}" name="ocupacionReferencia${numero}">
        </div>
        <div class="form-group">
          <label for="tiempoConocerlo${numero}">¿Tiempo de conocerlo (años)?</label>
          <input type="number" id="tiempoConocerlo${numero}" name="tiempoConocerlo${numero}" maxlength="2" size="2">
          <span id="contadorTiempoConocerlo${numero}">0/2</span>
        </div>
      </section>
    `;
  }

  // REFERENCIAS PERSONALES
  const cantidadReferenciasSelect = document.getElementById('cantidadReferencias');
  const seccionesReferenciasDiv = document.getElementById('seccionesReferencias');

  function actualizarSeccionesReferencias() {
    const cantidad = parseInt(cantidadReferenciasSelect.value);
    seccionesReferenciasDiv.innerHTML = ''; // Limpiar las secciones existentes

    for (let i = 1; i <= cantidad; i++) {
      // Inserta el HTML de la sección de referencia
      seccionesReferenciasDiv.innerHTML += generarSeccionReferencia(i);
    }

    // Una vez que todas las secciones han sido agregadas al DOM,
    // adjunta los event listeners a CADA UNO de los elementos
    for (let i = 1; i <= cantidad; i++) {
      const telefonoInput = document.getElementById(`telefonoReferencia${i}`);
      const contadorTelefono = document.getElementById(`contadorTelefono${i}`);

      if (telefonoInput && contadorTelefono) { // Asegurarse de que los elementos existen
        telefonoInput.addEventListener('input', function (e) {
          const valor = e.target.value;
          // Validar para permitir solo números
          e.target.value = valor.replace(/[^0-9]/g, '');
          const longitud = e.target.value.length; // Usa la longitud del valor ya filtrado
          contadorTelefono.textContent = `${longitud}/10`;
          if (longitud > 10) {
            e.target.value = e.target.value.substring(0, 10);
            contadorTelefono.textContent = `10/10`; // Ajustar el contador si se corta
          }
        });
      }

      const tiempoConocerloInput = document.getElementById(`tiempoConocerlo${i}`);
      const contadorTiempoConocerlo = document.getElementById(`contadorTiempoConocerlo${i}`);

      if (tiempoConocerloInput && contadorTiempoConocerlo) { // Asegurarse de que los elementos existen
        tiempoConocerloInput.addEventListener('input', function (e) {
          const valor = e.target.value;
          // Validar para permitir solo números
          e.target.value = valor.replace(/[^0-9]/g, '');
          const longitud = e.target.value.length; // Usa la longitud del valor ya filtrado
          contadorTiempoConocerlo.textContent = `${longitud}/2`;
          if (longitud > 2) {
            e.target.value = e.target.value.substring(0, 2);
            contadorTiempoConocerlo.textContent = `2/2`; // Ajustar el contador si se corta
          }
        });
      }
    }
  }

  cantidadReferenciasSelect.addEventListener('change', actualizarSeccionesReferencias);

  // Inicializar las secciones de referencias al cargar la página
  actualizarSeccionesReferencias();
});






// ... (Tu código JavaScript existente, por ejemplo, el del menú flotante, etc.) ...

document.addEventListener('DOMContentLoaded', function () {
    // ... (El resto de tu código DOMContentLoaded existente, como el del menú) ...

    // --- Lógica para la sección de Datos Generales (preguntas Sí/No) ---

    // Función genérica para manejar la visibilidad basada en radio buttons
    // Esta función mostrará el div condicional si el radio 'si' está marcado
    const setupToggleLogic = (radioName, targetId) => {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const targetDiv = document.getElementById(targetId);

        if (!targetDiv) return; // Salir si el div condicional no existe

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (document.getElementById(`${radioName}Si`) && document.getElementById(`${radioName}Si`).checked) {
                    targetDiv.classList.remove('oculto');
                } else {
                    targetDiv.classList.add('oculto');
                }
            });
        });

        // Estado inicial al cargar la página
        if (document.getElementById(`${radioName}Si`) && document.getElementById(`${radioName}Si`).checked) {
            targetDiv.classList.remove('oculto');
        } else {
            targetDiv.classList.add('oculto');
        }
    };

    // Función genérica para manejar la visibilidad basada en radio buttons (INVERSA)
    // Esta función mostrará el div condicional si el radio 'no' está marcado
    const setupToggleLogicInverse = (radioName, targetId) => {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const targetDiv = document.getElementById(targetId);

        if (!targetDiv) return; // Salir si el div condicional no existe

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (document.getElementById(`${radioName}No`) && document.getElementById(`${radioName}No`).checked) {
                    targetDiv.classList.remove('oculto');
                } else {
                    targetDiv.classList.add('oculto');
                }
            });
        });

        // Estado inicial al cargar la página
        if (document.getElementById(`${radioName}No`) && document.getElementById(`${radioName}No`).checked) {
            targetDiv.classList.remove('oculto');
        } else {
            targetDiv.classList.add('oculto');
        }
    };

    // Aplica la lógica a cada grupo de radio/div condicional (directa)
    setupToggleLogic('pariente', 'divNombrePariente');
    setupToggleLogic('afianzado', 'divNombreEntidadAfianzadora');
    setupToggleLogic('sindicato', 'divNombreSindicato');
    setupToggleLogic('seguroVida', 'divSeguroVida');

    // Aplica la lógica inversa para 'no viajar' y 'no cambiar residencia'
    setupToggleLogicInverse('puedeViajar', 'divRazonesViaje');
    setupToggleLogicInverse('cambioResidencia', 'divRazonesResidencia');

    // --- FIN Lógica para la sección de Datos Generales ---

    // ... (El resto de tu código DOMContentLoaded existente, como la lógica de referencias personales) ...
});





// Este JavaScript se encarga de mostrar/ocultar las secciones adicionales.
        // Función genérica para mostrar/ocultar divs
document.addEventListener('DOMContentLoaded', function() {
  function toggleDiv(radioName, divId) {
    const radios = document.querySelectorAll(`input[name="${radioName}"]`);
    const div = document.getElementById(divId);

    radios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'si') {
          div.style.display = 'block';
        } else {
          div.style.display = 'none';
        }
      });
    });
  }

  // Llamadas a la función toggleDiv para cada pregunta
  toggleDiv('otros_ingresos', 'ingresos_importe');
  toggleDiv('conyuge_trabaja', 'conyuge_info');
  toggleDiv('vive_casa', 'casa_valor');
  toggleDiv('paga_renta', 'renta_monto');
  toggleDiv('tiene_auto', 'auto_valor');
  toggleDiv('tiene_deudas', 'deudas_info');

  // Puedes agregar aquí la lógica para manejar el envío del formulario
  document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    // Aquí puedes recopilar los datos del formulario y hacer algo con ellos (enviarlos por AJAX, etc.)
    console.log("Formulario Enviado (simulado)");
  });
  });






// ===============================
// *Generación del Documento PDF*
// Aquí abajo van a ir todas las funciones directrices y eventos relacionados con la creación del documento PDF.
// ===============================
function generarPDF() {
    console.log("Intentando generar PDF...");

    // Verificar si jsPDF está disponible
    if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
        console.error("Error: La librería jsPDF no está cargada o no se encontró.");
        alert("Error al generar el PDF. La librería necesaria no está disponible.");
        return;
    }

    const { jsPDF } = jspdf; // Acceder a jsPDF desde el objeto global jspdf
    const doc = new jsPDF({
        orientation: 'p', // 'portrait'
        unit: 'mm',
        format: 'letter' // Tamaño carta
    });

    // ===============================
    // MARGEN DEL DOCUMENTO
    // ===============================
    // --- Constantes y Configuraciones del PDF ---
    const margin = 10; // Margen reducido para más espacio
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);

     // --- La Partícula de Dios: currentY declarado UNA SOLA VEZ para todo el documento ---
    let currentY = margin; // Posición Y actual, se incrementará al añadir contenido

    // --- Estilos ---
    const FONT_NORMAL = "helvetica";
    const FONT_BOLD = "helvetica";
    const COLOR_TEXT = "#495057";
    const COLOR_LABEL = "#495057";
    const COLOR_HEADER_BG = document.getElementById('colorPicker')?.value || "#93c55d";
    const COLOR_HEADER_TEXT = document.getElementById('headerPreview')?.style.color || "white";
    const FONT_SIZE_TITLE = 16;
    const FONT_SIZE_H2 = 10;
    const FONT_SIZE_H3 = 10;
    const FONT_SIZE_NORMAL = 8;
    const FONT_SIZE_SMALL = 7;
    const LINE_HEIGHT_NORMAL = 4; // Esta constante define la altura normal del espaciado entre renglones (líneas) en el PDF, útil para mantener una distancia consistente entre los campos de texto.

    // --- Nuevas Constantes para Posicionamiento Dinámico en Cabecera ---
    const PHOTO_FIXED_WIDTH = 20;
    const HEADER_FIELD_SPACING = 5;
    const HEADER_LEFT_MARGIN = margin + 1;

    // --- Constante para datos no ingresados ---
    const NO_DATA_TEXT = "Sin datos ingresados";
    

    // --- Funciones Auxiliares para PDF ---

    // Añadir texto con salto de línea automático y manejo de Y
    function addText(text, x, y, options = {}) {
        const { fontSize = FONT_SIZE_NORMAL, fontStyle = 'normal', align = 'left', maxWidth = contentWidth, color = COLOR_TEXT } = options;
        doc.setFontSize(fontSize);
        doc.setFont(FONT_NORMAL, fontStyle);
        doc.setTextColor(color);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y, { align: align });
        return y + (lines.length * (fontSize / 1)); // Aproximación del alto del texto (ajustar si es necesario)
    }

    // Añadir un par Label: Valor
    function addLabelValue(label, value, x, y, labelWidth = 40, valueMaxWidth = contentWidth - x - labelWidth - 2) {
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL);
        doc.setTextColor(COLOR_LABEL);
        doc.text(label + ":", x, y + LINE_HEIGHT_NORMAL);

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setTextColor(COLOR_TEXT);
        const valueLines = doc.splitTextToSize(String(value || NO_DATA_TEXT), valueMaxWidth); // Usar NO_DATA_TEXT si está vacío
        doc.text(valueLines, x + labelWidth, y + LINE_HEIGHT_NORMAL);

        // Devuelve la posición Y después de añadir el valor (considerando múltiples líneas)
        return y + (valueLines.length * LINE_HEIGHT_NORMAL);
    }

    // Añadir Título de Sección H2
    function addSectionTitle(title, y) {
        doc.setFontSize(FONT_SIZE_H2);
        doc.setFont(FONT_BOLD, 'bold');
        doc.setTextColor(COLOR_TEXT);
        doc.text(title, margin, y + 2); // Espacio fijo para el título
        // Línea divisoria debajo del título
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y + 3.5, pageWidth - margin, y + 3.5);
        return y + 5; // **ESTA LÍNEA ES ESENCIAL Y SE HABÍA PERDIDO O MOVIDO**
    }

    // --- Contenido del PDF ---

    // ===============================
    // Membrete: (20 mm de altura)
    // ===============================
    const MEMBRETE_HEIGHT = 23;

    doc.setFillColor(COLOR_HEADER_BG);
    doc.rect(margin, currentY, contentWidth, MEMBRETE_HEIGHT, 'F'); // Rectángulo de cabecera con altura fija

    doc.setFontSize(FONT_SIZE_TITLE);
    doc.setFont(FONT_BOLD, 'bold');
    doc.setTextColor(COLOR_HEADER_TEXT);
    doc.text("SOLICITUD DE EMPLEO 2025", margin + 5, currentY + 8);

    // --- Datos de Aspiración Laboral en la cabecera - POSICIONAMIENTO DINÁMICO ---
    doc.setFontSize(FONT_SIZE_SMALL);
    doc.setTextColor(COLOR_HEADER_TEXT);
    let currentXHeaderFields = HEADER_LEFT_MARGIN;

    // --- Fecha ---
    const fechaCabecera = document.getElementById('fecha')?.value || NO_DATA_TEXT;
    const fechaText = `Fecha: ${fechaCabecera}`;
    const fechaWidth = doc.getTextWidth(fechaText, { fontSize: FONT_SIZE_SMALL, fontName: FONT_NORMAL, fontStyle: 'normal' });
    doc.text(fechaText, currentXHeaderFields, currentY + 15);
    currentXHeaderFields += fechaWidth + HEADER_FIELD_SPACING;

    // --- Puesto Solicitado ---
    const puestoCabecera = document.getElementById('puesto')?.value || NO_DATA_TEXT;
    const puestoText = `Puesto Solicitado: ${puestoCabecera}`;
    const puestoWidth = doc.getTextWidth(puestoText, { fontSize: FONT_SIZE_SMALL, fontName: FONT_NORMAL, fontStyle: 'normal' });
    doc.text(puestoText, currentXHeaderFields, currentY + 15);
    currentXHeaderFields += puestoWidth + HEADER_FIELD_SPACING;

    // --- Sueldo Deseado ---
    const sueldoCabecera = document.getElementById('sueldo_mensual_deseado')?.value || NO_DATA_TEXT;
    const sueldoText = `Sueldo Deseado: ${sueldoCabecera}`;
    const availableWidthForSueldo = pageWidth - margin - PHOTO_FIXED_WIDTH - currentXHeaderFields - HEADER_FIELD_SPACING;
    doc.text(sueldoText, currentXHeaderFields, currentY + 15, { maxWidth: availableWidthForSueldo > 0 ? availableWidthForSueldo : 0 });

    currentY += MEMBRETE_HEIGHT; // Actualizar currentY sumando la altura FIJA del membrete

    // ===============================
// Contorno Sutil Debajo del Membrete
// ===============================
const CONTOUR_HEIGHT = 5; // Altura del contorno rectangular

// === CAMBIO CLAVE AQUÍ: Define un color para "hacerlo invisible" o visible ===
// Establece el color de la línea a blanco para que se "funda" con el fondo del PDF
// O a otro color (ej. un gris claro como 200, 200, 200) para que sea sutilmente visible.
const CONTOUR_DRAW_COLOR = [255, 255, 255]; // Blanco puro (RGB) para invisibilidad
// const CONTOUR_DRAW_COLOR = [200, 200, 200]; // Un gris claro para hacerlo sutil
// const CONTOUR_DRAW_COLOR = COLOR_TEXT; // Para usar el color de texto normal si quieres que sea visible

// Guardar el estado gráfico actual para restaurarlo después (buena práctica general)
doc.saveGraphicsState();

// Establecer el color de la línea
doc.setDrawColor(CONTOUR_DRAW_COLOR[0], CONTOUR_DRAW_COLOR[1], CONTOUR_DRAW_COLOR[2]); // Usamos RGB

// Establecer el ancho de la línea (puede ser muy delgado para un efecto sutil si es visible, o cualquier valor si es blanco)
doc.setLineWidth(0.1); // Puedes ajustar este grosor si el contorno es visible

// Dibujar el contorno rectangular
doc.rect(margin, currentY, contentWidth, CONTOUR_HEIGHT, 'S'); // 'S' para stroke (contorno)

// Restaurar el estado gráfico original para que el resto del documento no se vea afectado
doc.restoreGraphicsState();

currentY += CONTOUR_HEIGHT; // Actualizar currentY sumando la altura del contorno

// ===============================
// Constelación 1: Datos Personales (35 mm de altura)
// ===============================
const DATOS_PERSONALES_HEIGHT = 45; // Altura fija de 35mm
let datosPersonalesStartY = currentY; // Guardamos el inicio de esta sección (que ya viene del contorno)

currentY = addSectionTitle("Datos Personales", currentY);
let col1X = margin;
let col2X = margin + (contentWidth / 2) + 5; // Segunda columna
let startYContent = currentY; // Y para el contenido real después del título de sección

// Aseguramos que las columnas empiecen desde el mismo Y,
// que es 'startYContent' después del título de la sección.
let y1 = startYContent;
y1 = addLabelValue("Apellido Paterno", document.getElementById('apellidoPaterno')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Apellido Materno", document.getElementById('apellidoMaterno')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Nombre(s)", document.getElementById('nombres')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Edad", document.getElementById('Edad')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Sexo", document.getElementById('sexo')?.value || NO_DATA_TEXT, col1X, y1);
const dobD = document.getElementById('diaNacimiento')?.value || NO_DATA_TEXT;
const dobM = document.getElementById('mesNacimiento')?.options[document.getElementById('mesNacimiento')?.selectedIndex]?.text || NO_DATA_TEXT;
const dobA = document.getElementById('anioNacimiento')?.value || NO_DATA_TEXT;
y1 = addLabelValue("Fecha Nacimiento", `${dobD}-${dobM}-${dobA}`, col1X, y1);
y1 = addLabelValue("Lugar Nacimiento", `${document.getElementById('ciudadNacimiento')?.value || NO_DATA_TEXT}, ${document.getElementById('estadoNacimiento')?.value || NO_DATA_TEXT}`, col1X, y1);
y1 = addLabelValue("Nacionalidad", document.getElementById('nacionalidad')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Dirección", document.getElementById('direccion')?.value || NO_DATA_TEXT, col1X, y1, 40);

let y2 = startYContent; // También la inicializamos con startYContent
y2 = addLabelValue("Colonia", document.getElementById('colonia')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Código Postal", document.getElementById('codigoPostal')?.value || NO_DATA_TEXT, col2X, y2, 30);
const tel = `(${(document.getElementById('codigoPais')?.value || NO_DATA_TEXT)}) ${document.getElementById('telefono')?.value || NO_DATA_TEXT}`;
y2 = addLabelValue("Teléfono", tel, col2X, y2, 30);
y2 = addLabelValue("Correo Electrónico", document.getElementById('emailPersonal')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Estado Civil", document.getElementById('estadoCivil')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Vive con", document.getElementById('viveCon')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Dependientes", document.getElementById('dependientes')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Estatura (cm)", document.getElementById('estatura')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Peso (kg)", document.getElementById('peso')?.value || NO_DATA_TEXT, col2X, y2, 30);

// Después de dibujar todo el contenido de la sección:
// Actualizar currentY con la posición inicial de la sección más su altura FIJA deseada.
currentY = datosPersonalesStartY + DATOS_PERSONALES_HEIGHT;

// ===============================
// Constelación 2: Documentación
// ===============================
const DOCUMENTACION_HEIGHT = 27;
let documentacionStartY = currentY;

// Título de la sección
currentY = addSectionTitle("Documentación", currentY);

// Coordenadas Y iniciales para las columnas
let docY1 = currentY;
let docY2 = currentY;

// Primera columna
docY1 = addLabelValue("NSS", document.getElementById('nss')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("RFC", document.getElementById('rfc')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("CURP", document.getElementById('curp')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("AFORE", document.getElementById('afore')?.value || NO_DATA_TEXT, col1X, docY1);

// Segunda columna
docY2 = addLabelValue("Cartilla Militar", document.getElementById('cartilla')?.value || NO_DATA_TEXT, col2X, docY2, 45);
docY2 = addLabelValue("Pasaporte", document.getElementById('pasaporte')?.value || NO_DATA_TEXT, col2X, docY2, 45);
const licenciaTexto = document.getElementById('licenciaManejo')?.value === 'si'
    ? `Sí - ${document.getElementById('claseLicencia')?.value || NO_DATA_TEXT}`
    : NO_DATA_TEXT;
docY2 = addLabelValue("Licencia de Manejo", licenciaTexto, col2X, docY2, 45);
docY2 = addLabelValue("Documento Extranjero", document.getElementById('documentoExtranjero')?.value || NO_DATA_TEXT, col2X, docY2, 45);

// Al final de la sección Documentación, después de dibujar todo el contenido:
currentY = documentacionStartY + DOCUMENTACION_HEIGHT;

// ===============================
// Constelación 3: Estado de Salud y Hábitos Personales (25 mm de altura)
// ===============================
const SALUD_HABITOS_HEIGHT = 23;
let saludHabitosStartY = currentY;

currentY = addSectionTitle("Estado de Salud y Hábitos Personales", currentY);
startYContent = currentY;

// Primera columna
y1 = startYContent;
y1 = addLabelValue("Estado Salud Actual", document.getElementById('estadoSalud')?.value || NO_DATA_TEXT, col1X, y1);
const enfCronica = document.querySelector('input[name="enfermedadCronica"]:checked')?.value === 'si' 
    ? `Sí - ${document.getElementById('cualEnfermedad')?.value || NO_DATA_TEXT}` 
    : document.querySelector('input[name="enfermedadCronica"]:checked')?.value === 'no' 
    ? 'No' 
    : NO_DATA_TEXT;
y1 = addLabelValue("Enfermedad Crónica", enfCronica, col1X, y1);
y1 = addLabelValue("Deporte", document.getElementById('deportePractica')?.value || NO_DATA_TEXT, col1X, y1);

// Segunda columna
y2 = startYContent;
const club = document.getElementById('clubSocial')?.value === 'si' 
    ? `Sí - ${document.getElementById('nombreClub')?.value || NO_DATA_TEXT}` 
    : document.getElementById('clubSocial')?.value === 'no' 
    ? 'No' 
    : NO_DATA_TEXT;
y2 = addLabelValue("Club Social/Deportivo", club, col2X, y2, 45);
y2 = addLabelValue("Pasatiempo", document.getElementById('pasatiempo')?.value || NO_DATA_TEXT, col2X, y2, 45);
y2 = addLabelValue("Metas en la vida", document.getElementById('metaVida')?.value || NO_DATA_TEXT, col2X, y2, 45);

currentY = saludHabitosStartY + SALUD_HABITOS_HEIGHT; // Actualizar Y con la altura FIJA de la sección

// ===============================
// Constelación 4: Datos Familiares
// ===============================
const DATOS_FAMILIARES_HEIGHT = 34; // Altura estimada para esta sección
let datosFamiliaresStartY = currentY;

currentY = addSectionTitle("Datos Familiares", currentY);
let contentStartY = currentY + 2; // Espacio entre TITULO LINEA-DIV Y ENCABEZADOS
currentY = contentStartY;

// --- Configuraciones de Texto y Espaciado ---
const labelFontSize = FONT_SIZE_NORMAL;
const headerFontSize = FONT_SIZE_H3 - 1;
const contentFontSize = FONT_SIZE_NORMAL - 1;
const contentLineHeight = LINE_HEIGHT_NORMAL;
const rowVerticalSpacing = 1.5;
const columnSpacing = 4;
const siTextColor = '#28a745';
const noTextColor = '#dc3545';
const userDataColor = '#495057';
const labelColor = COLOR_TEXT;
const crossSymbol = "✝";
const MIN_COL_WIDTH = 10;
const SECTION_SPACING = 3; // Espaciado al final de la sección

// --- === CONFIGURACIÓN MANUAL DE POSICIONES HORIZONTALES (X) === ---
const col1_NombresX = margin;
const col2_ViveX = margin + 55;
const col3_DireccionX = margin + 73;
const col4_TelefonoX = margin + 135;
const col5_OcupacionX = margin + 165;

const endX = margin + contentWidth;

// --- Función segura para calcular MaxWidth ---
function calculateSafeMaxWidth(startX, nextX, defaultWidth = contentWidth) {
    if (isNaN(nextX) || nextX <= startX + columnSpacing) {
        const remainingWidth = endX - startX - columnSpacing;
        return Math.max(MIN_COL_WIDTH, remainingWidth > 0 ? remainingWidth : defaultWidth);
    }
    const calculatedWidth = nextX - startX - columnSpacing;
    return Math.max(MIN_COL_WIDTH, calculatedWidth);
}

// --- Preparar Datos a Mostrar (con manejo de "Sin datos ingresados") ---
const familiares = [
    { // Padre
        nombre: document.getElementById('nombrePadre')?.value || NO_DATA_TEXT,
        vive: document.getElementById('vivePadre')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('callePadre')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaPadre')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoPadre')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionPadre')?.value || NO_DATA_TEXT
    },
    { // Madre
        nombre: document.getElementById('nombreMadre')?.value || NO_DATA_TEXT,
        vive: document.getElementById('viveMadre')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('calleMadre')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaMadre')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoMadre')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionMadre')?.value || NO_DATA_TEXT
    },
    { // Esposo/a
        nombre: document.getElementById('nombreConyuge')?.value || NO_DATA_TEXT,
        vive: document.getElementById('viveConyuge')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('calleConyuge')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaConyuge')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoConyuge')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionConyuge')?.value || NO_DATA_TEXT
    }
];
const rowLabels = ["Padre", "Madre", "Esposa (o)"];

try {
    // --- 1. Dibujar Cabeceras Conceptuales (Texto) ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(headerFontSize);
    doc.setTextColor(labelColor);
    doc.text("NOMBRES:", col1_NombresX, currentY);
    doc.text("¿VIVE?", col2_ViveX, currentY);
    doc.text("DIRECCIÓN:", col3_DireccionX, currentY);
    doc.text("TELÉFONO:", col4_TelefonoX, currentY);
    doc.text("OCUPACIÓN:", col5_OcupacionX, currentY);

    currentY += contentLineHeight + rowVerticalSpacing; // Añadir espaciado después de cabeceras

    // --- 2. Dibujar Datos de Familiares (Padre, Madre, Esposo/a) ---
    for (let i = 0; i < familiares.length; i++) {
        const familiar = familiares[i];
        const label = `${rowLabels[i]}:`;
        let rowStartY = currentY;
        let maxTextHeightThisRow = 0;

        // --- Columna 1: Etiqueta y Nombre ---
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(labelFontSize);
        doc.setTextColor(labelColor);
        doc.text(label, col1_NombresX, currentY);
        const labelWidth = doc.getTextWidth(label);
        const nombreStartX = col1_NombresX + labelWidth + columnSpacing;
        const nombreMaxWidth = calculateSafeMaxWidth(nombreStartX, col2_ViveX);
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const nombreText = familiar.nombre;
        const nombreLines = doc.splitTextToSize(nombreText, nombreMaxWidth);
        doc.text(nombreLines, nombreStartX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, nombreLines.length * contentLineHeight);

        // --- Columna 2: ¿Vive? (Sí/No/Círculo Rojo) ---
doc.setFont(FONT_BOLD, 'bold');
doc.setFontSize(contentFontSize);

// Obtener el valor original del select según la fila actual
let viveValue = '';
if (i === 0) { // Padre
    viveValue = document.getElementById('vivePadre')?.value;
} else if (i === 1) { // Madre
    viveValue = document.getElementById('viveMadre')?.value;
} else if (i === 2) { // Cónyuge
    viveValue = document.getElementById('viveConyuge')?.value;
}

if (viveValue === 'si') {
    // Usuario seleccionó "Sí"
    doc.setTextColor(siTextColor);
    const viveText = "Sí";
    const viveTextWidth = doc.getTextWidth(viveText);
    let finalViveTextX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= viveTextWidth + 2) {
        finalViveTextX = col2_ViveX + (viveAreaWidth / 2) - (viveTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalViveTextX = col2_ViveX + 2;
    }
    doc.text(viveText, finalViveTextX, currentY);
} else if (viveValue === 'no') {
    // Usuario seleccionó "No"
    doc.setTextColor(noTextColor);
    const viveText = "No";
    const viveTextWidth = doc.getTextWidth(viveText);
    let finalViveTextX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= viveTextWidth + 2) {
        finalViveTextX = col2_ViveX + (viveAreaWidth / 2) - (viveTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalViveTextX = col2_ViveX + 2;
    }
    doc.text(viveText, finalViveTextX, currentY);
} else {
    // Usuario no seleccionó nada - GUIÓN
    doc.setTextColor(noTextColor); // Mantener color rojo para que destaque
    const guionText = "-";
    const guionTextWidth = doc.getTextWidth(guionText);
    let finalGuionX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= guionTextWidth + 2) {
        finalGuionX = col2_ViveX + (viveAreaWidth / 2) - (guionTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalGuionX = col2_ViveX + 2;
    }
    doc.text(guionText, finalGuionX, currentY);
}
maxTextHeightThisRow = Math.max(maxTextHeightThisRow, contentLineHeight);

        // --- Columna 3: Dirección ---
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const direccionText = familiar.direccion;
        const direccionMaxWidth = calculateSafeMaxWidth(col3_DireccionX, col4_TelefonoX);
        const direccionLines = doc.splitTextToSize(direccionText, direccionMaxWidth);
        doc.text(direccionLines, col3_DireccionX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, direccionLines.length * contentLineHeight);

        // --- Columna 4: Teléfono ---
        let telefonoText = '';
        let telefonoColor = userDataColor;
        const isEmptyPhone = !familiar.telefono || familiar.telefono.trim() === '' || familiar.telefono.trim() === NO_DATA_TEXT || familiar.telefono.trim() === '-';
        if (!familiar.vive && isEmptyPhone) { // Si no vive Y no hay teléfono, mostrar cruz
            telefonoText = crossSymbol;
            telefonoColor = labelColor;
        } else {
            telefonoText = familiar.telefono; // Ya viene con NO_DATA_TEXT si estaba vacío
        }
        doc.setTextColor(telefonoColor);
        const telefonoMaxWidth = calculateSafeMaxWidth(col4_TelefonoX, col5_OcupacionX);
        const telefonoLines = doc.splitTextToSize(telefonoText, telefonoMaxWidth);
        doc.text(telefonoLines, col4_TelefonoX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, telefonoLines.length * contentLineHeight);

        // --- Columna 5: Ocupación ---
        doc.setTextColor(userDataColor);
        const ocupacionText = familiar.ocupacion;
        const ocupacionMaxWidth = calculateSafeMaxWidth(col5_OcupacionX, endX);
        const ocupacionLines = doc.splitTextToSize(ocupacionText, ocupacionMaxWidth);
        doc.text(ocupacionLines, col5_OcupacionX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, ocupacionLines.length * contentLineHeight);

        // Mover Y para la siguiente fila
        currentY = rowStartY + maxTextHeightThisRow + rowVerticalSpacing;
    }

    // --- 3. Dibujar Datos de Hijos ---
    let hijosRowStartY = currentY;
    const hijosLabelText = "Nombres y edades de los hijos:";
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(labelFontSize);
    doc.setTextColor(labelColor);
    doc.text(hijosLabelText, col1_NombresX, currentY);
    
    currentY += contentLineHeight; // Espacio después de la etiqueta de hijos

    const tieneHijos = document.getElementById('tieneHijos')?.value;
    let hijosDataText = '';
    
    if (tieneHijos === 'si') {
    const cantidadHijosInput = document.getElementById('cantidadHijos');
    const cantidadHijos = cantidadHijosInput ? parseInt(cantidadHijosInput.value) : 0;
    if (cantidadHijos > 0) {
        let hijosArray = [];
        for (let j = 1; j <= cantidadHijos; j++) {
    const nombreHijo = document.getElementById(`nombreHijo${j}`)?.value || '';
    const edadHijo = document.getElementById(`edadHijo${j}`)?.value || '';
    
    // Si ambos campos están vacíos, mostrar solo interrogaciones
    if (!nombreHijo.trim() && !edadHijo.trim()) {
        hijosArray.push(`(¿?) (¿?) (¿?)`);
    } else {
        // Si tiene datos, usar el formato normal
        const nombreFinal = nombreHijo.trim() || '(¿?)';
        const edadFinal = edadHijo.trim() || '(¿?)';
        hijosArray.push(`${nombreFinal} ${edadFinal} años`);
    }
}
        hijosDataText = hijosArray.join(' | ');
    } else {
        hijosDataText = NO_DATA_TEXT;
    }
} else if (tieneHijos === 'no') {
    hijosDataText = "No tiene hijos";
} else {
    hijosDataText = NO_DATA_TEXT; // Para "(¿?)" o cualquier otro valor
}

    if (hijosDataText) {
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const hijosDataStartX = col1_NombresX;
        const hijosDataMaxWidth = calculateSafeMaxWidth(hijosDataStartX, endX);
        const hijosDataLines = doc.splitTextToSize(hijosDataText, hijosDataMaxWidth);
        
        doc.text(hijosDataLines, hijosDataStartX, currentY); 
        
        currentY += hijosDataLines.length * contentLineHeight;
    }
    
    currentY += SECTION_SPACING; // Añade un espacio final después de toda la sección

} catch (error) {
    console.error("Error dibujando sección Datos Familiares:", error);
    currentY += SECTION_SPACING; // Mueve currentY para la siguiente sección
}

// Actualizar currentY para la siguiente sección (opcional: usar altura fija o dinámica)
// Si prefieres altura fija: currentY = datosFamiliaresStartY + DATOS_FAMILIARES_HEIGHT;
// Si prefieres dinámica: el currentY ya está actualizado arriba

// ===============================
// Constelación 5: Escolaridad
// ===============================
// Calculamos el punto de inicio para Escolaridad forzando 3mm después de donde currentY
// quedó al final de la sección anterior (Datos Familiares).
currentY += 0.1; // ¡3mm de distancia fija!

try {
    // --- Comienza el dibujo del Título de la Sección de Escolaridad ---
    currentY = addSectionTitle("Escolaridad", currentY); 
    let escolaridadContentStartY = currentY + 2; // Espacio entre TITULO LINEA-DIV Y ENCABEZADOS
    currentY = escolaridadContentStartY; // Actualiza currentY para el contenido

    // --- Configuraciones de Texto y Espaciado ---
    const escolaridadLevelLabelFontSize = FONT_SIZE_NORMAL;
    const escolaridadHeaderFontSize = FONT_SIZE_H3 - 1;
    const escolaridadContentFontSize = FONT_SIZE_NORMAL - 1;
    const escolaridadContentLineHeight = LINE_HEIGHT_NORMAL;
    const escolaridadRowVerticalSpacing = 1;
    const labelDataVerticalSpacing = 1;
    const escolaridadColumnSpacing = 1;
    const escolaridadUserDataColor = '#495057';
    const escolaridadLabelColor = COLOR_TEXT;
    const SECTION_SPACING = 3; // Espaciado al final de la sección
// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - CONSTANTE EXCLUSIVA ESCOLARIDAD
// =====================================================
const ESCOLARIDAD_SIN_DATOS = "-"; // 📏 Texto para encabezados sin datos (EDITABLE)
// =====================================================
    const col1_NombreEscuelaX = margin;
    const col2_DireccionX = margin + 60;
    const col3_PeriodoX = margin + 120;
    const col4_AnosX = margin + 145;
    const col5_TituloX = margin + 163;
    const escolaridadEndX = margin + contentWidth;

    function formatPeriodo(fechaInicioStr, anosCursados) {
    if (!fechaInicioStr) return "-";  // ← CAMBIO AQUÍ
    
    try {
        const inicioDate = new Date(fechaInicioStr + 'T00:00:00');
        if (isNaN(inicioDate.getTime())) return "-";  // ← CAMBIO AQUÍ

        const inicioYear = inicioDate.getFullYear();

        const anos = parseInt(anosCursados);
        if (!isNaN(anos) && anos > 0) {
            return `${inicioYear} - ${inicioYear + anos}`;
        } else {
            return `${inicioYear} - -`; // ← CAMBIO AQUÍ
        }
    } catch (e) {
        console.error("Error al formatear periodo:", e);
        return "-";  // ← CAMBIO AQUÍ
    }
}

    // --- Función Auxiliar para Calcular Ancho Máximo Seguro ---
    function calculateSafeMaxWidth(startX, endX) {
        return endX - startX - escolaridadColumnSpacing;
    }

    // --- Preparar Datos de Escolaridad (PARTE ANOMALIA EN CERCTIFICADOS)---
    const nivelesEducativos = [
        { idPrefix: 'Primaria', label: 'Primaria', defaultTitulo: '-' },
        { idPrefix: 'Secundaria', label: 'Secundaria o Prevocacional', defaultTitulo: '-' },
        { idPrefix: 'Preparatoria', label: 'Preparatoria o Vocacional', defaultTitulo: '-' },
        { idPrefix: 'Universidad', label: 'Profesional (Universidad)', defaultTitulo: '-' },
        { idPrefix: 'Adicionales', label: 'Comercial - (instituto)', defaultTitulo: '-' }
    ];

    const escolaridadData = nivelesEducativos.map(nivel => {
        const nombreId = `nombre${nivel.idPrefix}`;
        const dirId = `direccion${nivel.idPrefix}`;
        const inicioId = `periodo${nivel.idPrefix}Inicio`;
        const anosId = `anos${nivel.idPrefix}`;
        const tituloId = `titulo${nivel.idPrefix}`;

        const nombreEscuela = document.getElementById(nombreId)?.value;
        const fechaInicio = document.getElementById(inicioId)?.value;
        const anos = document.getElementById(anosId)?.value;
        const tituloInput = document.getElementById(tituloId)?.value;

        return {
            levelLabel: nivel.label,
            nombre: nombreEscuela && nombreEscuela.trim() !== '' ? nombreEscuela : ESCOLARIDAD_SIN_DATOS,
            direccion: document.getElementById(dirId)?.value && document.getElementById(dirId).value.trim() !== '' ? document.getElementById(dirId).value : ESCOLARIDAD_SIN_DATOS,
            periodo: formatPeriodo(fechaInicio, anos),
            anos: (anos && String(anos).trim() !== '') ? anos : ESCOLARIDAD_SIN_DATOS,
            titulo: (tituloInput && tituloInput.trim() !== '') ? tituloInput : (nivel.defaultTitulo || ESCOLARIDAD_SIN_DATOS)
        };
    });

    // --- 1. Dibujar Cabeceras (5 Columnas) ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(escolaridadHeaderFontSize);
    doc.setTextColor(escolaridadLabelColor);
    doc.text("NOMBRE DE LA ESCUELA", col1_NombreEscuelaX, currentY);
    doc.text("DIRECCIÓN:", col2_DireccionX, currentY);
    doc.text("PERIODO:", col3_PeriodoX, currentY);
    doc.text("AÑOS:", col4_AnosX, currentY);
    doc.text("TÍTULO RECIBIDO:", col5_TituloX, currentY);

    currentY += escolaridadContentLineHeight + escolaridadRowVerticalSpacing;

    // --- 2. Dibujar Datos de Escolaridad por Nivel ---
    for (const nivel of escolaridadData) {
        let rowStartY = currentY;
        let labelHeight = 0;
        let maxDataHeight = 0;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadLevelLabelFontSize);
        doc.setTextColor(escolaridadLabelColor);
        const levelLabelMaxWidth = calculateSafeMaxWidth(col1_NombreEscuelaX, col2_DireccionX);
        const labelLines = doc.splitTextToSize(nivel.levelLabel, levelLabelMaxWidth);
        labelHeight = labelLines.length * escolaridadContentLineHeight;
        doc.text(labelLines, col1_NombreEscuelaX, currentY);

        const dataY = currentY + labelHeight + labelDataVerticalSpacing;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadContentFontSize);
        doc.setTextColor(escolaridadUserDataColor);
        let currentDataLineHeight = 0;

        const nombreRealMaxWidth = calculateSafeMaxWidth(col1_NombreEscuelaX, col2_DireccionX);
        const nombreLines = doc.splitTextToSize(nivel.nombre, nombreRealMaxWidth);
        doc.text(nombreLines, col1_NombreEscuelaX, dataY);
        currentDataLineHeight = nombreLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const direccionMaxWidth = calculateSafeMaxWidth(col2_DireccionX, col3_PeriodoX);
        const direccionLines = doc.splitTextToSize(nivel.direccion, direccionMaxWidth);
        doc.text(direccionLines, col2_DireccionX, dataY);
        currentDataLineHeight = direccionLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const periodoMaxWidth = calculateSafeMaxWidth(col3_PeriodoX, col4_AnosX);
        const periodoLines = doc.splitTextToSize(nivel.periodo, periodoMaxWidth);
        doc.text(periodoLines, col3_PeriodoX, dataY);
        currentDataLineHeight = periodoLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const anosMaxWidth = calculateSafeMaxWidth(col4_AnosX, col5_TituloX);
        const anosLines = doc.splitTextToSize(String(nivel.anos), anosMaxWidth);
        doc.text(anosLines, col4_AnosX, dataY);
        currentDataLineHeight = anosLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const tituloMaxWidth = calculateSafeMaxWidth(col5_TituloX, escolaridadEndX);
        const tituloLines = doc.splitTextToSize(nivel.titulo, tituloMaxWidth);
        doc.text(tituloLines, col5_TituloX, dataY);
        currentDataLineHeight = tituloLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        // Mover Y para el siguiente nivel
        currentY = rowStartY + labelHeight + labelDataVerticalSpacing + maxDataHeight + escolaridadRowVerticalSpacing;
    }

    // --- 3. Dibujar Estudios Actuales ---
    const estudiaActualmente = document.getElementById('estudiaSi')?.checked || false;

    if (estudiaActualmente) {
        let estudiosActualesRowY = currentY;
        let labelActualHeight = 0;
        let dataActualHeight = 0;

        const labelActualText = "Estudios que efectúa en la actualidad:";
        doc.setFont(FONT_NORMAL, 'bold');
        doc.setFontSize(escolaridadLevelLabelFontSize);
        doc.setTextColor(escolaridadLabelColor);
        const labelActualLines = doc.splitTextToSize(labelActualText, contentWidth);
        labelActualHeight = labelActualLines.length * escolaridadContentLineHeight;
        doc.text(labelActualLines, margin, currentY);

        const dataActualY = currentY + labelActualHeight + labelDataVerticalSpacing;

        const nombreInstActual = document.getElementById('institucionActual')?.value || NO_DATA_TEXT;
        const dirInstActual = document.getElementById('direccionActual')?.value || NO_DATA_TEXT;
        const fechaInicioActualStr = document.getElementById('fechaInicioActual')?.value;
        const fechaFinActualStr = document.getElementById('fechaFinActual')?.value;

        let periodoEstudioActual = '';
        const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let fechaInicioFormateada = NO_DATA_TEXT;
        if (fechaInicioActualStr) {
            try {
                const fechaInicioDate = new Date(fechaInicioActualStr + 'T00:00:00');
                if (!isNaN(fechaInicioDate.getTime())) {
                    fechaInicioFormateada = fechaInicioDate.toLocaleDateString('es-ES', opcionesFecha);
                }
            } catch (e) {
                console.error("Error al formatear fechaInicioActual:", e);
            }
        }

        let fechaFinFormateada = NO_DATA_TEXT;
        if (fechaFinActualStr) {
            try {
                const fechaFinDate = new Date(fechaFinActualStr + 'T00:00:00');
                if (!isNaN(fechaFinDate.getTime())) {
                    fechaFinFormateada = fechaFinDate.toLocaleDateString('es-ES', opcionesFecha);
                }
            } catch (e) {
                console.error("Error al formatear fechaFinActual:", e);
            }
        }
        
        periodoEstudioActual = `${fechaInicioFormateada} - ${fechaFinFormateada}`;

        const dataActualText = `Institución: ${nombreInstActual} | Domicilio: ${dirInstActual}. Periodo_Inicio y Fin: ${periodoEstudioActual}.`;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadContentFontSize);
        doc.setTextColor(escolaridadUserDataColor);
        const dataActualLines = doc.splitTextToSize(dataActualText, contentWidth);
        dataActualHeight = dataActualLines.length * escolaridadContentLineHeight;
        doc.text(dataActualLines, margin, dataActualY);

        // Mover la posición Y para la siguiente sección
        currentY = estudiosActualesRowY + labelActualHeight + labelDataVerticalSpacing + dataActualHeight + SECTION_SPACING;
    } else {
        // Mover la posición Y incluso si no hay estudios actuales
        currentY += SECTION_SPACING / 2;
    }

} catch (error) {
    console.error("Error dibujando sección Escolaridad:", error);
    // Asegura que currentY avance aunque haya error, para no bloquear el resto del PDF
    currentY += SECTION_SPACING;
}
// --- Fin de la sección Escolaridad ---

// ===============================
// Constelación 6: Conocimientos Generales (Página 2)
// ===============================

// Forzamos el salto a la página 2 si estamos en la primera página y ya hay contenido.
if (doc.internal.getNumberOfPages() === 1 && currentY > margin) {
    doc.addPage();
    currentY = margin; // Reset currentY para la nueva página
} else {
    // Si ya estamos en página 2 o posterior, verificar si necesitamos salto de página
    if (currentY > pageHeight - 50) { // Si queda poco espacio
        doc.addPage();
        currentY = margin;
    }
}

currentY = addSectionTitle("Conocimientos Generales", currentY);
let conocimientosGeneralesStartY = currentY + 2;
currentY = conocimientosGeneralesStartY;

// --- Configuraciones de Texto y Espaciado para Conocimientos Generales ---
const conocimientosLabelFontSize = FONT_SIZE_NORMAL;
const conocimientosContentFontSize = FONT_SIZE_NORMAL - 1;
const conocimientosContentLineHeight = LINE_HEIGHT_NORMAL;
const conocimientosRowVerticalSpacing = 1;
const conocimientosLabelDataSpacing = 0;

// --- === CONFIGURACIÓN MANUAL DE POSICIONES HORIZONTALES (X) === ---
const colLeftX = margin;
const colRightX = margin + (contentWidth / 2) + 5;
const colWidth = (contentWidth / 2) - 10;
const colLeftEndX = colLeftX + colWidth;
const colRightEndX = colRightX + colWidth;

// --- Datos de Conocimientos Generales para el encolumnado ---
const conocimientosLayout = [
    {
        left: { label: "Funciones de oficina que el aspirante domina:", valueId: "funcionesOficinaDominadas", default: "No especificado" },
        right: { label: "Idiomas:", valueId: "idiomasDominados", default: "No especificado" }
    },
    {
        left: { label: "Máquinas de oficina o taller que sabe utilizar:", valueId: "maquinasOficinaTaller", default: "No especificado" },
        right: { label: "Nivel del idioma % (Ej: 90% Inglés):", valueId: "nivelIdiomaPorcentaje", default: "No especificado" }
    },
    {
        left: { label: "Otras funciones u oficios que domina:", valueId: "otrasFuncionesOficios", default: "No especificado" },
        right: { label: "Software que domina:", valueId: "softwareDominado", default: "No especificado" }
    }
];

try {
    // --- Dibujar cada par de campos de Conocimientos Generales ---
    for (const row of conocimientosLayout) {
        let rowStartY = currentY;
        let maxRowContentHeight = 0;

        // --- COLUMNA IZQUIERDA ---
        let currentColumnY = rowStartY;
        const leftUserData = document.getElementById(row.left.valueId)?.value || row.left.default;

        // Dibujar Etiqueta Izquierda
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(conocimientosLabelFontSize);
        doc.setTextColor(COLOR_TEXT);
        const leftLabelLines = doc.splitTextToSize(row.left.label, colWidth);
        doc.text(leftLabelLines, colLeftX, currentColumnY);
        let leftLabelHeight = leftLabelLines.length * conocimientosContentLineHeight;
        currentColumnY += leftLabelHeight + conocimientosLabelDataSpacing;

        // Dibujar Dato Izquierdo del Usuario
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(conocimientosContentFontSize);
        doc.setTextColor('#495057'); // COLOR FIJO en lugar de variable indefinida
        const leftDataLines = doc.splitTextToSize(leftUserData, colWidth);
        doc.text(leftDataLines, colLeftX, currentColumnY);
        let leftDataHeight = leftDataLines.length * conocimientosContentLineHeight;

        let totalLeftColumnHeight = leftLabelHeight + conocimientosLabelDataSpacing + leftDataHeight;
        maxRowContentHeight = Math.max(maxRowContentHeight, totalLeftColumnHeight);

        // --- COLUMNA DERECHA ---
        currentColumnY = rowStartY;
        const rightUserData = document.getElementById(row.right.valueId)?.value || row.right.default;

        // Dibujar Etiqueta Derecha
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(conocimientosLabelFontSize);
        doc.setTextColor(COLOR_TEXT);
        const rightLabelLines = doc.splitTextToSize(row.right.label, colWidth);
        doc.text(rightLabelLines, colRightX, currentColumnY);
        let rightLabelHeight = rightLabelLines.length * conocimientosContentLineHeight;
        currentColumnY += rightLabelHeight + conocimientosLabelDataSpacing;

        // Dibujar Dato Derecho del Usuario
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(conocimientosContentFontSize);
        doc.setTextColor('#495057'); // COLOR FIJO en lugar de variable indefinida
        const rightDataLines = doc.splitTextToSize(rightUserData, colWidth);
        doc.text(rightDataLines, colRightX, currentColumnY);
        let rightDataHeight = rightDataLines.length * conocimientosContentLineHeight;

        let totalRightColumnHeight = rightLabelHeight + conocimientosLabelDataSpacing + rightDataHeight;
        maxRowContentHeight = Math.max(maxRowContentHeight, totalRightColumnHeight);

        // --- Mover Y para la siguiente fila ---
        currentY = rowStartY + maxRowContentHeight + conocimientosRowVerticalSpacing;
    }

} catch (error) {
    console.error("Error dibujando sección Conocimientos Generales:", error);
    currentY += 10;
}

// --- Fin de la sección de Conocimientos Generales ---

// ===============================
// Constelación 7: Empleo Actual y Anteriores
// ===============================

currentY = addSectionTitle("(Empleos) Actual y Anteriores", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const CONCEPTO_WIDTH = 40;        // 📏 Ancho de la columna "CONCEPTO" (EDITABLE)
const COLUMN_SPACING = 1;         // 📏 Espacio entre columnas (EDITABLE)  
const ROW_SPACING = 0;            // 📏 Espacio entre filas (EDITABLE)
// =====================================================

try {
    // Obtener cantidad de empleos
    const cantidadEmpleosSelect = document.getElementById('cantidadEmpleos');
    const numEmpleos = parseInt(cantidadEmpleosSelect?.value) || 1;
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const availableWidth = contentWidth - CONCEPTO_WIDTH; // Espacio disponible para empleos
    const empleoColWidth = (availableWidth - (COLUMN_SPACING * numEmpleos)) / numEmpleos; // Ancho de cada columna de empleo
    
    // Posiciones X calculadas automáticamente
    const colConceptoX = margin;
    const empleoColumns = [];
    for (let i = 0; i < numEmpleos; i++) {
        empleoColumns.push(margin + CONCEPTO_WIDTH + (i * (empleoColWidth + COLUMN_SPACING)));
    }
    
    console.log(`📊 Distribución automática: ${numEmpleos} empleos, ${empleoColWidth.toFixed(1)}mm cada uno`);

    // 🏆 ALGORITMO SÚPER AVANZADO DETECTOR DE RENUNCIAS™
// Post-Debate Épico 2025 con Formato Reformado
function formatEmpleoPeriodo(fechaInicio, fechaRenuncia) {
    if (!fechaInicio) return '-';
    
    try {
        const inicioDate = new Date(fechaInicio + 'T00:00:00');
        
        // Función para formatear fecha DD/MM/AA
        const formatFecha = (date) => {
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const anio = String(date.getFullYear()).slice(-2);
            return `${dia}/${mes}/${anio}`;
        };
        
        // Función para verificar año bisiesto
        const esAñoBisiesto = (año) => {
            return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
        };
        
        // 🎯 FUNCIÓN PRINCIPAL: Detector de Renuncias
        const calcularDuracion = (fechaInicio, fechaFin) => {
            // REGLA: El día de renuncia NO cuenta como día laboral
            const tiempoTotal = fechaFin.getTime() - fechaInicio.getTime();
            let diasTotales = Math.floor(tiempoTotal / (1000 * 60 * 60 * 24));
            
            let años = 0;
            let meses = 0;
            let días = diasTotales;
            
            // Calcular años completos
            let fechaTemporal = new Date(fechaInicio);
            while (fechaTemporal.getFullYear() < fechaFin.getFullYear()) {
                const siguienteAño = new Date(fechaTemporal);
                siguienteAño.setFullYear(siguienteAño.getFullYear() + 1);
                
                if (siguienteAño <= fechaFin) {
                    años++;
                    fechaTemporal = siguienteAño;
                    días -= esAñoBisiesto(fechaTemporal.getFullYear() - 1) ? 366 : 365;
                } else {
                    break;
                }
            }
            
            // Calcular meses completos
            while (fechaTemporal.getMonth() < fechaFin.getMonth() || 
                   (fechaTemporal.getMonth() === fechaFin.getMonth() && fechaTemporal.getDate() < fechaFin.getDate())) {
                
                const siguienteMes = new Date(fechaTemporal);
                siguienteMes.setMonth(siguienteMes.getMonth() + 1);
                
                if (siguienteMes <= fechaFin) {
                    const diasEnMes = new Date(fechaTemporal.getFullYear(), fechaTemporal.getMonth() + 1, 0).getDate();
                    días -= diasEnMes;
                    meses++;
                    fechaTemporal = siguienteMes;
                } else {
                    break;
                }
            }
            
            // Los días restantes
            días = Math.max(0, días);
            
            // 🎨 FORMATO REFORMADO: Usar | en lugar de "y"
            let duracion = '';
            
            if (años > 0) {
                duracion += `${años} año${años !== 1 ? 's' : ''}`;
            }
            
            if (meses > 0) {
                if (duracion) duracion += ' | ';
                duracion += `${meses} mes${meses !== 1 ? 'es' : ''}`;
            }
            
            if (días > 0) {
                if (duracion) duracion += ' | ';
                duracion += `${días} día${días !== 1 ? 's' : ''}`;
            }
            
            return duracion || '0 días';
        };
        
        // Construir el resultado final
        let periodoStr = formatFecha(inicioDate);
        
        if (fechaRenuncia && fechaRenuncia.trim() !== '') {
            const finDate = new Date(fechaRenuncia + 'T00:00:00');
            
            if (!isNaN(finDate.getTime())) {
                periodoStr += `|-${formatFecha(finDate)}=`;
                const duracion = calcularDuracion(inicioDate, finDate);
                periodoStr += `(${duracion})`;
            } else {
                periodoStr += '|-Actual';
            }
        } else {
            periodoStr += '|-Actual';
        }
        
        return periodoStr;
        
    } catch (e) {
        console.error('Error en Detector de Renuncias™:', e);
        return '-';
    }
}

    // --- Recopilar datos de empleos ---
    const empleosData = [];
    for (let i = 1; i <= numEmpleos; i++) {
        const fechaIngreso = document.getElementById(`fechaIngreso${i}`)?.value;
        const fechaRenuncia = document.getElementById(`fechaRenuncia${i}`)?.value;

        empleosData.push({
            tiempoServicio: formatEmpleoPeriodo(fechaIngreso, fechaRenuncia),
            nombreEmpresa: document.getElementById(`nombreEmpresa${i}`)?.value || '-',
            direccion: document.getElementById(`direccionEmpresa${i}`)?.value || '-',
            telefono: document.getElementById(`telefonoEmpresa${i}`)?.value || '-',
            puestoDesempenado: document.getElementById(`puestoDesempenado${i}`)?.value || '-',
            sueldoGanabas: document.getElementById(`sueldoGanabas${i}`)?.value || '-',
            motivoSeparacion: document.getElementById(`motivoSeparacion${i}`)?.value || '-',
            nombreJefe: document.getElementById(`nombreJefe${i}`)?.value || '-',
            puestoJefe: document.getElementById(`puestoJefe${i}`)?.value || '-'
        });
    }

    // --- Dibujar Cabeceras ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(COLOR_TEXT);

    doc.text("CONCEPTO", colConceptoX, currentY);
    
    const titulos = ["ACTUAL O ÚLTIMO", "EMPLEO ANTERIOR", "EMPLEO PENÚLTIMO", "EMPLEO ANTEPENÚLTIMO"];
    for (let i = 0; i < numEmpleos; i++) {
        // Título adaptado al ancho de columna
        const tituloLines = doc.splitTextToSize(titulos[i] || `EMPLEO ${i+1}`, empleoColWidth);
        doc.text(tituloLines, empleoColumns[i], currentY);
    }

    currentY += LINE_HEIGHT_NORMAL + ROW_SPACING;

    // --- Dibujar Conceptos y Datos ---
    const conceptos = [
        { label: "Tiempo que prestó sus servicios", key: "tiempoServicio" },
        { label: "Nombre de la compañía", key: "nombreEmpresa" },
        { label: "Dirección", key: "direccion" },
        { label: "Teléfono", key: "telefono" },
        { label: "Puesto que desempeñaba", key: "puestoDesempenado" },
        { label: "Sueldos", key: "sueldoGanabas" },
        { label: "Motivo de su separación", key: "motivoSeparacion" },
        { label: "Nombre de su jefe directo", key: "nombreJefe" },
        { label: "Puesto de su jefe directo", key: "puestoJefe" }
    ];

    for (const concepto of conceptos) {
        let rowStartY = currentY;
        let maxRowHeight = 0;

        // Dibujar Concepto
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(COLOR_TEXT);
        const conceptoLines = doc.splitTextToSize(concepto.label, CONCEPTO_WIDTH);
        doc.text(conceptoLines, colConceptoX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, conceptoLines.length * LINE_HEIGHT_NORMAL);

        // Dibujar Datos de Empleos
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor('#495057');

        for (let i = 0; i < numEmpleos; i++) {
            const empleoData = empleosData[i];
            if (!empleoData) continue;

            const value = empleoData[concepto.key] || '-';
            const dataLines = doc.splitTextToSize(value, empleoColWidth);
            doc.text(dataLines, empleoColumns[i], rowStartY);
            maxRowHeight = Math.max(maxRowHeight, dataLines.length * LINE_HEIGHT_NORMAL);
        }

        currentY = rowStartY + maxRowHeight + ROW_SPACING;
    }

    // --- Pregunta sobre informes ---
    const informesEmpresasSelect = document.getElementById('informesEmpresas');
    const informesRespuesta = informesEmpresasSelect?.value === 'si' ? 'Sí' : 'No';

    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 1);
    doc.setTextColor(COLOR_TEXT);
    doc.text(`¿Podríamos solicitar informes de usted? - (${informesRespuesta})`, margin, currentY);
    currentY += LINE_HEIGHT_NORMAL + 1;

    if (informesRespuesta === 'No') {
        const razonNoInformesText = document.getElementById('razonNoInformesText')?.value || 'No especificado';
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor('#495057');
        doc.text(`¿Por qué? - ${razonNoInformesText}`, margin + 5, currentY);
        currentY += LINE_HEIGHT_NORMAL;
    }

    currentY += ROW_SPACING;
    console.log("✅ Sección Empleo Actual y Anteriores completada exitosamente");

} catch (error) {
    console.error("❌ Error en Empleo Actual y Anteriores:", error);
    currentY += 20;
}

// --- Fin de la sección de Empleos ---

// ===============================
// Constelación 8: Referencias Personales
// ===============================

currentY = addSectionTitle("Referencias Personales", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const NOMBRE_WIDTH = 45;          // 📏 Ancho columna NOMBRE (EDITABLE)
const DIRECCION_WIDTH = 45;       // 📏 Ancho columna DIRECCIÓN (EDITABLE)
const TELEFONO_WIDTH = 15;        // 📏 Ancho columna TELÉFONO (EDITABLE)
const OCUPACION_WIDTH = 30;       // 📏 Ancho columna OCUPACIÓN (EDITABLE)
const REF_COLUMN_SPACING = 5;     // 📏 Espacio entre columnas (EDITABLE)
const REF_ROW_SPACING = 0;        // 📏 Espacio entre filas (EDITABLE)
// =====================================================

try {
    // Obtener cantidad de referencias
    const cantidadReferenciasSelect = document.getElementById('cantidadReferencias');
    const numReferencias = parseInt(cantidadReferenciasSelect?.value) || 1;
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const colRefNombreX = margin;
    const colRefDireccionX = colRefNombreX + NOMBRE_WIDTH + REF_COLUMN_SPACING;
    const colRefTelefonoX = colRefDireccionX + DIRECCION_WIDTH + REF_COLUMN_SPACING;
    const colRefOcupacionX = colRefTelefonoX + TELEFONO_WIDTH + REF_COLUMN_SPACING;
    const colRefTiempoConocerloX = colRefOcupacionX + OCUPACION_WIDTH + REF_COLUMN_SPACING;
    
    // Calcular ancho de la última columna (TIEMPO DE CONOCERLO)
    const refColTiempoWidth = contentWidth - (colRefTiempoConocerloX - margin);
    
    console.log(`📊 Referencias: ${numReferencias} referencias distribuidas automáticamente`);

    // --- Recopilar datos de referencias ---
    const referenciasData = [];
    for (let i = 1; i <= numReferencias; i++) {
        // Combinar calle y colonia para dirección
        const calleRef = document.getElementById(`calleReferencia${i}`)?.value || '';
        const coloniaRef = document.getElementById(`coloniaReferencia${i}`)?.value || '';
        let direccion = '-';
        if (calleRef || coloniaRef) {
            direccion = `${calleRef}${calleRef && coloniaRef ? ', ' : ''}${coloniaRef}`;
        }

        referenciasData.push({
            nombre: document.getElementById(`nombreReferencia${i}`)?.value || '-',
            direccion: direccion,
            telefono: document.getElementById(`telefonoReferencia${i}`)?.value || '-',
            ocupacion: document.getElementById(`ocupacionReferencia${i}`)?.value || '-',
            tiempoConocerlo: document.getElementById(`tiempoConocerlo${i}`)?.value || '-'
        });
    }

    // --- Dibujar Cabeceras ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(COLOR_TEXT);

    doc.text("NOMBRE", colRefNombreX, currentY);
    doc.text("DIRECCIÓN", colRefDireccionX, currentY);
    doc.text("TELÉFONO", colRefTelefonoX, currentY);
    doc.text("OCUPACIÓN", colRefOcupacionX, currentY);
    doc.text("TIEMPO DE CONOCERLO", colRefTiempoConocerloX, currentY);

    currentY += LINE_HEIGHT_NORMAL + REF_ROW_SPACING;

    // --- Dibujar datos de cada referencia ---
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 1);
    doc.setTextColor('#495057'); // ✅ COLOR FIJO - Lección aprendida!

    for (const ref of referenciasData) {
        let rowStartY = currentY;
        let maxRowHeight = 0;

        // Columna: NOMBRE
        const nombreLines = doc.splitTextToSize(ref.nombre, NOMBRE_WIDTH);
        doc.text(nombreLines, colRefNombreX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, nombreLines.length * LINE_HEIGHT_NORMAL);

        // Columna: DIRECCIÓN
        const direccionLines = doc.splitTextToSize(ref.direccion, DIRECCION_WIDTH);
        doc.text(direccionLines, colRefDireccionX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, direccionLines.length * LINE_HEIGHT_NORMAL);

        // Columna: TELÉFONO
        const telefonoLines = doc.splitTextToSize(ref.telefono, TELEFONO_WIDTH);
        doc.text(telefonoLines, colRefTelefonoX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, telefonoLines.length * LINE_HEIGHT_NORMAL);

        // Columna: OCUPACIÓN
        const ocupacionLines = doc.splitTextToSize(ref.ocupacion, OCUPACION_WIDTH);
        doc.text(ocupacionLines, colRefOcupacionX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, ocupacionLines.length * LINE_HEIGHT_NORMAL);

        // Columna: TIEMPO DE CONOCERLO
        const tiempoText = String(ref.tiempoConocerlo) + (ref.tiempoConocerlo !== '-' ? ' años' : '');
        const tiempoLines = doc.splitTextToSize(tiempoText, refColTiempoWidth);
        doc.text(tiempoLines, colRefTiempoConocerloX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, tiempoLines.length * LINE_HEIGHT_NORMAL);

        currentY = rowStartY + maxRowHeight + REF_ROW_SPACING;
    }

    console.log("✅ Sección Referencias Personales completada exitosamente");

} catch (error) {
    console.error("❌ Error en Referencias Personales:", error);
    currentY += 20;
}

// --- Fin de la sección de Referencias Personales ---

// ===============================
// Constelación 9: Datos Generales y Económicos (Dos Columnas)
// ===============================

currentY = addSectionTitle("Datos Generales y Económicos", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const COL_SPACING = 3;            // 📏 Espacio entre las dos columnas principales (EDITABLE)
const QUESTION_SPACING = 0;       // 📏 Espacio entre preguntas (EDITABLE)
const SUB_QUESTION_SPACING = -1;   // 📏 Espacio entre pregunta y subrespuesta (EDITABLE)
// =====================================================

try {
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const halfWidth = (contentWidth - COL_SPACING) / 2;
    const colLeftX = margin;
    const colRightX = margin + halfWidth + COL_SPACING;
    
    console.log(`📊 Dos columnas: ${halfWidth.toFixed(1)}mm cada una, separadas por ${COL_SPACING}mm`);

    // Función auxiliar para obtener valor de radio button
    function getRadioValue(name) {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : 'no';
    }

    // Función auxiliar para dibujar una pregunta con respuesta
    function drawQuestion(question, answer, x, y, maxWidth) {
        let currentQuestionY = y;
        
        // Dibujar pregunta
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(COLOR_TEXT);
        const questionLines = doc.splitTextToSize(question, maxWidth);
        doc.text(questionLines, x, currentQuestionY);
        currentQuestionY += questionLines.length * LINE_HEIGHT_NORMAL + SUB_QUESTION_SPACING;
        
        // Dibujar respuesta
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 2);
        doc.setTextColor('#495057');
        const answerLines = doc.splitTextToSize(answer, maxWidth);
        doc.text(answerLines, x + 2, currentQuestionY);
        currentQuestionY += answerLines.length * LINE_HEIGHT_NORMAL + QUESTION_SPACING;
        
        return currentQuestionY;
    }

    // === COLUMNA IZQUIERDA: DATOS GENERALES ===
    let leftY = currentY;
    
    // 1. ¿Cómo se enteró de la vacante?
    const comoEntero = document.getElementById('comoEntero')?.value || 'No especificado';
    leftY = drawQuestion("1. ¿Cómo se enteró de esta vacante?", comoEntero, colLeftX, leftY, halfWidth);
    
    // 2. ¿Algún pariente trabaja aquí?
    const parienteValue = getRadioValue('pariente');
    let parienteAnswer = parienteValue === 'si' ? 'Sí' : 'No';
    if (parienteValue === 'si') {
        const nombrePariente = document.getElementById('nombrePariente')?.value || '';
        if (nombrePariente) parienteAnswer += ` - ${nombrePariente}`;
    }
    leftY = drawQuestion("2. ¿Algún pariente trabaja aquí?", parienteAnswer, colLeftX, leftY, halfWidth);
    
    // 3. ¿Ha sido afianzado?
    const afianzadoValue = getRadioValue('afianzado');
    let afianzadoAnswer = afianzadoValue === 'si' ? 'Sí' : 'No';
    if (afianzadoValue === 'si') {
        const entidadAfianzadora = document.getElementById('nombreEntidadAfianzadora')?.value || '';
        if (entidadAfianzadora) afianzadoAnswer += ` - ${entidadAfianzadora}`;
    }
    leftY = drawQuestion("3. ¿Ha sido afianzado?", afianzadoAnswer, colLeftX, leftY, halfWidth);
    
    // 4. ¿Afiliado a sindicato?
    const sindicatoValue = getRadioValue('sindicato');
    let sindicatoAnswer = sindicatoValue === 'si' ? 'Sí' : 'No';
    if (sindicatoValue === 'si') {
        const nombreSindicato = document.getElementById('nombreSindicato')?.value || '';
        if (nombreSindicato) sindicatoAnswer += ` - ${nombreSindicato}`;
    }
    leftY = drawQuestion("4. ¿Afiliado a sindicato?", sindicatoAnswer, colLeftX, leftY, halfWidth);
    
    // 5. ¿Tiene seguro de vida?
    const seguroValue = getRadioValue('seguroVida');
    let seguroAnswer = seguroValue === 'si' ? 'Sí' : 'No';
    if (seguroValue === 'si') {
        const entidadSeguro = document.getElementById('nombreEntidadSeguro')?.value || '';
        const sumaAsegurada = document.getElementById('sumaAsegurada')?.value || '';
        if (entidadSeguro) seguroAnswer += ` - ${entidadSeguro}`;
        if (sumaAsegurada) seguroAnswer += ` (${sumaAsegurada})`;
    }
    leftY = drawQuestion("5. ¿Tiene seguro de vida?", seguroAnswer, colLeftX, leftY, halfWidth);
    
    // 6. ¿Podría viajar?
    const viajarValue = getRadioValue('puedeViajar');
    let viajarAnswer = viajarValue === 'si' ? 'Sí' : 'No';
    if (viajarValue === 'no') {
        const razonesViaje = document.getElementById('razonesViaje')?.value || '';
        if (razonesViaje) viajarAnswer += ` - ${razonesViaje}`;
    }
    leftY = drawQuestion("6. ¿Podría viajar?", viajarAnswer, colLeftX, leftY, halfWidth);
    
    // 7. ¿Cambiaría de residencia?
    const residenciaValue = getRadioValue('cambioResidencia');
    let residenciaAnswer = residenciaValue === 'si' ? 'Sí' : 'No';
    if (residenciaValue === 'no') {
        const razonesResidencia = document.getElementById('razonesResidencia')?.value || '';
        if (razonesResidencia) residenciaAnswer += ` - ${razonesResidencia}`;
    }
    leftY = drawQuestion("7. ¿Cambiaría de residencia?", residenciaAnswer, colLeftX, leftY, halfWidth);
    
    // 8. ¿Fecha de incorporación?
    const fechaIncorporacion = document.getElementById('fechaIncorporacion')?.value || 'No especificado';
    leftY = drawQuestion("8. ¿Fecha de incorporación?", fechaIncorporacion, colLeftX, leftY, halfWidth);

    // === COLUMNA DERECHA: DATOS ECONÓMICOS ===
    let rightY = currentY;
    
    // 1. ¿Ingresos adicionales?
    const ingresosValue = getRadioValue('otros_ingresos');
    let ingresosAnswer = ingresosValue === 'si' ? 'Sí' : 'No';
    if (ingresosValue === 'si') {
        const fuente = document.getElementById('fuente_ingreso')?.value || '';
        const monto = document.getElementById('monto_ingresos')?.value || '';
        if (fuente) ingresosAnswer += ` - ${fuente}`;
        if (monto) ingresosAnswer += ` ($${monto})`;
    }
    rightY = drawQuestion("1. ¿Ingresos adicionales?", ingresosAnswer, colRightX, rightY, halfWidth);
    
    // 2. ¿Cónyuge trabaja?
const conyugeValue = getRadioValue('conyuge_trabaja');
let conyugeAnswer = '';

if (conyugeValue === 'si') {
    conyugeAnswer = 'Sí';
    const lugar = document.getElementById('lugar_trabajo_conyuge')?.value || '';
    const montoConyuge = document.getElementById('monto_ingresos_conyuge')?.value || '';
    if (lugar) conyugeAnswer += ` - ${lugar}`;
    if (montoConyuge) conyugeAnswer += ` ($${montoConyuge})`;
} else if (conyugeValue === 'no') {
    conyugeAnswer = 'No';
} else if (conyugeValue === 'N/A') {
    conyugeAnswer = 'N/A';
} else {
    // Fallback si no hay selección (aunque N/A está checked por defecto)
    conyugeAnswer = 'N/A';
}
rightY = drawQuestion("2. ¿Cónyuge trabaja?", conyugeAnswer, colRightX, rightY, halfWidth);
    
    // 3. ¿Casa propia?
    const casaValue = getRadioValue('vive_casa');
    let casaAnswer = casaValue === 'si' ? 'Sí' : 'No';
    if (casaValue === 'si') {
        const valorCasa = document.getElementById('valor_casa')?.value || '';
        if (valorCasa) casaAnswer += ` - $${valorCasa}`;
    }
    rightY = drawQuestion("3. ¿Casa propia?", casaAnswer, colRightX, rightY, halfWidth);
    
    // 4. ¿Paga renta?
    const rentaValue = getRadioValue('paga_renta');
    let rentaAnswer = rentaValue === 'si' ? 'Sí' : 'No';
    if (rentaValue === 'si') {
        const montoRenta = document.getElementById('monto_renta')?.value || '';
        if (montoRenta) rentaAnswer += ` - $${montoRenta}`;
    }
    rightY = drawQuestion("4. ¿Paga renta?", rentaAnswer, colRightX, rightY, halfWidth);
    
    // 5. ¿Automóvil propio?
    const autoValue = getRadioValue('tiene_auto');
    let autoAnswer = autoValue === 'si' ? 'Sí' : 'No';
    if (autoValue === 'si') {
        const marca = document.getElementById('marca_modelo_auto')?.value || '';
        const valorAuto = document.getElementById('valor_auto')?.value || '';
        if (marca) autoAnswer += ` - ${marca}`;
        if (valorAuto) autoAnswer += ` ($${valorAuto})`;
    }
    rightY = drawQuestion("5. ¿Automóvil propio?", autoAnswer, colRightX, rightY, halfWidth);
    
    // 6. ¿Tiene deudas? ✅ AHORA COMPLETO CON IDs CORRECTOS
    const deudasValue = getRadioValue('tiene_deudas');
    let deudasAnswer = deudasValue === 'si' ? 'Sí' : 'No';
    if (deudasValue === 'si') {
        const conQuien = document.getElementById('acreedor_deuda')?.value || '';
        const montoDeudas = document.getElementById('monto_deuda')?.value || '';
        if (conQuien) deudasAnswer += ` - Con: ${conQuien}`;
        if (montoDeudas) deudasAnswer += ` ($${montoDeudas}/mes)`;
    }
    rightY = drawQuestion("6. ¿Tiene deudas?", deudasAnswer, colRightX, rightY, halfWidth);
    
    // 7. ¿Capacidad de ahorro mensual?
    const ahorroMensual = document.getElementById('abono_mensual')?.value || 'No especificado';
    const ahorroAnswer = ahorroMensual !== 'No especificado' ? `$${ahorroMensual}` : ahorroMensual;
    rightY = drawQuestion("7. ¿Capacidad de ahorro mensual?", ahorroAnswer, colRightX, rightY, halfWidth);
    
    // 8. ¿Gastos mensuales?
    const gastosMensuales = document.getElementById('gastos_mensuales')?.value || 'No especificado';
    const gastosAnswer = gastosMensuales !== 'No especificado' ? `$${gastosMensuales}` : gastosMensuales;
    rightY = drawQuestion("8. ¿Gastos mensuales?", gastosAnswer, colRightX, rightY, halfWidth);

    // Actualizar currentY al máximo de ambas columnas
    currentY = Math.max(leftY, rightY) + 2;
    
    console.log("✅ Sección Datos Generales y Económicos completada exitosamente");

} catch (error) {
    console.error("❌ Error en Datos Generales y Económicos:", error);
    currentY += 20;
}

// --- Fin de la sección Datos Generales y Económicos ---

// ===============================
// Constelación 10: Notas para RH y Observaciones del Entrevistador (VERSIÓN FINAL)
// ===============================

currentY += 2; // Espacio después de la sección anterior

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const RECTANGLE_HEIGHT = 25;      // 📏 Altura del rectángulo (EDITABLE)
const BORDER_RADIUS = 3;          // 📏 Radio de bordes redondeados (EDITABLE) 
const BORDER_WIDTH = 0.8;         // 📏 Grosor de líneas (EDITABLE) - MÁS VISIBLE
const SUBTITLE_MARGIN = 3;        // 📏 Margen de subtítulos desde borde (EDITABLE)
// =====================================================

try {
    // Verificar límites de página
    const limitePagina = pageHeight - margin;
    if (currentY > limitePagina - 35) {
        console.log("📄 Nueva página para Notas RH");
        doc.addPage();
        currentY = margin + 10;
    }
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES
    const rectX = margin;
    const rectY = currentY;
    const rectWidth = contentWidth;
    const halfRectWidth = rectWidth / 2;
    const dividerX = rectX + halfRectWidth;
    
    console.log(`📊 Rectángulo Notas RH: ${rectWidth}mm x ${RECTANGLE_HEIGHT}mm`);

    // === DIBUJAR RECTÁNGULO PRINCIPAL CON BORDES REDONDEADOS ===
    doc.setDrawColor(100, 100, 100); // GRIS MÁS VISIBLE que antes
    doc.setLineWidth(BORDER_WIDTH);
    
    // Si roundedRect no funciona, usar rect normal
    try {
        doc.roundedRect(rectX, rectY, rectWidth, RECTANGLE_HEIGHT, BORDER_RADIUS, BORDER_RADIUS, 'S');
    } catch (e) {
        console.log("⚠️ Usando rect normal en lugar de roundedRect");
        doc.rect(rectX, rectY, rectWidth, RECTANGLE_HEIGHT, 'S');
    }
    
    // === DIBUJAR LÍNEA DIVISORIA CENTRAL ===
    doc.line(dividerX, rectY, dividerX, rectY + RECTANGLE_HEIGHT);
    
    // === LADO IZQUIERDO: NOTA PARA RH ===
    
    // Subtítulo "NOTA PARA RH" (superior izquierdo)
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(50, 50, 50); // GRIS OSCURO MÁS VISIBLE
    doc.text("NOTA PARA RH", rectX + SUBTITLE_MARGIN, rectY + SUBTITLE_MARGIN + 4);
    
    // Contenido de la nota
    const notaRH = document.getElementById('nota-rh')?.value || '';
    if (notaRH.trim()) {
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(70, 70, 70); // GRIS MEDIO VISIBLE
        
        // Calcular área disponible para el texto
        const textAreaWidth = halfRectWidth - (SUBTITLE_MARGIN * 2);
        const textStartY = rectY + SUBTITLE_MARGIN + 9; // Debajo del subtítulo
        const textMaxHeight = RECTANGLE_HEIGHT - 12;
        
        const notaLines = doc.splitTextToSize(notaRH, textAreaWidth);
        const maxLines = Math.floor(textMaxHeight / LINE_HEIGHT_NORMAL);
        const finalLines = notaLines.slice(0, maxLines);
        
        doc.text(finalLines, rectX + SUBTITLE_MARGIN, textStartY);
    }
    
    // === LADO DERECHO: OBSERVACIONES DEL ENTREVISTADOR ===
    
    // Subtítulo "Observaciones del entrevistador" (superior derecho)
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(50, 50, 50); // GRIS OSCURO MÁS VISIBLE
    
    const observacionesText = "Observaciones del entrevistador";
    const observacionesWidth = doc.getTextWidth(observacionesText);
    const observacionesX = rectX + rectWidth - observacionesWidth - SUBTITLE_MARGIN;
    doc.text(observacionesText, observacionesX, rectY + SUBTITLE_MARGIN + 4);
    
    // Nota explicativa pequeña
    doc.setFont(FONT_NORMAL, 'italic');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(120, 120, 120); // GRIS CLARO PERO VISIBLE
    const explicacionText = "(Se llena ya impreso el documento)";
    const explicacionWidth = doc.getTextWidth(explicacionText);
    const explicacionX = rectX + rectWidth - explicacionWidth - SUBTITLE_MARGIN;
    doc.text(explicacionText, explicacionX, rectY + SUBTITLE_MARGIN + 9);
    
    // Actualizar currentY
    currentY = rectY + RECTANGLE_HEIGHT + 2;
    
    console.log("✅ Sección Notas para RH y Observaciones completada exitosamente");

} catch (error) {
    console.error("❌ Error en Notas para RH y Observaciones:", error);
    currentY += 35;
}

// --- Fin de la sección Notas y Observaciones ---

// ===============================
// Constelación 11: Sección Trillizos (VERSIÓN DIAMANTE PULIDO)
// ===============================

currentY += 2; // Espacio después de la sección anterior

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const TRILLIZO_HEIGHT_1 = 20;     // 📏 Altura del rectángulo 1 (EDITABLE) - TUS ALTURAS PERSONALIZADAS
const TRILLIZO_HEIGHT_2 = 20;     // 📏 Altura del rectángulo 2 (EDITABLE) - TUS ALTURAS PERSONALIZADAS  
const TRILLIZO_HEIGHT_3 = 20;     // 📏 Altura del rectángulo 3 (EDITABLE) - TUS ALTURAS PERSONALIZADAS
const BORDER_RADIUS_TRILLIZOS = 3; // 📏 Radio de bordes redondeados (EDITABLE)
const SEPARACION_TRILLIZOS = 3;    // 📏 Separación entre rectángulos en mm (EDITABLE)
const BORDER_WIDTH_TRILLIZOS = 0.8; // 📏 Grosor de líneas PRINCIPALES (EDITABLE) ← NUEVO!
const LINEAS_DIVISORAS_GROSOR = 0.4; // 📏 Grosor líneas divisoras internas (EDITABLE) ← NUEVO!
// =====================================================

try {
    // Verificar límites de página
    const alturaMaxima = Math.max(TRILLIZO_HEIGHT_1, TRILLIZO_HEIGHT_2, TRILLIZO_HEIGHT_3);
    const limitePagina = pageHeight - margin;
    if (currentY > limitePagina - alturaMaxima - 10) {
        console.log("📄 Nueva página para Sección Trillizos");
        doc.addPage();
        currentY = margin + 10;
    }
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES
    const anchoDisponible = contentWidth - (SEPARACION_TRILLIZOS * 2);
    const anchoTrillizo = anchoDisponible / 3;
    
    const trillizo1X = margin;
    const trillizo2X = margin + anchoTrillizo + SEPARACION_TRILLIZOS;
    const trillizo3X = margin + (anchoTrillizo * 2) + (SEPARACION_TRILLIZOS * 2);
    
    const baseY = currentY;
    
    // Configurar estilo de líneas PRINCIPALES
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(BORDER_WIDTH_TRILLIZOS);
    
    // === TRILLIZO 1: DECLARACIÓN DE VERACIDAD ===
    try {
        doc.roundedRect(trillizo1X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_1, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo1X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_1, 'S');
    }
    
    // Título
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(50, 50, 50);
    doc.text("Hago constar que mis respuestas", trillizo1X + 2, baseY + 4);
    doc.text("son verdaderas", trillizo1X + 2, baseY + 7);
    
    // Línea para firma
    const lineaFirmaY = baseY + TRILLIZO_HEIGHT_1 - 8;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    doc.line(trillizo1X + 2, lineaFirmaY, trillizo1X + anchoTrillizo - 2, lineaFirmaY);
    
    // Texto pequeño debajo de la línea
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 4);
    doc.setTextColor(100, 100, 100);
    doc.text("Firma del solicitante", trillizo1X + 2, lineaFirmaY + 3);
    
    // === TRILLIZO 2: SUELDO ACORDADO (VERSIÓN DIAMANTE) ===
    try {
        doc.roundedRect(trillizo2X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_2, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo2X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_2, 'S');
    }
    
    // 💎 ENCABEZADO CON RELLENO Y TÍTULO BLANCO
    const alturaEncabezado = 6;
    
    // Dibujar rectángulo de relleno para el encabezado
    doc.setFillColor(100, 100, 100); // Gris para el relleno
    try {
        // Rectángulo con esquinas redondeadas solo arriba
        doc.roundedRect(trillizo2X, baseY, anchoTrillizo, alturaEncabezado, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'F');
        // Rectángulo normal para cubrir la parte inferior y que quede cuadrado abajo
        doc.rect(trillizo2X, baseY + 2, anchoTrillizo, alturaEncabezado - 2, 'F');
    } catch (e) {
        doc.rect(trillizo2X, baseY, anchoTrillizo, alturaEncabezado, 'F');
    }
    
    // Título encabezado en BLANCO y BOLD
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(255, 255, 255); // ✨ BLANCO
    const tituloSueldo = "Sueldo acordado";
    const tituloSueldoWidth = doc.getTextWidth(tituloSueldo);
    const centroTrillizo2 = trillizo2X + (anchoTrillizo / 2);
    doc.text(tituloSueldo, centroTrillizo2 - (tituloSueldoWidth / 2), baseY + 4);
    
    // 💎 LÍNEAS DIVISORAS MÁS DELGADAS Y SUTILES
    doc.setDrawColor(150, 150, 150); // Gris más claro y sutil
    doc.setLineWidth(LINEAS_DIVISORAS_GROSOR); // Líneas más delgadas
    
    // Línea divisoria vertical en el medio
    const divisorX = centroTrillizo2;
    doc.line(divisorX, baseY + alturaEncabezado, divisorX, baseY + TRILLIZO_HEIGHT_2);
    
    // Configurar las 4 casillas (2x2)
    const alturaCasilla = (TRILLIZO_HEIGHT_2 - alturaEncabezado) / 2;
    
    // Línea horizontal divisoria
    const divisorY = baseY + alturaEncabezado + alturaCasilla;
    doc.line(trillizo2X, divisorY, trillizo2X + anchoTrillizo, divisorY);
    
    // Texto en las casillas izquierdas
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 3);
    doc.setTextColor(70, 70, 70);
    
    // Casilla superior izquierda
    doc.text("Sueldo semanal $", trillizo2X + 1, baseY + alturaEncabezado + 4);
    
    // Casilla inferior izquierda  
    doc.text("Sueldo mensual $", trillizo2X + 1, baseY + alturaEncabezado + 4 + alturaCasilla);
    
    // === TRILLIZO 3: AUTORIZACIÓN RH ===
    // Restaurar grosor de línea principal
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(BORDER_WIDTH_TRILLIZOS);
    
    try {
        doc.roundedRect(trillizo3X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_3, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo3X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_3, 'S');
    }
    
    // Título
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(50, 50, 50);
    doc.text("Autorización RH", trillizo3X + 2, baseY + 4);
    
    // Línea para firma
    const lineaFirmaRHY = baseY + TRILLIZO_HEIGHT_3 - 8;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    doc.line(trillizo3X + 2, lineaFirmaRHY, trillizo3X + anchoTrillizo - 2, lineaFirmaRHY);
    
    // Texto pequeño debajo de la línea
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 4);
    doc.setTextColor(100, 100, 100);
    doc.text("Firma del entrevistador", trillizo3X + 2, lineaFirmaRHY + 3);
    
    // Actualizar currentY
    const alturaMaximaReal = Math.max(TRILLIZO_HEIGHT_1, TRILLIZO_HEIGHT_2, TRILLIZO_HEIGHT_3);
    currentY = baseY + alturaMaximaReal + 8;
    
    console.log("✅ Sección Trillizos DIAMANTE PULIDO completada exitosamente");

} catch (error) {
    console.error("❌ Error en Sección Trillizos:", error);
    currentY += 35;
}

// --- Fin de la sección Trillizos ---

// ===============================
// 🍒 CERECITA DEL PASTEL: Copyright como Pie de Página
// ===============================

// Esta función se ejecuta AL FINAL de todo el PDF, después de todas las constelaciones
function agregarCopyrightPiePagina() {
    try {
        // Obtener información de la página actual
        const totalPaginas = doc.internal.getNumberOfPages();
        const paginaActual = doc.internal.getCurrentPageInfo().pageNumber;
        
        // Aplicar el copyright a TODAS las páginas
        for (let i = 1; i <= totalPaginas; i++) {
            doc.setPage(i);
            
            // 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS DE COPYRIGHT
            // =====================================================
            const PIE_PAGINA_Y = pageHeight - 15;        // 📏 Posición Y del pie de página (EDITABLE)
            const SEPARACION_LINEAS = 3;                // 📏 Separación entre líneas (EDITABLE)
            const TAMAÑO_TEXTO_PRINCIPAL = 8;           // 📏 Tamaño texto principal (EDITABLE)
            const TAMAÑO_TEXTO_DESARROLLADOR = 7;       // 📏 Tamaño texto desarrollador (EDITABLE)
            // =====================================================
            
            // === LÍNEA 1: TEXTO PRINCIPAL ===
            doc.setFont(FONT_BOLD, 'bold');
            doc.setFontSize(TAMAÑO_TEXTO_PRINCIPAL);
            doc.setTextColor(80, 80, 80); // Gris profesional
            
            const textoPrincipal = "Este documento fue creado con SEMP la aplicación de solicitud de Empleo más avanzada del mundo.";
            const anchoPrincipal = doc.getTextWidth(textoPrincipal);
            const xPrincipal = (pageWidth - anchoPrincipal) / 2; // Centrado
            
            doc.text(textoPrincipal, xPrincipal, PIE_PAGINA_Y);
            
            // === LÍNEA 2: DESARROLLADOR CON ESTILO GOOGLE ===
            doc.setFont(FONT_NORMAL, 'normal');
            doc.setFontSize(TAMAÑO_TEXTO_DESARROLLADOR);
            
            // Texto "desarrollador" en gris
            const textoDesarrollador = "desarrollador    ";
            doc.setTextColor(120, 120, 120);
            const anchoDesarrollador = doc.getTextWidth(textoDesarrollador);
            
            // Texto "Creative-JM" con colores de Google
            const textoLogo = "Creative-JM";
            doc.setFont(FONT_BOLD, 'bold');
            
            // Calcular posición centrada para toda la línea
            const anchoTotal = anchoDesarrollador + doc.getTextWidth(textoLogo);
            const xInicio = (pageWidth - anchoTotal) / 2;
            
            // Dibujar "desarrollador"
            doc.setTextColor(120, 120, 120);
            doc.text(textoDesarrollador, xInicio, PIE_PAGINA_Y + SEPARACION_LINEAS);
            
            // Dibujar "Creative-JM" con colores de Google (cada letra un color)
            const coloresGoogle = [
                [66, 133, 244],   // Azul Google - C
                [234, 67, 53],    // Rojo Google - r
                [251, 188, 5],    // Amarillo Google - e
                [52, 168, 83],    // Verde Google - a
                [66, 133, 244],   // Azul Google - t
                [52, 168, 83],    // Verde Google - i
                [234, 67, 53],    // Rojo Google - v
                [251, 188, 5],    // Amarillo Google - e
                [66, 133, 244],   // Azul Google - -
                [52, 168, 83],    // Verde Google - J
                [234, 67, 53],    // Rojo Google - M
            ];
            
            let xActual = xInicio + anchoDesarrollador;
            
            for (let j = 0; j < textoLogo.length; j++) {
                const letra = textoLogo[j];
                const color = coloresGoogle[j % coloresGoogle.length];
                
                doc.setTextColor(color[0], color[1], color[2]);
                doc.text(letra, xActual, PIE_PAGINA_Y + SEPARACION_LINEAS);
                
                xActual += doc.getTextWidth(letra);
            }
        }
        
        console.log("🍒 Copyright/Pie de página agregado exitosamente a todas las páginas");
        
    } catch (error) {
        console.error("❌ Error agregando copyright:", error);
    }
}

// === LLAMAR LA FUNCIÓN AL FINAL DE TODO EL PDF ===
// (Esto va después de todas las constelaciones, al final del código)
agregarCopyrightPiePagina();

// ===============================
    // --- Guardar el PDF ---
    // ===============================

    try {
        doc.save('SEMP.pdf');
        console.log("Generando PDf...");
        alert("¡Solicitud de Empleo generada en PDF!");
    } catch (e) {
        console.error("Error al guardar el PDF:", e);
        alert("Hubo un error al intentar guardar el PDF.");
    }
}

// ===============================
// 🔥 ARSENAL ANTI-VILLANOS: OPERACIÓN BOTONES DEL DESTINO
// ===============================

// 🆓 FUNCIÓN #1: PDF Gratuito con marca de agua
function generarPDFGratuito() {
    console.log("Generando PDF GRATUITO con marca de agua...");
    
    // Verificar si jsPDF está disponible
    if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
        console.error("Error: La librería jsPDF no está cargada.");
        alert("Error al generar el PDF. La librería necesaria no está disponible.");
        return;
    }

    const { jsPDF } = jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
    });

    // ⚡ COPIAR TODO EL CONTENIDO DE TU FUNCIÓN generarPDF() EXISTENTE
    // (Todo lo que está entre "const { jsPDF } = jspdf;" y "doc.save")
    // ===============================
    // MARGEN DEL DOCUMENTO
    // ===============================
    // --- Constantes y Configuraciones del PDF ---
    const margin = 10; // Margen reducido para más espacio
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);

     // --- La Partícula de Dios: currentY declarado UNA SOLA VEZ para todo el documento ---
    let currentY = margin; // Posición Y actual, se incrementará al añadir contenido

    // --- Estilos ---
    const FONT_NORMAL = "helvetica";
    const FONT_BOLD = "helvetica";
    const COLOR_TEXT = "#495057";
    const COLOR_LABEL = "#495057";
    const COLOR_HEADER_BG = document.getElementById('colorPicker')?.value || "#93c55d";
    const COLOR_HEADER_TEXT = document.getElementById('headerPreview')?.style.color || "white";
    const FONT_SIZE_TITLE = 16;
    const FONT_SIZE_H2 = 10;
    const FONT_SIZE_H3 = 10;
    const FONT_SIZE_NORMAL = 8;
    const FONT_SIZE_SMALL = 7;
    const LINE_HEIGHT_NORMAL = 4; // Esta constante define la altura normal del espaciado entre renglones (líneas) en el PDF, útil para mantener una distancia consistente entre los campos de texto.

    // --- Nuevas Constantes para Posicionamiento Dinámico en Cabecera ---
    const PHOTO_FIXED_WIDTH = 20;
    const HEADER_FIELD_SPACING = 5;
    const HEADER_LEFT_MARGIN = margin + 1;

    // --- Constante para datos no ingresados ---
    const NO_DATA_TEXT = "Sin datos ingresados";
    

    // --- Funciones Auxiliares para PDF ---

    // Añadir texto con salto de línea automático y manejo de Y
    function addText(text, x, y, options = {}) {
        const { fontSize = FONT_SIZE_NORMAL, fontStyle = 'normal', align = 'left', maxWidth = contentWidth, color = COLOR_TEXT } = options;
        doc.setFontSize(fontSize);
        doc.setFont(FONT_NORMAL, fontStyle);
        doc.setTextColor(color);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y, { align: align });
        return y + (lines.length * (fontSize / 1)); // Aproximación del alto del texto (ajustar si es necesario)
    }

    // Añadir un par Label: Valor
    function addLabelValue(label, value, x, y, labelWidth = 40, valueMaxWidth = contentWidth - x - labelWidth - 2) {
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL);
        doc.setTextColor(COLOR_LABEL);
        doc.text(label + ":", x, y + LINE_HEIGHT_NORMAL);

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setTextColor(COLOR_TEXT);
        const valueLines = doc.splitTextToSize(String(value || NO_DATA_TEXT), valueMaxWidth); // Usar NO_DATA_TEXT si está vacío
        doc.text(valueLines, x + labelWidth, y + LINE_HEIGHT_NORMAL);

        // Devuelve la posición Y después de añadir el valor (considerando múltiples líneas)
        return y + (valueLines.length * LINE_HEIGHT_NORMAL);
    }

    // Añadir Título de Sección H2
    function addSectionTitle(title, y) {
        doc.setFontSize(FONT_SIZE_H2);
        doc.setFont(FONT_BOLD, 'bold');
        doc.setTextColor(COLOR_TEXT);
        doc.text(title, margin, y + 2); // Espacio fijo para el título
        // Línea divisoria debajo del título
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y + 3.5, pageWidth - margin, y + 3.5);
        return y + 5; // **ESTA LÍNEA ES ESENCIAL Y SE HABÍA PERDIDO O MOVIDO**
    }

    // --- Contenido del PDF ---

    // ===============================
    // Membrete: (20 mm de altura)
    // ===============================
    const MEMBRETE_HEIGHT = 23;

    doc.setFillColor(COLOR_HEADER_BG);
    doc.rect(margin, currentY, contentWidth, MEMBRETE_HEIGHT, 'F'); // Rectángulo de cabecera con altura fija

    doc.setFontSize(FONT_SIZE_TITLE);
    doc.setFont(FONT_BOLD, 'bold');
    doc.setTextColor(COLOR_HEADER_TEXT);
    doc.text("SOLICITUD DE EMPLEO 2025", margin + 5, currentY + 8);

    // --- Datos de Aspiración Laboral en la cabecera - POSICIONAMIENTO DINÁMICO ---
    doc.setFontSize(FONT_SIZE_SMALL);
    doc.setTextColor(COLOR_HEADER_TEXT);
    let currentXHeaderFields = HEADER_LEFT_MARGIN;

    // --- Fecha ---
    const fechaCabecera = document.getElementById('fecha')?.value || NO_DATA_TEXT;
    const fechaText = `Fecha: ${fechaCabecera}`;
    const fechaWidth = doc.getTextWidth(fechaText, { fontSize: FONT_SIZE_SMALL, fontName: FONT_NORMAL, fontStyle: 'normal' });
    doc.text(fechaText, currentXHeaderFields, currentY + 15);
    currentXHeaderFields += fechaWidth + HEADER_FIELD_SPACING;

    // --- Puesto Solicitado ---
    const puestoCabecera = document.getElementById('puesto')?.value || NO_DATA_TEXT;
    const puestoText = `Puesto Solicitado: ${puestoCabecera}`;
    const puestoWidth = doc.getTextWidth(puestoText, { fontSize: FONT_SIZE_SMALL, fontName: FONT_NORMAL, fontStyle: 'normal' });
    doc.text(puestoText, currentXHeaderFields, currentY + 15);
    currentXHeaderFields += puestoWidth + HEADER_FIELD_SPACING;

    // --- Sueldo Deseado ---
    const sueldoCabecera = document.getElementById('sueldo_mensual_deseado')?.value || NO_DATA_TEXT;
    const sueldoText = `Sueldo Deseado: ${sueldoCabecera}`;
    const availableWidthForSueldo = pageWidth - margin - PHOTO_FIXED_WIDTH - currentXHeaderFields - HEADER_FIELD_SPACING;
    doc.text(sueldoText, currentXHeaderFields, currentY + 15, { maxWidth: availableWidthForSueldo > 0 ? availableWidthForSueldo : 0 });

    currentY += MEMBRETE_HEIGHT; // Actualizar currentY sumando la altura FIJA del membrete

    // ===============================
// Contorno Sutil Debajo del Membrete
// ===============================
const CONTOUR_HEIGHT = 5; // Altura del contorno rectangular

// === CAMBIO CLAVE AQUÍ: Define un color para "hacerlo invisible" o visible ===
// Establece el color de la línea a blanco para que se "funda" con el fondo del PDF
// O a otro color (ej. un gris claro como 200, 200, 200) para que sea sutilmente visible.
const CONTOUR_DRAW_COLOR = [255, 255, 255]; // Blanco puro (RGB) para invisibilidad
// const CONTOUR_DRAW_COLOR = [200, 200, 200]; // Un gris claro para hacerlo sutil
// const CONTOUR_DRAW_COLOR = COLOR_TEXT; // Para usar el color de texto normal si quieres que sea visible

// Guardar el estado gráfico actual para restaurarlo después (buena práctica general)
doc.saveGraphicsState();

// Establecer el color de la línea
doc.setDrawColor(CONTOUR_DRAW_COLOR[0], CONTOUR_DRAW_COLOR[1], CONTOUR_DRAW_COLOR[2]); // Usamos RGB

// Establecer el ancho de la línea (puede ser muy delgado para un efecto sutil si es visible, o cualquier valor si es blanco)
doc.setLineWidth(0.1); // Puedes ajustar este grosor si el contorno es visible

// Dibujar el contorno rectangular
doc.rect(margin, currentY, contentWidth, CONTOUR_HEIGHT, 'S'); // 'S' para stroke (contorno)

// Restaurar el estado gráfico original para que el resto del documento no se vea afectado
doc.restoreGraphicsState();

currentY += CONTOUR_HEIGHT; // Actualizar currentY sumando la altura del contorno

// ===============================
// Constelación 1: Datos Personales (35 mm de altura)
// ===============================
const DATOS_PERSONALES_HEIGHT = 45; // Altura fija de 35mm
let datosPersonalesStartY = currentY; // Guardamos el inicio de esta sección (que ya viene del contorno)

currentY = addSectionTitle("Datos Personales", currentY);
let col1X = margin;
let col2X = margin + (contentWidth / 2) + 5; // Segunda columna
let startYContent = currentY; // Y para el contenido real después del título de sección

// Aseguramos que las columnas empiecen desde el mismo Y,
// que es 'startYContent' después del título de la sección.
let y1 = startYContent;
y1 = addLabelValue("Apellido Paterno", document.getElementById('apellidoPaterno')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Apellido Materno", document.getElementById('apellidoMaterno')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Nombre(s)", document.getElementById('nombres')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Edad", document.getElementById('Edad')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Sexo", document.getElementById('sexo')?.value || NO_DATA_TEXT, col1X, y1);
const dobD = document.getElementById('diaNacimiento')?.value || NO_DATA_TEXT;
const dobM = document.getElementById('mesNacimiento')?.options[document.getElementById('mesNacimiento')?.selectedIndex]?.text || NO_DATA_TEXT;
const dobA = document.getElementById('anioNacimiento')?.value || NO_DATA_TEXT;
y1 = addLabelValue("Fecha Nacimiento", `${dobD}-${dobM}-${dobA}`, col1X, y1);
y1 = addLabelValue("Lugar Nacimiento", `${document.getElementById('ciudadNacimiento')?.value || NO_DATA_TEXT}, ${document.getElementById('estadoNacimiento')?.value || NO_DATA_TEXT}`, col1X, y1);
y1 = addLabelValue("Nacionalidad", document.getElementById('nacionalidad')?.value || NO_DATA_TEXT, col1X, y1);
y1 = addLabelValue("Dirección", document.getElementById('direccion')?.value || NO_DATA_TEXT, col1X, y1, 40);

let y2 = startYContent; // También la inicializamos con startYContent
y2 = addLabelValue("Colonia", document.getElementById('colonia')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Código Postal", document.getElementById('codigoPostal')?.value || NO_DATA_TEXT, col2X, y2, 30);
const tel = `(${(document.getElementById('codigoPais')?.value || NO_DATA_TEXT)}) ${document.getElementById('telefono')?.value || NO_DATA_TEXT}`;
y2 = addLabelValue("Teléfono", tel, col2X, y2, 30);
y2 = addLabelValue("Correo Electrónico", document.getElementById('emailPersonal')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Estado Civil", document.getElementById('estadoCivil')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Vive con", document.getElementById('viveCon')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Dependientes", document.getElementById('dependientes')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Estatura (cm)", document.getElementById('estatura')?.value || NO_DATA_TEXT, col2X, y2, 30);
y2 = addLabelValue("Peso (kg)", document.getElementById('peso')?.value || NO_DATA_TEXT, col2X, y2, 30);

// Después de dibujar todo el contenido de la sección:
// Actualizar currentY con la posición inicial de la sección más su altura FIJA deseada.
currentY = datosPersonalesStartY + DATOS_PERSONALES_HEIGHT;

// ===============================
// Constelación 2: Documentación
// ===============================
const DOCUMENTACION_HEIGHT = 27;
let documentacionStartY = currentY;

// Título de la sección
currentY = addSectionTitle("Documentación", currentY);

// Coordenadas Y iniciales para las columnas
let docY1 = currentY;
let docY2 = currentY;

// Primera columna
docY1 = addLabelValue("NSS", document.getElementById('nss')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("RFC", document.getElementById('rfc')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("CURP", document.getElementById('curp')?.value || NO_DATA_TEXT, col1X, docY1);
docY1 = addLabelValue("AFORE", document.getElementById('afore')?.value || NO_DATA_TEXT, col1X, docY1);

// Segunda columna
docY2 = addLabelValue("Cartilla Militar", document.getElementById('cartilla')?.value || NO_DATA_TEXT, col2X, docY2, 45);
docY2 = addLabelValue("Pasaporte", document.getElementById('pasaporte')?.value || NO_DATA_TEXT, col2X, docY2, 45);
const licenciaTexto = document.getElementById('licenciaManejo')?.value === 'si'
    ? `Sí - ${document.getElementById('claseLicencia')?.value || NO_DATA_TEXT}`
    : NO_DATA_TEXT;
docY2 = addLabelValue("Licencia de Manejo", licenciaTexto, col2X, docY2, 45);
docY2 = addLabelValue("Documento Extranjero", document.getElementById('documentoExtranjero')?.value || NO_DATA_TEXT, col2X, docY2, 45);

// Al final de la sección Documentación, después de dibujar todo el contenido:
currentY = documentacionStartY + DOCUMENTACION_HEIGHT;

// ===============================
// Constelación 3: Estado de Salud y Hábitos Personales (25 mm de altura)
// ===============================
const SALUD_HABITOS_HEIGHT = 23;
let saludHabitosStartY = currentY;

currentY = addSectionTitle("Estado de Salud y Hábitos Personales", currentY);
startYContent = currentY;

// Primera columna
y1 = startYContent;
y1 = addLabelValue("Estado Salud Actual", document.getElementById('estadoSalud')?.value || NO_DATA_TEXT, col1X, y1);
const enfCronica = document.querySelector('input[name="enfermedadCronica"]:checked')?.value === 'si' 
    ? `Sí - ${document.getElementById('cualEnfermedad')?.value || NO_DATA_TEXT}` 
    : document.querySelector('input[name="enfermedadCronica"]:checked')?.value === 'no' 
    ? 'No' 
    : NO_DATA_TEXT;
y1 = addLabelValue("Enfermedad Crónica", enfCronica, col1X, y1);
y1 = addLabelValue("Deporte", document.getElementById('deportePractica')?.value || NO_DATA_TEXT, col1X, y1);

// Segunda columna
y2 = startYContent;
const club = document.getElementById('clubSocial')?.value === 'si' 
    ? `Sí - ${document.getElementById('nombreClub')?.value || NO_DATA_TEXT}` 
    : document.getElementById('clubSocial')?.value === 'no' 
    ? 'No' 
    : NO_DATA_TEXT;
y2 = addLabelValue("Club Social/Deportivo", club, col2X, y2, 45);
y2 = addLabelValue("Pasatiempo", document.getElementById('pasatiempo')?.value || NO_DATA_TEXT, col2X, y2, 45);
y2 = addLabelValue("Metas en la vida", document.getElementById('metaVida')?.value || NO_DATA_TEXT, col2X, y2, 45);

currentY = saludHabitosStartY + SALUD_HABITOS_HEIGHT; // Actualizar Y con la altura FIJA de la sección

// ===============================
// Constelación 4: Datos Familiares
// ===============================
const DATOS_FAMILIARES_HEIGHT = 34; // Altura estimada para esta sección
let datosFamiliaresStartY = currentY;

currentY = addSectionTitle("Datos Familiares", currentY);
let contentStartY = currentY + 2; // Espacio entre TITULO LINEA-DIV Y ENCABEZADOS
currentY = contentStartY;

// --- Configuraciones de Texto y Espaciado ---
const labelFontSize = FONT_SIZE_NORMAL;
const headerFontSize = FONT_SIZE_H3 - 1;
const contentFontSize = FONT_SIZE_NORMAL - 1;
const contentLineHeight = LINE_HEIGHT_NORMAL;
const rowVerticalSpacing = 1.5;
const columnSpacing = 4;
const siTextColor = '#28a745';
const noTextColor = '#dc3545';
const userDataColor = '#495057';
const labelColor = COLOR_TEXT;
const crossSymbol = "✝";
const MIN_COL_WIDTH = 10;
const SECTION_SPACING = 3; // Espaciado al final de la sección

// --- === CONFIGURACIÓN MANUAL DE POSICIONES HORIZONTALES (X) === ---
const col1_NombresX = margin;
const col2_ViveX = margin + 55;
const col3_DireccionX = margin + 73;
const col4_TelefonoX = margin + 135;
const col5_OcupacionX = margin + 165;

const endX = margin + contentWidth;

// --- Función segura para calcular MaxWidth ---
function calculateSafeMaxWidth(startX, nextX, defaultWidth = contentWidth) {
    if (isNaN(nextX) || nextX <= startX + columnSpacing) {
        const remainingWidth = endX - startX - columnSpacing;
        return Math.max(MIN_COL_WIDTH, remainingWidth > 0 ? remainingWidth : defaultWidth);
    }
    const calculatedWidth = nextX - startX - columnSpacing;
    return Math.max(MIN_COL_WIDTH, calculatedWidth);
}

// --- Preparar Datos a Mostrar (con manejo de "Sin datos ingresados") ---
const familiares = [
    { // Padre
        nombre: document.getElementById('nombrePadre')?.value || NO_DATA_TEXT,
        vive: document.getElementById('vivePadre')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('callePadre')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaPadre')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoPadre')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionPadre')?.value || NO_DATA_TEXT
    },
    { // Madre
        nombre: document.getElementById('nombreMadre')?.value || NO_DATA_TEXT,
        vive: document.getElementById('viveMadre')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('calleMadre')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaMadre')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoMadre')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionMadre')?.value || NO_DATA_TEXT
    },
    { // Esposo/a
        nombre: document.getElementById('nombreConyuge')?.value || NO_DATA_TEXT,
        vive: document.getElementById('viveConyuge')?.value?.toLowerCase() === 'si' ? true : false,
        direccion: `${document.getElementById('calleConyuge')?.value || NO_DATA_TEXT}, ${document.getElementById('coloniaConyuge')?.value || NO_DATA_TEXT}`,
        telefono: document.getElementById('telefonoConyuge')?.value || NO_DATA_TEXT,
        ocupacion: document.getElementById('ocupacionConyuge')?.value || NO_DATA_TEXT
    }
];
const rowLabels = ["Padre", "Madre", "Esposa (o)"];

try {
    // --- 1. Dibujar Cabeceras Conceptuales (Texto) ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(headerFontSize);
    doc.setTextColor(labelColor);
    doc.text("NOMBRES:", col1_NombresX, currentY);
    doc.text("¿VIVE?", col2_ViveX, currentY);
    doc.text("DIRECCIÓN:", col3_DireccionX, currentY);
    doc.text("TELÉFONO:", col4_TelefonoX, currentY);
    doc.text("OCUPACIÓN:", col5_OcupacionX, currentY);

    currentY += contentLineHeight + rowVerticalSpacing; // Añadir espaciado después de cabeceras

    // --- 2. Dibujar Datos de Familiares (Padre, Madre, Esposo/a) ---
    for (let i = 0; i < familiares.length; i++) {
        const familiar = familiares[i];
        const label = `${rowLabels[i]}:`;
        let rowStartY = currentY;
        let maxTextHeightThisRow = 0;

        // --- Columna 1: Etiqueta y Nombre ---
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(labelFontSize);
        doc.setTextColor(labelColor);
        doc.text(label, col1_NombresX, currentY);
        const labelWidth = doc.getTextWidth(label);
        const nombreStartX = col1_NombresX + labelWidth + columnSpacing;
        const nombreMaxWidth = calculateSafeMaxWidth(nombreStartX, col2_ViveX);
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const nombreText = familiar.nombre;
        const nombreLines = doc.splitTextToSize(nombreText, nombreMaxWidth);
        doc.text(nombreLines, nombreStartX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, nombreLines.length * contentLineHeight);

        // --- Columna 2: ¿Vive? (Sí/No/Círculo Rojo) ---
doc.setFont(FONT_BOLD, 'bold');
doc.setFontSize(contentFontSize);

// Obtener el valor original del select según la fila actual
let viveValue = '';
if (i === 0) { // Padre
    viveValue = document.getElementById('vivePadre')?.value;
} else if (i === 1) { // Madre
    viveValue = document.getElementById('viveMadre')?.value;
} else if (i === 2) { // Cónyuge
    viveValue = document.getElementById('viveConyuge')?.value;
}

if (viveValue === 'si') {
    // Usuario seleccionó "Sí"
    doc.setTextColor(siTextColor);
    const viveText = "Sí";
    const viveTextWidth = doc.getTextWidth(viveText);
    let finalViveTextX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= viveTextWidth + 2) {
        finalViveTextX = col2_ViveX + (viveAreaWidth / 2) - (viveTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalViveTextX = col2_ViveX + 2;
    }
    doc.text(viveText, finalViveTextX, currentY);
} else if (viveValue === 'no') {
    // Usuario seleccionó "No"
    doc.setTextColor(noTextColor);
    const viveText = "No";
    const viveTextWidth = doc.getTextWidth(viveText);
    let finalViveTextX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= viveTextWidth + 2) {
        finalViveTextX = col2_ViveX + (viveAreaWidth / 2) - (viveTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalViveTextX = col2_ViveX + 2;
    }
    doc.text(viveText, finalViveTextX, currentY);
} else {
    // Usuario no seleccionó nada - GUIÓN
    doc.setTextColor(noTextColor); // Mantener color rojo para que destaque
    const guionText = "-";
    const guionTextWidth = doc.getTextWidth(guionText);
    let finalGuionX = col2_ViveX;
    const viveAreaWidth = col3_DireccionX - col2_ViveX - columnSpacing;
    if (viveAreaWidth >= guionTextWidth + 2) {
        finalGuionX = col2_ViveX + (viveAreaWidth / 2) - (guionTextWidth / 2);
    } else if (viveAreaWidth > 0) {
        finalGuionX = col2_ViveX + 2;
    }
    doc.text(guionText, finalGuionX, currentY);
}
maxTextHeightThisRow = Math.max(maxTextHeightThisRow, contentLineHeight);

        // --- Columna 3: Dirección ---
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const direccionText = familiar.direccion;
        const direccionMaxWidth = calculateSafeMaxWidth(col3_DireccionX, col4_TelefonoX);
        const direccionLines = doc.splitTextToSize(direccionText, direccionMaxWidth);
        doc.text(direccionLines, col3_DireccionX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, direccionLines.length * contentLineHeight);

        // --- Columna 4: Teléfono ---
        let telefonoText = '';
        let telefonoColor = userDataColor;
        const isEmptyPhone = !familiar.telefono || familiar.telefono.trim() === '' || familiar.telefono.trim() === NO_DATA_TEXT || familiar.telefono.trim() === '-';
        if (!familiar.vive && isEmptyPhone) { // Si no vive Y no hay teléfono, mostrar cruz
            telefonoText = crossSymbol;
            telefonoColor = labelColor;
        } else {
            telefonoText = familiar.telefono; // Ya viene con NO_DATA_TEXT si estaba vacío
        }
        doc.setTextColor(telefonoColor);
        const telefonoMaxWidth = calculateSafeMaxWidth(col4_TelefonoX, col5_OcupacionX);
        const telefonoLines = doc.splitTextToSize(telefonoText, telefonoMaxWidth);
        doc.text(telefonoLines, col4_TelefonoX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, telefonoLines.length * contentLineHeight);

        // --- Columna 5: Ocupación ---
        doc.setTextColor(userDataColor);
        const ocupacionText = familiar.ocupacion;
        const ocupacionMaxWidth = calculateSafeMaxWidth(col5_OcupacionX, endX);
        const ocupacionLines = doc.splitTextToSize(ocupacionText, ocupacionMaxWidth);
        doc.text(ocupacionLines, col5_OcupacionX, currentY);
        maxTextHeightThisRow = Math.max(maxTextHeightThisRow, ocupacionLines.length * contentLineHeight);

        // Mover Y para la siguiente fila
        currentY = rowStartY + maxTextHeightThisRow + rowVerticalSpacing;
    }

    // --- 3. Dibujar Datos de Hijos ---
    let hijosRowStartY = currentY;
    const hijosLabelText = "Nombres y edades de los hijos:";
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(labelFontSize);
    doc.setTextColor(labelColor);
    doc.text(hijosLabelText, col1_NombresX, currentY);
    
    currentY += contentLineHeight; // Espacio después de la etiqueta de hijos

    const tieneHijos = document.getElementById('tieneHijos')?.value;
    let hijosDataText = '';
    
    if (tieneHijos === 'si') {
    const cantidadHijosInput = document.getElementById('cantidadHijos');
    const cantidadHijos = cantidadHijosInput ? parseInt(cantidadHijosInput.value) : 0;
    if (cantidadHijos > 0) {
        let hijosArray = [];
        for (let j = 1; j <= cantidadHijos; j++) {
    const nombreHijo = document.getElementById(`nombreHijo${j}`)?.value || '';
    const edadHijo = document.getElementById(`edadHijo${j}`)?.value || '';
    
    // Si ambos campos están vacíos, mostrar solo interrogaciones
    if (!nombreHijo.trim() && !edadHijo.trim()) {
        hijosArray.push(`(¿?) (¿?) (¿?)`);
    } else {
        // Si tiene datos, usar el formato normal
        const nombreFinal = nombreHijo.trim() || '(¿?)';
        const edadFinal = edadHijo.trim() || '(¿?)';
        hijosArray.push(`${nombreFinal} ${edadFinal} años`);
    }
}
        hijosDataText = hijosArray.join(' | ');
    } else {
        hijosDataText = NO_DATA_TEXT;
    }
} else if (tieneHijos === 'no') {
    hijosDataText = "No tiene hijos";
} else {
    hijosDataText = NO_DATA_TEXT; // Para "(¿?)" o cualquier otro valor
}

    if (hijosDataText) {
        doc.setFontSize(contentFontSize);
        doc.setTextColor(userDataColor);
        const hijosDataStartX = col1_NombresX;
        const hijosDataMaxWidth = calculateSafeMaxWidth(hijosDataStartX, endX);
        const hijosDataLines = doc.splitTextToSize(hijosDataText, hijosDataMaxWidth);
        
        doc.text(hijosDataLines, hijosDataStartX, currentY); 
        
        currentY += hijosDataLines.length * contentLineHeight;
    }
    
    currentY += SECTION_SPACING; // Añade un espacio final después de toda la sección

} catch (error) {
    console.error("Error dibujando sección Datos Familiares:", error);
    currentY += SECTION_SPACING; // Mueve currentY para la siguiente sección
}

// Actualizar currentY para la siguiente sección (opcional: usar altura fija o dinámica)
// Si prefieres altura fija: currentY = datosFamiliaresStartY + DATOS_FAMILIARES_HEIGHT;
// Si prefieres dinámica: el currentY ya está actualizado arriba

// ===============================
// Constelación 5: Escolaridad
// ===============================
// Calculamos el punto de inicio para Escolaridad forzando 3mm después de donde currentY
// quedó al final de la sección anterior (Datos Familiares).
currentY += 0.1; // ¡3mm de distancia fija!

try {
    // --- Comienza el dibujo del Título de la Sección de Escolaridad ---
    currentY = addSectionTitle("Escolaridad", currentY); 
    let escolaridadContentStartY = currentY + 2; // Espacio entre TITULO LINEA-DIV Y ENCABEZADOS
    currentY = escolaridadContentStartY; // Actualiza currentY para el contenido

    // --- Configuraciones de Texto y Espaciado ---
    const escolaridadLevelLabelFontSize = FONT_SIZE_NORMAL;
    const escolaridadHeaderFontSize = FONT_SIZE_H3 - 1;
    const escolaridadContentFontSize = FONT_SIZE_NORMAL - 1;
    const escolaridadContentLineHeight = LINE_HEIGHT_NORMAL;
    const escolaridadRowVerticalSpacing = 1;
    const labelDataVerticalSpacing = 1;
    const escolaridadColumnSpacing = 1;
    const escolaridadUserDataColor = '#495057';
    const escolaridadLabelColor = COLOR_TEXT;
    const SECTION_SPACING = 3; // Espaciado al final de la sección
// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - CONSTANTE EXCLUSIVA ESCOLARIDAD
// =====================================================
const ESCOLARIDAD_SIN_DATOS = "-"; // 📏 Texto para encabezados sin datos (EDITABLE)
// =====================================================
    const col1_NombreEscuelaX = margin;
    const col2_DireccionX = margin + 60;
    const col3_PeriodoX = margin + 120;
    const col4_AnosX = margin + 145;
    const col5_TituloX = margin + 163;
    const escolaridadEndX = margin + contentWidth;

    function formatPeriodo(fechaInicioStr, anosCursados) {
    if (!fechaInicioStr) return "-";  // ← CAMBIO AQUÍ
    
    try {
        const inicioDate = new Date(fechaInicioStr + 'T00:00:00');
        if (isNaN(inicioDate.getTime())) return "-";  // ← CAMBIO AQUÍ

        const inicioYear = inicioDate.getFullYear();

        const anos = parseInt(anosCursados);
        if (!isNaN(anos) && anos > 0) {
            return `${inicioYear} - ${inicioYear + anos}`;
        } else {
            return `${inicioYear} - -`; // ← CAMBIO AQUÍ
        }
    } catch (e) {
        console.error("Error al formatear periodo:", e);
        return "-";  // ← CAMBIO AQUÍ
    }
}

    // --- Función Auxiliar para Calcular Ancho Máximo Seguro ---
    function calculateSafeMaxWidth(startX, endX) {
        return endX - startX - escolaridadColumnSpacing;
    }

    // --- Preparar Datos de Escolaridad (PARTE ANOMALIA EN CERCTIFICADOS)---
    const nivelesEducativos = [
        { idPrefix: 'Primaria', label: 'Primaria', defaultTitulo: '-' },
        { idPrefix: 'Secundaria', label: 'Secundaria o Prevocacional', defaultTitulo: '-' },
        { idPrefix: 'Preparatoria', label: 'Preparatoria o Vocacional', defaultTitulo: '-' },
        { idPrefix: 'Universidad', label: 'Profesional (Universidad)', defaultTitulo: '-' },
        { idPrefix: 'Adicionales', label: 'Comercial - (instituto)', defaultTitulo: '-' }
    ];

    const escolaridadData = nivelesEducativos.map(nivel => {
        const nombreId = `nombre${nivel.idPrefix}`;
        const dirId = `direccion${nivel.idPrefix}`;
        const inicioId = `periodo${nivel.idPrefix}Inicio`;
        const anosId = `anos${nivel.idPrefix}`;
        const tituloId = `titulo${nivel.idPrefix}`;

        const nombreEscuela = document.getElementById(nombreId)?.value;
        const fechaInicio = document.getElementById(inicioId)?.value;
        const anos = document.getElementById(anosId)?.value;
        const tituloInput = document.getElementById(tituloId)?.value;

        return {
            levelLabel: nivel.label,
            nombre: nombreEscuela && nombreEscuela.trim() !== '' ? nombreEscuela : ESCOLARIDAD_SIN_DATOS,
            direccion: document.getElementById(dirId)?.value && document.getElementById(dirId).value.trim() !== '' ? document.getElementById(dirId).value : ESCOLARIDAD_SIN_DATOS,
            periodo: formatPeriodo(fechaInicio, anos),
            anos: (anos && String(anos).trim() !== '') ? anos : ESCOLARIDAD_SIN_DATOS,
            titulo: (tituloInput && tituloInput.trim() !== '') ? tituloInput : (nivel.defaultTitulo || ESCOLARIDAD_SIN_DATOS)
        };
    });

    // --- 1. Dibujar Cabeceras (5 Columnas) ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(escolaridadHeaderFontSize);
    doc.setTextColor(escolaridadLabelColor);
    doc.text("NOMBRE DE LA ESCUELA", col1_NombreEscuelaX, currentY);
    doc.text("DIRECCIÓN:", col2_DireccionX, currentY);
    doc.text("PERIODO:", col3_PeriodoX, currentY);
    doc.text("AÑOS:", col4_AnosX, currentY);
    doc.text("TÍTULO RECIBIDO:", col5_TituloX, currentY);

    currentY += escolaridadContentLineHeight + escolaridadRowVerticalSpacing;

    // --- 2. Dibujar Datos de Escolaridad por Nivel ---
    for (const nivel of escolaridadData) {
        let rowStartY = currentY;
        let labelHeight = 0;
        let maxDataHeight = 0;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadLevelLabelFontSize);
        doc.setTextColor(escolaridadLabelColor);
        const levelLabelMaxWidth = calculateSafeMaxWidth(col1_NombreEscuelaX, col2_DireccionX);
        const labelLines = doc.splitTextToSize(nivel.levelLabel, levelLabelMaxWidth);
        labelHeight = labelLines.length * escolaridadContentLineHeight;
        doc.text(labelLines, col1_NombreEscuelaX, currentY);

        const dataY = currentY + labelHeight + labelDataVerticalSpacing;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadContentFontSize);
        doc.setTextColor(escolaridadUserDataColor);
        let currentDataLineHeight = 0;

        const nombreRealMaxWidth = calculateSafeMaxWidth(col1_NombreEscuelaX, col2_DireccionX);
        const nombreLines = doc.splitTextToSize(nivel.nombre, nombreRealMaxWidth);
        doc.text(nombreLines, col1_NombreEscuelaX, dataY);
        currentDataLineHeight = nombreLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const direccionMaxWidth = calculateSafeMaxWidth(col2_DireccionX, col3_PeriodoX);
        const direccionLines = doc.splitTextToSize(nivel.direccion, direccionMaxWidth);
        doc.text(direccionLines, col2_DireccionX, dataY);
        currentDataLineHeight = direccionLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const periodoMaxWidth = calculateSafeMaxWidth(col3_PeriodoX, col4_AnosX);
        const periodoLines = doc.splitTextToSize(nivel.periodo, periodoMaxWidth);
        doc.text(periodoLines, col3_PeriodoX, dataY);
        currentDataLineHeight = periodoLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const anosMaxWidth = calculateSafeMaxWidth(col4_AnosX, col5_TituloX);
        const anosLines = doc.splitTextToSize(String(nivel.anos), anosMaxWidth);
        doc.text(anosLines, col4_AnosX, dataY);
        currentDataLineHeight = anosLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        const tituloMaxWidth = calculateSafeMaxWidth(col5_TituloX, escolaridadEndX);
        const tituloLines = doc.splitTextToSize(nivel.titulo, tituloMaxWidth);
        doc.text(tituloLines, col5_TituloX, dataY);
        currentDataLineHeight = tituloLines.length * escolaridadContentLineHeight;
        maxDataHeight = Math.max(maxDataHeight, currentDataLineHeight);

        // Mover Y para el siguiente nivel
        currentY = rowStartY + labelHeight + labelDataVerticalSpacing + maxDataHeight + escolaridadRowVerticalSpacing;
    }

    // --- 3. Dibujar Estudios Actuales ---
    const estudiaActualmente = document.getElementById('estudiaSi')?.checked || false;

    if (estudiaActualmente) {
        let estudiosActualesRowY = currentY;
        let labelActualHeight = 0;
        let dataActualHeight = 0;

        const labelActualText = "Estudios que efectúa en la actualidad:";
        doc.setFont(FONT_NORMAL, 'bold');
        doc.setFontSize(escolaridadLevelLabelFontSize);
        doc.setTextColor(escolaridadLabelColor);
        const labelActualLines = doc.splitTextToSize(labelActualText, contentWidth);
        labelActualHeight = labelActualLines.length * escolaridadContentLineHeight;
        doc.text(labelActualLines, margin, currentY);

        const dataActualY = currentY + labelActualHeight + labelDataVerticalSpacing;

        const nombreInstActual = document.getElementById('institucionActual')?.value || NO_DATA_TEXT;
        const dirInstActual = document.getElementById('direccionActual')?.value || NO_DATA_TEXT;
        const fechaInicioActualStr = document.getElementById('fechaInicioActual')?.value;
        const fechaFinActualStr = document.getElementById('fechaFinActual')?.value;

        let periodoEstudioActual = '';
        const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let fechaInicioFormateada = NO_DATA_TEXT;
        if (fechaInicioActualStr) {
            try {
                const fechaInicioDate = new Date(fechaInicioActualStr + 'T00:00:00');
                if (!isNaN(fechaInicioDate.getTime())) {
                    fechaInicioFormateada = fechaInicioDate.toLocaleDateString('es-ES', opcionesFecha);
                }
            } catch (e) {
                console.error("Error al formatear fechaInicioActual:", e);
            }
        }

        let fechaFinFormateada = NO_DATA_TEXT;
        if (fechaFinActualStr) {
            try {
                const fechaFinDate = new Date(fechaFinActualStr + 'T00:00:00');
                if (!isNaN(fechaFinDate.getTime())) {
                    fechaFinFormateada = fechaFinDate.toLocaleDateString('es-ES', opcionesFecha);
                }
            } catch (e) {
                console.error("Error al formatear fechaFinActual:", e);
            }
        }
        
        periodoEstudioActual = `${fechaInicioFormateada} - ${fechaFinFormateada}`;

        const dataActualText = `Institución: ${nombreInstActual} | Domicilio: ${dirInstActual}. Periodo_Inicio y Fin: ${periodoEstudioActual}.`;

        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(escolaridadContentFontSize);
        doc.setTextColor(escolaridadUserDataColor);
        const dataActualLines = doc.splitTextToSize(dataActualText, contentWidth);
        dataActualHeight = dataActualLines.length * escolaridadContentLineHeight;
        doc.text(dataActualLines, margin, dataActualY);

        // Mover la posición Y para la siguiente sección
        currentY = estudiosActualesRowY + labelActualHeight + labelDataVerticalSpacing + dataActualHeight + SECTION_SPACING;
    } else {
        // Mover la posición Y incluso si no hay estudios actuales
        currentY += SECTION_SPACING / 2;
    }

} catch (error) {
    console.error("Error dibujando sección Escolaridad:", error);
    // Asegura que currentY avance aunque haya error, para no bloquear el resto del PDF
    currentY += SECTION_SPACING;
}
// --- Fin de la sección Escolaridad ---

// ===============================
// Constelación 6: Conocimientos Generales (Página 2)
// ===============================

// Forzamos el salto a la página 2 si estamos en la primera página y ya hay contenido.
if (doc.internal.getNumberOfPages() === 1 && currentY > margin) {
    doc.addPage();
    currentY = margin; // Reset currentY para la nueva página
} else {
    // Si ya estamos en página 2 o posterior, verificar si necesitamos salto de página
    if (currentY > pageHeight - 50) { // Si queda poco espacio
        doc.addPage();
        currentY = margin;
    }
}

currentY = addSectionTitle("Conocimientos Generales", currentY);
let conocimientosGeneralesStartY = currentY + 2;
currentY = conocimientosGeneralesStartY;

// --- Configuraciones de Texto y Espaciado para Conocimientos Generales ---
const conocimientosLabelFontSize = FONT_SIZE_NORMAL;
const conocimientosContentFontSize = FONT_SIZE_NORMAL - 1;
const conocimientosContentLineHeight = LINE_HEIGHT_NORMAL;
const conocimientosRowVerticalSpacing = 1;
const conocimientosLabelDataSpacing = 0;

// --- === CONFIGURACIÓN MANUAL DE POSICIONES HORIZONTALES (X) === ---
const colLeftX = margin;
const colRightX = margin + (contentWidth / 2) + 5;
const colWidth = (contentWidth / 2) - 10;
const colLeftEndX = colLeftX + colWidth;
const colRightEndX = colRightX + colWidth;

// --- Datos de Conocimientos Generales para el encolumnado ---
const conocimientosLayout = [
    {
        left: { label: "Funciones de oficina que el aspirante domina:", valueId: "funcionesOficinaDominadas", default: "No especificado" },
        right: { label: "Idiomas:", valueId: "idiomasDominados", default: "No especificado" }
    },
    {
        left: { label: "Máquinas de oficina o taller que sabe utilizar:", valueId: "maquinasOficinaTaller", default: "No especificado" },
        right: { label: "Nivel del idioma % (Ej: 90% Inglés):", valueId: "nivelIdiomaPorcentaje", default: "No especificado" }
    },
    {
        left: { label: "Otras funciones u oficios que domina:", valueId: "otrasFuncionesOficios", default: "No especificado" },
        right: { label: "Software que domina:", valueId: "softwareDominado", default: "No especificado" }
    }
];

try {
    // --- Dibujar cada par de campos de Conocimientos Generales ---
    for (const row of conocimientosLayout) {
        let rowStartY = currentY;
        let maxRowContentHeight = 0;

        // --- COLUMNA IZQUIERDA ---
        let currentColumnY = rowStartY;
        const leftUserData = document.getElementById(row.left.valueId)?.value || row.left.default;

        // Dibujar Etiqueta Izquierda
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(conocimientosLabelFontSize);
        doc.setTextColor(COLOR_TEXT);
        const leftLabelLines = doc.splitTextToSize(row.left.label, colWidth);
        doc.text(leftLabelLines, colLeftX, currentColumnY);
        let leftLabelHeight = leftLabelLines.length * conocimientosContentLineHeight;
        currentColumnY += leftLabelHeight + conocimientosLabelDataSpacing;

        // Dibujar Dato Izquierdo del Usuario
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(conocimientosContentFontSize);
        doc.setTextColor('#495057'); // COLOR FIJO en lugar de variable indefinida
        const leftDataLines = doc.splitTextToSize(leftUserData, colWidth);
        doc.text(leftDataLines, colLeftX, currentColumnY);
        let leftDataHeight = leftDataLines.length * conocimientosContentLineHeight;

        let totalLeftColumnHeight = leftLabelHeight + conocimientosLabelDataSpacing + leftDataHeight;
        maxRowContentHeight = Math.max(maxRowContentHeight, totalLeftColumnHeight);

        // --- COLUMNA DERECHA ---
        currentColumnY = rowStartY;
        const rightUserData = document.getElementById(row.right.valueId)?.value || row.right.default;

        // Dibujar Etiqueta Derecha
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(conocimientosLabelFontSize);
        doc.setTextColor(COLOR_TEXT);
        const rightLabelLines = doc.splitTextToSize(row.right.label, colWidth);
        doc.text(rightLabelLines, colRightX, currentColumnY);
        let rightLabelHeight = rightLabelLines.length * conocimientosContentLineHeight;
        currentColumnY += rightLabelHeight + conocimientosLabelDataSpacing;

        // Dibujar Dato Derecho del Usuario
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(conocimientosContentFontSize);
        doc.setTextColor('#495057'); // COLOR FIJO en lugar de variable indefinida
        const rightDataLines = doc.splitTextToSize(rightUserData, colWidth);
        doc.text(rightDataLines, colRightX, currentColumnY);
        let rightDataHeight = rightDataLines.length * conocimientosContentLineHeight;

        let totalRightColumnHeight = rightLabelHeight + conocimientosLabelDataSpacing + rightDataHeight;
        maxRowContentHeight = Math.max(maxRowContentHeight, totalRightColumnHeight);

        // --- Mover Y para la siguiente fila ---
        currentY = rowStartY + maxRowContentHeight + conocimientosRowVerticalSpacing;
    }

} catch (error) {
    console.error("Error dibujando sección Conocimientos Generales:", error);
    currentY += 10;
}

// --- Fin de la sección de Conocimientos Generales ---

// ===============================
// Constelación 7: Empleo Actual y Anteriores
// ===============================

currentY = addSectionTitle("(Empleos) Actual y Anteriores", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const CONCEPTO_WIDTH = 40;        // 📏 Ancho de la columna "CONCEPTO" (EDITABLE)
const COLUMN_SPACING = 1;         // 📏 Espacio entre columnas (EDITABLE)  
const ROW_SPACING = 0;            // 📏 Espacio entre filas (EDITABLE)
// =====================================================

try {
    // Obtener cantidad de empleos
    const cantidadEmpleosSelect = document.getElementById('cantidadEmpleos');
    const numEmpleos = parseInt(cantidadEmpleosSelect?.value) || 1;
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const availableWidth = contentWidth - CONCEPTO_WIDTH; // Espacio disponible para empleos
    const empleoColWidth = (availableWidth - (COLUMN_SPACING * numEmpleos)) / numEmpleos; // Ancho de cada columna de empleo
    
    // Posiciones X calculadas automáticamente
    const colConceptoX = margin;
    const empleoColumns = [];
    for (let i = 0; i < numEmpleos; i++) {
        empleoColumns.push(margin + CONCEPTO_WIDTH + (i * (empleoColWidth + COLUMN_SPACING)));
    }
    
    console.log(`📊 Distribución automática: ${numEmpleos} empleos, ${empleoColWidth.toFixed(1)}mm cada uno`);

    // 🏆 ALGORITMO SÚPER AVANZADO DETECTOR DE RENUNCIAS™
// Post-Debate Épico 2025 con Formato Reformado
function formatEmpleoPeriodo(fechaInicio, fechaRenuncia) {
    if (!fechaInicio) return '-';
    
    try {
        const inicioDate = new Date(fechaInicio + 'T00:00:00');
        
        // Función para formatear fecha DD/MM/AA
        const formatFecha = (date) => {
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const anio = String(date.getFullYear()).slice(-2);
            return `${dia}/${mes}/${anio}`;
        };
        
        // Función para verificar año bisiesto
        const esAñoBisiesto = (año) => {
            return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
        };
        
        // 🎯 FUNCIÓN PRINCIPAL: Detector de Renuncias
        const calcularDuracion = (fechaInicio, fechaFin) => {
            // REGLA: El día de renuncia NO cuenta como día laboral
            const tiempoTotal = fechaFin.getTime() - fechaInicio.getTime();
            let diasTotales = Math.floor(tiempoTotal / (1000 * 60 * 60 * 24));
            
            let años = 0;
            let meses = 0;
            let días = diasTotales;
            
            // Calcular años completos
            let fechaTemporal = new Date(fechaInicio);
            while (fechaTemporal.getFullYear() < fechaFin.getFullYear()) {
                const siguienteAño = new Date(fechaTemporal);
                siguienteAño.setFullYear(siguienteAño.getFullYear() + 1);
                
                if (siguienteAño <= fechaFin) {
                    años++;
                    fechaTemporal = siguienteAño;
                    días -= esAñoBisiesto(fechaTemporal.getFullYear() - 1) ? 366 : 365;
                } else {
                    break;
                }
            }
            
            // Calcular meses completos
            while (fechaTemporal.getMonth() < fechaFin.getMonth() || 
                   (fechaTemporal.getMonth() === fechaFin.getMonth() && fechaTemporal.getDate() < fechaFin.getDate())) {
                
                const siguienteMes = new Date(fechaTemporal);
                siguienteMes.setMonth(siguienteMes.getMonth() + 1);
                
                if (siguienteMes <= fechaFin) {
                    const diasEnMes = new Date(fechaTemporal.getFullYear(), fechaTemporal.getMonth() + 1, 0).getDate();
                    días -= diasEnMes;
                    meses++;
                    fechaTemporal = siguienteMes;
                } else {
                    break;
                }
            }
            
            // Los días restantes
            días = Math.max(0, días);
            
            // 🎨 FORMATO REFORMADO: Usar | en lugar de "y"
            let duracion = '';
            
            if (años > 0) {
                duracion += `${años} año${años !== 1 ? 's' : ''}`;
            }
            
            if (meses > 0) {
                if (duracion) duracion += ' | ';
                duracion += `${meses} mes${meses !== 1 ? 'es' : ''}`;
            }
            
            if (días > 0) {
                if (duracion) duracion += ' | ';
                duracion += `${días} día${días !== 1 ? 's' : ''}`;
            }
            
            return duracion || '0 días';
        };
        
        // Construir el resultado final
        let periodoStr = formatFecha(inicioDate);
        
        if (fechaRenuncia && fechaRenuncia.trim() !== '') {
            const finDate = new Date(fechaRenuncia + 'T00:00:00');
            
            if (!isNaN(finDate.getTime())) {
                periodoStr += `|-${formatFecha(finDate)}=`;
                const duracion = calcularDuracion(inicioDate, finDate);
                periodoStr += `(${duracion})`;
            } else {
                periodoStr += '|-Actual';
            }
        } else {
            periodoStr += '|-Actual';
        }
        
        return periodoStr;
        
    } catch (e) {
        console.error('Error en Detector de Renuncias™:', e);
        return '-';
    }
}

    // --- Recopilar datos de empleos ---
    const empleosData = [];
    for (let i = 1; i <= numEmpleos; i++) {
        const fechaIngreso = document.getElementById(`fechaIngreso${i}`)?.value;
        const fechaRenuncia = document.getElementById(`fechaRenuncia${i}`)?.value;

        empleosData.push({
            tiempoServicio: formatEmpleoPeriodo(fechaIngreso, fechaRenuncia),
            nombreEmpresa: document.getElementById(`nombreEmpresa${i}`)?.value || '-',
            direccion: document.getElementById(`direccionEmpresa${i}`)?.value || '-',
            telefono: document.getElementById(`telefonoEmpresa${i}`)?.value || '-',
            puestoDesempenado: document.getElementById(`puestoDesempenado${i}`)?.value || '-',
            sueldoGanabas: document.getElementById(`sueldoGanabas${i}`)?.value || '-',
            motivoSeparacion: document.getElementById(`motivoSeparacion${i}`)?.value || '-',
            nombreJefe: document.getElementById(`nombreJefe${i}`)?.value || '-',
            puestoJefe: document.getElementById(`puestoJefe${i}`)?.value || '-'
        });
    }

    // --- Dibujar Cabeceras ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(COLOR_TEXT);

    doc.text("CONCEPTO", colConceptoX, currentY);
    
    const titulos = ["ACTUAL O ÚLTIMO", "EMPLEO ANTERIOR", "EMPLEO PENÚLTIMO", "EMPLEO ANTEPENÚLTIMO"];
    for (let i = 0; i < numEmpleos; i++) {
        // Título adaptado al ancho de columna
        const tituloLines = doc.splitTextToSize(titulos[i] || `EMPLEO ${i+1}`, empleoColWidth);
        doc.text(tituloLines, empleoColumns[i], currentY);
    }

    currentY += LINE_HEIGHT_NORMAL + ROW_SPACING;

    // --- Dibujar Conceptos y Datos ---
    const conceptos = [
        { label: "Tiempo que prestó sus servicios", key: "tiempoServicio" },
        { label: "Nombre de la compañía", key: "nombreEmpresa" },
        { label: "Dirección", key: "direccion" },
        { label: "Teléfono", key: "telefono" },
        { label: "Puesto que desempeñaba", key: "puestoDesempenado" },
        { label: "Sueldos", key: "sueldoGanabas" },
        { label: "Motivo de su separación", key: "motivoSeparacion" },
        { label: "Nombre de su jefe directo", key: "nombreJefe" },
        { label: "Puesto de su jefe directo", key: "puestoJefe" }
    ];

    for (const concepto of conceptos) {
        let rowStartY = currentY;
        let maxRowHeight = 0;

        // Dibujar Concepto
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(COLOR_TEXT);
        const conceptoLines = doc.splitTextToSize(concepto.label, CONCEPTO_WIDTH);
        doc.text(conceptoLines, colConceptoX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, conceptoLines.length * LINE_HEIGHT_NORMAL);

        // Dibujar Datos de Empleos
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor('#495057');

        for (let i = 0; i < numEmpleos; i++) {
            const empleoData = empleosData[i];
            if (!empleoData) continue;

            const value = empleoData[concepto.key] || '-';
            const dataLines = doc.splitTextToSize(value, empleoColWidth);
            doc.text(dataLines, empleoColumns[i], rowStartY);
            maxRowHeight = Math.max(maxRowHeight, dataLines.length * LINE_HEIGHT_NORMAL);
        }

        currentY = rowStartY + maxRowHeight + ROW_SPACING;
    }

    // --- Pregunta sobre informes ---
    const informesEmpresasSelect = document.getElementById('informesEmpresas');
    const informesRespuesta = informesEmpresasSelect?.value === 'si' ? 'Sí' : 'No';

    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 1);
    doc.setTextColor(COLOR_TEXT);
    doc.text(`¿Podríamos solicitar informes de usted? - (${informesRespuesta})`, margin, currentY);
    currentY += LINE_HEIGHT_NORMAL + 1;

    if (informesRespuesta === 'No') {
        const razonNoInformesText = document.getElementById('razonNoInformesText')?.value || 'No especificado';
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor('#495057');
        doc.text(`¿Por qué? - ${razonNoInformesText}`, margin + 5, currentY);
        currentY += LINE_HEIGHT_NORMAL;
    }

    currentY += ROW_SPACING;
    console.log("✅ Sección Empleo Actual y Anteriores completada exitosamente");

} catch (error) {
    console.error("❌ Error en Empleo Actual y Anteriores:", error);
    currentY += 20;
}

// --- Fin de la sección de Empleos ---

// ===============================
// Constelación 8: Referencias Personales
// ===============================

currentY = addSectionTitle("Referencias Personales", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const NOMBRE_WIDTH = 45;          // 📏 Ancho columna NOMBRE (EDITABLE)
const DIRECCION_WIDTH = 45;       // 📏 Ancho columna DIRECCIÓN (EDITABLE)
const TELEFONO_WIDTH = 15;        // 📏 Ancho columna TELÉFONO (EDITABLE)
const OCUPACION_WIDTH = 30;       // 📏 Ancho columna OCUPACIÓN (EDITABLE)
const REF_COLUMN_SPACING = 5;     // 📏 Espacio entre columnas (EDITABLE)
const REF_ROW_SPACING = 0;        // 📏 Espacio entre filas (EDITABLE)
// =====================================================

try {
    // Obtener cantidad de referencias
    const cantidadReferenciasSelect = document.getElementById('cantidadReferencias');
    const numReferencias = parseInt(cantidadReferenciasSelect?.value) || 1;
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const colRefNombreX = margin;
    const colRefDireccionX = colRefNombreX + NOMBRE_WIDTH + REF_COLUMN_SPACING;
    const colRefTelefonoX = colRefDireccionX + DIRECCION_WIDTH + REF_COLUMN_SPACING;
    const colRefOcupacionX = colRefTelefonoX + TELEFONO_WIDTH + REF_COLUMN_SPACING;
    const colRefTiempoConocerloX = colRefOcupacionX + OCUPACION_WIDTH + REF_COLUMN_SPACING;
    
    // Calcular ancho de la última columna (TIEMPO DE CONOCERLO)
    const refColTiempoWidth = contentWidth - (colRefTiempoConocerloX - margin);
    
    console.log(`📊 Referencias: ${numReferencias} referencias distribuidas automáticamente`);

    // --- Recopilar datos de referencias ---
    const referenciasData = [];
    for (let i = 1; i <= numReferencias; i++) {
        // Combinar calle y colonia para dirección
        const calleRef = document.getElementById(`calleReferencia${i}`)?.value || '';
        const coloniaRef = document.getElementById(`coloniaReferencia${i}`)?.value || '';
        let direccion = '-';
        if (calleRef || coloniaRef) {
            direccion = `${calleRef}${calleRef && coloniaRef ? ', ' : ''}${coloniaRef}`;
        }

        referenciasData.push({
            nombre: document.getElementById(`nombreReferencia${i}`)?.value || '-',
            direccion: direccion,
            telefono: document.getElementById(`telefonoReferencia${i}`)?.value || '-',
            ocupacion: document.getElementById(`ocupacionReferencia${i}`)?.value || '-',
            tiempoConocerlo: document.getElementById(`tiempoConocerlo${i}`)?.value || '-'
        });
    }

    // --- Dibujar Cabeceras ---
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(COLOR_TEXT);

    doc.text("NOMBRE", colRefNombreX, currentY);
    doc.text("DIRECCIÓN", colRefDireccionX, currentY);
    doc.text("TELÉFONO", colRefTelefonoX, currentY);
    doc.text("OCUPACIÓN", colRefOcupacionX, currentY);
    doc.text("TIEMPO DE CONOCERLO", colRefTiempoConocerloX, currentY);

    currentY += LINE_HEIGHT_NORMAL + REF_ROW_SPACING;

    // --- Dibujar datos de cada referencia ---
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 1);
    doc.setTextColor('#495057'); // ✅ COLOR FIJO - Lección aprendida!

    for (const ref of referenciasData) {
        let rowStartY = currentY;
        let maxRowHeight = 0;

        // Columna: NOMBRE
        const nombreLines = doc.splitTextToSize(ref.nombre, NOMBRE_WIDTH);
        doc.text(nombreLines, colRefNombreX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, nombreLines.length * LINE_HEIGHT_NORMAL);

        // Columna: DIRECCIÓN
        const direccionLines = doc.splitTextToSize(ref.direccion, DIRECCION_WIDTH);
        doc.text(direccionLines, colRefDireccionX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, direccionLines.length * LINE_HEIGHT_NORMAL);

        // Columna: TELÉFONO
        const telefonoLines = doc.splitTextToSize(ref.telefono, TELEFONO_WIDTH);
        doc.text(telefonoLines, colRefTelefonoX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, telefonoLines.length * LINE_HEIGHT_NORMAL);

        // Columna: OCUPACIÓN
        const ocupacionLines = doc.splitTextToSize(ref.ocupacion, OCUPACION_WIDTH);
        doc.text(ocupacionLines, colRefOcupacionX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, ocupacionLines.length * LINE_HEIGHT_NORMAL);

        // Columna: TIEMPO DE CONOCERLO
        const tiempoText = String(ref.tiempoConocerlo) + (ref.tiempoConocerlo !== '-' ? ' años' : '');
        const tiempoLines = doc.splitTextToSize(tiempoText, refColTiempoWidth);
        doc.text(tiempoLines, colRefTiempoConocerloX, rowStartY);
        maxRowHeight = Math.max(maxRowHeight, tiempoLines.length * LINE_HEIGHT_NORMAL);

        currentY = rowStartY + maxRowHeight + REF_ROW_SPACING;
    }

    console.log("✅ Sección Referencias Personales completada exitosamente");

} catch (error) {
    console.error("❌ Error en Referencias Personales:", error);
    currentY += 20;
}

// --- Fin de la sección de Referencias Personales ---

// ===============================
// Constelación 9: Datos Generales y Económicos (Dos Columnas)
// ===============================

currentY = addSectionTitle("Datos Generales y Económicos", currentY);
currentY += 2;

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const COL_SPACING = 3;            // 📏 Espacio entre las dos columnas principales (EDITABLE)
const QUESTION_SPACING = 0;       // 📏 Espacio entre preguntas (EDITABLE)
const SUB_QUESTION_SPACING = -1;   // 📏 Espacio entre pregunta y subrespuesta (EDITABLE)
// =====================================================

try {
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES (NO EDITAR - SE CALCULA SOLO)
    const halfWidth = (contentWidth - COL_SPACING) / 2;
    const colLeftX = margin;
    const colRightX = margin + halfWidth + COL_SPACING;
    
    console.log(`📊 Dos columnas: ${halfWidth.toFixed(1)}mm cada una, separadas por ${COL_SPACING}mm`);

    // Función auxiliar para obtener valor de radio button
    function getRadioValue(name) {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : 'no';
    }

    // Función auxiliar para dibujar una pregunta con respuesta
    function drawQuestion(question, answer, x, y, maxWidth) {
        let currentQuestionY = y;
        
        // Dibujar pregunta
        doc.setFont(FONT_BOLD, 'bold');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(COLOR_TEXT);
        const questionLines = doc.splitTextToSize(question, maxWidth);
        doc.text(questionLines, x, currentQuestionY);
        currentQuestionY += questionLines.length * LINE_HEIGHT_NORMAL + SUB_QUESTION_SPACING;
        
        // Dibujar respuesta
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 2);
        doc.setTextColor('#495057');
        const answerLines = doc.splitTextToSize(answer, maxWidth);
        doc.text(answerLines, x + 2, currentQuestionY);
        currentQuestionY += answerLines.length * LINE_HEIGHT_NORMAL + QUESTION_SPACING;
        
        return currentQuestionY;
    }

    // === COLUMNA IZQUIERDA: DATOS GENERALES ===
    let leftY = currentY;
    
    // 1. ¿Cómo se enteró de la vacante?
    const comoEntero = document.getElementById('comoEntero')?.value || 'No especificado';
    leftY = drawQuestion("1. ¿Cómo se enteró de esta vacante?", comoEntero, colLeftX, leftY, halfWidth);
    
    // 2. ¿Algún pariente trabaja aquí?
    const parienteValue = getRadioValue('pariente');
    let parienteAnswer = parienteValue === 'si' ? 'Sí' : 'No';
    if (parienteValue === 'si') {
        const nombrePariente = document.getElementById('nombrePariente')?.value || '';
        if (nombrePariente) parienteAnswer += ` - ${nombrePariente}`;
    }
    leftY = drawQuestion("2. ¿Algún pariente trabaja aquí?", parienteAnswer, colLeftX, leftY, halfWidth);
    
    // 3. ¿Ha sido afianzado?
    const afianzadoValue = getRadioValue('afianzado');
    let afianzadoAnswer = afianzadoValue === 'si' ? 'Sí' : 'No';
    if (afianzadoValue === 'si') {
        const entidadAfianzadora = document.getElementById('nombreEntidadAfianzadora')?.value || '';
        if (entidadAfianzadora) afianzadoAnswer += ` - ${entidadAfianzadora}`;
    }
    leftY = drawQuestion("3. ¿Ha sido afianzado?", afianzadoAnswer, colLeftX, leftY, halfWidth);
    
    // 4. ¿Afiliado a sindicato?
    const sindicatoValue = getRadioValue('sindicato');
    let sindicatoAnswer = sindicatoValue === 'si' ? 'Sí' : 'No';
    if (sindicatoValue === 'si') {
        const nombreSindicato = document.getElementById('nombreSindicato')?.value || '';
        if (nombreSindicato) sindicatoAnswer += ` - ${nombreSindicato}`;
    }
    leftY = drawQuestion("4. ¿Afiliado a sindicato?", sindicatoAnswer, colLeftX, leftY, halfWidth);
    
    // 5. ¿Tiene seguro de vida?
    const seguroValue = getRadioValue('seguroVida');
    let seguroAnswer = seguroValue === 'si' ? 'Sí' : 'No';
    if (seguroValue === 'si') {
        const entidadSeguro = document.getElementById('nombreEntidadSeguro')?.value || '';
        const sumaAsegurada = document.getElementById('sumaAsegurada')?.value || '';
        if (entidadSeguro) seguroAnswer += ` - ${entidadSeguro}`;
        if (sumaAsegurada) seguroAnswer += ` (${sumaAsegurada})`;
    }
    leftY = drawQuestion("5. ¿Tiene seguro de vida?", seguroAnswer, colLeftX, leftY, halfWidth);
    
    // 6. ¿Podría viajar?
    const viajarValue = getRadioValue('puedeViajar');
    let viajarAnswer = viajarValue === 'si' ? 'Sí' : 'No';
    if (viajarValue === 'no') {
        const razonesViaje = document.getElementById('razonesViaje')?.value || '';
        if (razonesViaje) viajarAnswer += ` - ${razonesViaje}`;
    }
    leftY = drawQuestion("6. ¿Podría viajar?", viajarAnswer, colLeftX, leftY, halfWidth);
    
    // 7. ¿Cambiaría de residencia?
    const residenciaValue = getRadioValue('cambioResidencia');
    let residenciaAnswer = residenciaValue === 'si' ? 'Sí' : 'No';
    if (residenciaValue === 'no') {
        const razonesResidencia = document.getElementById('razonesResidencia')?.value || '';
        if (razonesResidencia) residenciaAnswer += ` - ${razonesResidencia}`;
    }
    leftY = drawQuestion("7. ¿Cambiaría de residencia?", residenciaAnswer, colLeftX, leftY, halfWidth);
    
    // 8. ¿Fecha de incorporación?
    const fechaIncorporacion = document.getElementById('fechaIncorporacion')?.value || 'No especificado';
    leftY = drawQuestion("8. ¿Fecha de incorporación?", fechaIncorporacion, colLeftX, leftY, halfWidth);

    // === COLUMNA DERECHA: DATOS ECONÓMICOS ===
    let rightY = currentY;
    
    // 1. ¿Ingresos adicionales?
    const ingresosValue = getRadioValue('otros_ingresos');
    let ingresosAnswer = ingresosValue === 'si' ? 'Sí' : 'No';
    if (ingresosValue === 'si') {
        const fuente = document.getElementById('fuente_ingreso')?.value || '';
        const monto = document.getElementById('monto_ingresos')?.value || '';
        if (fuente) ingresosAnswer += ` - ${fuente}`;
        if (monto) ingresosAnswer += ` ($${monto})`;
    }
    rightY = drawQuestion("1. ¿Ingresos adicionales?", ingresosAnswer, colRightX, rightY, halfWidth);
    
    // 2. ¿Cónyuge trabaja?
const conyugeValue = getRadioValue('conyuge_trabaja');
let conyugeAnswer = '';

if (conyugeValue === 'si') {
    conyugeAnswer = 'Sí';
    const lugar = document.getElementById('lugar_trabajo_conyuge')?.value || '';
    const montoConyuge = document.getElementById('monto_ingresos_conyuge')?.value || '';
    if (lugar) conyugeAnswer += ` - ${lugar}`;
    if (montoConyuge) conyugeAnswer += ` ($${montoConyuge})`;
} else if (conyugeValue === 'no') {
    conyugeAnswer = 'No';
} else if (conyugeValue === 'N/A') {
    conyugeAnswer = 'N/A';
} else {
    // Fallback si no hay selección (aunque N/A está checked por defecto)
    conyugeAnswer = 'N/A';
}
rightY = drawQuestion("2. ¿Cónyuge trabaja?", conyugeAnswer, colRightX, rightY, halfWidth);
    
    // 3. ¿Casa propia?
    const casaValue = getRadioValue('vive_casa');
    let casaAnswer = casaValue === 'si' ? 'Sí' : 'No';
    if (casaValue === 'si') {
        const valorCasa = document.getElementById('valor_casa')?.value || '';
        if (valorCasa) casaAnswer += ` - $${valorCasa}`;
    }
    rightY = drawQuestion("3. ¿Casa propia?", casaAnswer, colRightX, rightY, halfWidth);
    
    // 4. ¿Paga renta?
    const rentaValue = getRadioValue('paga_renta');
    let rentaAnswer = rentaValue === 'si' ? 'Sí' : 'No';
    if (rentaValue === 'si') {
        const montoRenta = document.getElementById('monto_renta')?.value || '';
        if (montoRenta) rentaAnswer += ` - $${montoRenta}`;
    }
    rightY = drawQuestion("4. ¿Paga renta?", rentaAnswer, colRightX, rightY, halfWidth);
    
    // 5. ¿Automóvil propio?
    const autoValue = getRadioValue('tiene_auto');
    let autoAnswer = autoValue === 'si' ? 'Sí' : 'No';
    if (autoValue === 'si') {
        const marca = document.getElementById('marca_modelo_auto')?.value || '';
        const valorAuto = document.getElementById('valor_auto')?.value || '';
        if (marca) autoAnswer += ` - ${marca}`;
        if (valorAuto) autoAnswer += ` ($${valorAuto})`;
    }
    rightY = drawQuestion("5. ¿Automóvil propio?", autoAnswer, colRightX, rightY, halfWidth);
    
    // 6. ¿Tiene deudas? ✅ AHORA COMPLETO CON IDs CORRECTOS
    const deudasValue = getRadioValue('tiene_deudas');
    let deudasAnswer = deudasValue === 'si' ? 'Sí' : 'No';
    if (deudasValue === 'si') {
        const conQuien = document.getElementById('acreedor_deuda')?.value || '';
        const montoDeudas = document.getElementById('monto_deuda')?.value || '';
        if (conQuien) deudasAnswer += ` - Con: ${conQuien}`;
        if (montoDeudas) deudasAnswer += ` ($${montoDeudas}/mes)`;
    }
    rightY = drawQuestion("6. ¿Tiene deudas?", deudasAnswer, colRightX, rightY, halfWidth);
    
    // 7. ¿Capacidad de ahorro mensual?
    const ahorroMensual = document.getElementById('abono_mensual')?.value || 'No especificado';
    const ahorroAnswer = ahorroMensual !== 'No especificado' ? `$${ahorroMensual}` : ahorroMensual;
    rightY = drawQuestion("7. ¿Capacidad de ahorro mensual?", ahorroAnswer, colRightX, rightY, halfWidth);
    
    // 8. ¿Gastos mensuales?
    const gastosMensuales = document.getElementById('gastos_mensuales')?.value || 'No especificado';
    const gastosAnswer = gastosMensuales !== 'No especificado' ? `$${gastosMensuales}` : gastosMensuales;
    rightY = drawQuestion("8. ¿Gastos mensuales?", gastosAnswer, colRightX, rightY, halfWidth);

    // Actualizar currentY al máximo de ambas columnas
    currentY = Math.max(leftY, rightY) + 2;
    
    console.log("✅ Sección Datos Generales y Económicos completada exitosamente");

} catch (error) {
    console.error("❌ Error en Datos Generales y Económicos:", error);
    currentY += 20;
}

// --- Fin de la sección Datos Generales y Económicos ---

// ===============================
// Constelación 10: Notas para RH y Observaciones del Entrevistador (VERSIÓN FINAL)
// ===============================

currentY += 2; // Espacio después de la sección anterior

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const RECTANGLE_HEIGHT = 25;      // 📏 Altura del rectángulo (EDITABLE)
const BORDER_RADIUS = 3;          // 📏 Radio de bordes redondeados (EDITABLE) 
const BORDER_WIDTH = 0.8;         // 📏 Grosor de líneas (EDITABLE) - MÁS VISIBLE
const SUBTITLE_MARGIN = 3;        // 📏 Margen de subtítulos desde borde (EDITABLE)
// =====================================================

try {
    // Verificar límites de página
    const limitePagina = pageHeight - margin;
    if (currentY > limitePagina - 35) {
        console.log("📄 Nueva página para Notas RH");
        doc.addPage();
        currentY = margin + 10;
    }
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES
    const rectX = margin;
    const rectY = currentY;
    const rectWidth = contentWidth;
    const halfRectWidth = rectWidth / 2;
    const dividerX = rectX + halfRectWidth;
    
    console.log(`📊 Rectángulo Notas RH: ${rectWidth}mm x ${RECTANGLE_HEIGHT}mm`);

    // === DIBUJAR RECTÁNGULO PRINCIPAL CON BORDES REDONDEADOS ===
    doc.setDrawColor(100, 100, 100); // GRIS MÁS VISIBLE que antes
    doc.setLineWidth(BORDER_WIDTH);
    
    // Si roundedRect no funciona, usar rect normal
    try {
        doc.roundedRect(rectX, rectY, rectWidth, RECTANGLE_HEIGHT, BORDER_RADIUS, BORDER_RADIUS, 'S');
    } catch (e) {
        console.log("⚠️ Usando rect normal en lugar de roundedRect");
        doc.rect(rectX, rectY, rectWidth, RECTANGLE_HEIGHT, 'S');
    }
    
    // === DIBUJAR LÍNEA DIVISORIA CENTRAL ===
    doc.line(dividerX, rectY, dividerX, rectY + RECTANGLE_HEIGHT);
    
    // === LADO IZQUIERDO: NOTA PARA RH ===
    
    // Subtítulo "NOTA PARA RH" (superior izquierdo)
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(50, 50, 50); // GRIS OSCURO MÁS VISIBLE
    doc.text("NOTA PARA RH", rectX + SUBTITLE_MARGIN, rectY + SUBTITLE_MARGIN + 4);
    
    // Contenido de la nota
    const notaRH = document.getElementById('nota-rh')?.value || '';
    if (notaRH.trim()) {
        doc.setFont(FONT_NORMAL, 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL - 1);
        doc.setTextColor(70, 70, 70); // GRIS MEDIO VISIBLE
        
        // Calcular área disponible para el texto
        const textAreaWidth = halfRectWidth - (SUBTITLE_MARGIN * 2);
        const textStartY = rectY + SUBTITLE_MARGIN + 9; // Debajo del subtítulo
        const textMaxHeight = RECTANGLE_HEIGHT - 12;
        
        const notaLines = doc.splitTextToSize(notaRH, textAreaWidth);
        const maxLines = Math.floor(textMaxHeight / LINE_HEIGHT_NORMAL);
        const finalLines = notaLines.slice(0, maxLines);
        
        doc.text(finalLines, rectX + SUBTITLE_MARGIN, textStartY);
    }
    
    // === LADO DERECHO: OBSERVACIONES DEL ENTREVISTADOR ===
    
    // Subtítulo "Observaciones del entrevistador" (superior derecho)
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL);
    doc.setTextColor(50, 50, 50); // GRIS OSCURO MÁS VISIBLE
    
    const observacionesText = "Observaciones del entrevistador";
    const observacionesWidth = doc.getTextWidth(observacionesText);
    const observacionesX = rectX + rectWidth - observacionesWidth - SUBTITLE_MARGIN;
    doc.text(observacionesText, observacionesX, rectY + SUBTITLE_MARGIN + 4);
    
    // Nota explicativa pequeña
    doc.setFont(FONT_NORMAL, 'italic');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(120, 120, 120); // GRIS CLARO PERO VISIBLE
    const explicacionText = "(Se llena ya impreso el documento)";
    const explicacionWidth = doc.getTextWidth(explicacionText);
    const explicacionX = rectX + rectWidth - explicacionWidth - SUBTITLE_MARGIN;
    doc.text(explicacionText, explicacionX, rectY + SUBTITLE_MARGIN + 9);
    
    // Actualizar currentY
    currentY = rectY + RECTANGLE_HEIGHT + 2;
    
    console.log("✅ Sección Notas para RH y Observaciones completada exitosamente");

} catch (error) {
    console.error("❌ Error en Notas para RH y Observaciones:", error);
    currentY += 35;
}

// --- Fin de la sección Notas y Observaciones ---

// ===============================
// Constelación 11: Sección Trillizos (VERSIÓN DIAMANTE PULIDO)
// ===============================

currentY += 2; // Espacio después de la sección anterior

// 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS PRINCIPALES
// =====================================================
const TRILLIZO_HEIGHT_1 = 20;     // 📏 Altura del rectángulo 1 (EDITABLE) - TUS ALTURAS PERSONALIZADAS
const TRILLIZO_HEIGHT_2 = 20;     // 📏 Altura del rectángulo 2 (EDITABLE) - TUS ALTURAS PERSONALIZADAS  
const TRILLIZO_HEIGHT_3 = 20;     // 📏 Altura del rectángulo 3 (EDITABLE) - TUS ALTURAS PERSONALIZADAS
const BORDER_RADIUS_TRILLIZOS = 3; // 📏 Radio de bordes redondeados (EDITABLE)
const SEPARACION_TRILLIZOS = 3;    // 📏 Separación entre rectángulos en mm (EDITABLE)
const BORDER_WIDTH_TRILLIZOS = 0.8; // 📏 Grosor de líneas PRINCIPALES (EDITABLE) ← NUEVO!
const LINEAS_DIVISORAS_GROSOR = 0.4; // 📏 Grosor líneas divisoras internas (EDITABLE) ← NUEVO!
// =====================================================

try {
    // Verificar límites de página
    const alturaMaxima = Math.max(TRILLIZO_HEIGHT_1, TRILLIZO_HEIGHT_2, TRILLIZO_HEIGHT_3);
    const limitePagina = pageHeight - margin;
    if (currentY > limitePagina - alturaMaxima - 10) {
        console.log("📄 Nueva página para Sección Trillizos");
        doc.addPage();
        currentY = margin + 10;
    }
    
    // 🔢 CÁLCULO AUTOMÁTICO DE POSICIONES
    const anchoDisponible = contentWidth - (SEPARACION_TRILLIZOS * 2);
    const anchoTrillizo = anchoDisponible / 3;
    
    const trillizo1X = margin;
    const trillizo2X = margin + anchoTrillizo + SEPARACION_TRILLIZOS;
    const trillizo3X = margin + (anchoTrillizo * 2) + (SEPARACION_TRILLIZOS * 2);
    
    const baseY = currentY;
    
    // Configurar estilo de líneas PRINCIPALES
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(BORDER_WIDTH_TRILLIZOS);
    
    // === TRILLIZO 1: DECLARACIÓN DE VERACIDAD ===
    try {
        doc.roundedRect(trillizo1X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_1, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo1X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_1, 'S');
    }
    
    // Título
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(50, 50, 50);
    doc.text("Hago constar que mis respuestas", trillizo1X + 2, baseY + 4);
    doc.text("son verdaderas", trillizo1X + 2, baseY + 7);
    
    // Línea para firma
    const lineaFirmaY = baseY + TRILLIZO_HEIGHT_1 - 8;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    doc.line(trillizo1X + 2, lineaFirmaY, trillizo1X + anchoTrillizo - 2, lineaFirmaY);
    
    // Texto pequeño debajo de la línea
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 4);
    doc.setTextColor(100, 100, 100);
    doc.text("Firma del solicitante", trillizo1X + 2, lineaFirmaY + 3);
    
    // === TRILLIZO 2: SUELDO ACORDADO (VERSIÓN DIAMANTE) ===
    try {
        doc.roundedRect(trillizo2X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_2, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo2X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_2, 'S');
    }
    
    // 💎 ENCABEZADO CON RELLENO Y TÍTULO BLANCO
    const alturaEncabezado = 6;
    
    // Dibujar rectángulo de relleno para el encabezado
    doc.setFillColor(100, 100, 100); // Gris para el relleno
    try {
        // Rectángulo con esquinas redondeadas solo arriba
        doc.roundedRect(trillizo2X, baseY, anchoTrillizo, alturaEncabezado, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'F');
        // Rectángulo normal para cubrir la parte inferior y que quede cuadrado abajo
        doc.rect(trillizo2X, baseY + 2, anchoTrillizo, alturaEncabezado - 2, 'F');
    } catch (e) {
        doc.rect(trillizo2X, baseY, anchoTrillizo, alturaEncabezado, 'F');
    }
    
    // Título encabezado en BLANCO y BOLD
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(255, 255, 255); // ✨ BLANCO
    const tituloSueldo = "Sueldo acordado";
    const tituloSueldoWidth = doc.getTextWidth(tituloSueldo);
    const centroTrillizo2 = trillizo2X + (anchoTrillizo / 2);
    doc.text(tituloSueldo, centroTrillizo2 - (tituloSueldoWidth / 2), baseY + 4);
    
    // 💎 LÍNEAS DIVISORAS MÁS DELGADAS Y SUTILES
    doc.setDrawColor(150, 150, 150); // Gris más claro y sutil
    doc.setLineWidth(LINEAS_DIVISORAS_GROSOR); // Líneas más delgadas
    
    // Línea divisoria vertical en el medio
    const divisorX = centroTrillizo2;
    doc.line(divisorX, baseY + alturaEncabezado, divisorX, baseY + TRILLIZO_HEIGHT_2);
    
    // Configurar las 4 casillas (2x2)
    const alturaCasilla = (TRILLIZO_HEIGHT_2 - alturaEncabezado) / 2;
    
    // Línea horizontal divisoria
    const divisorY = baseY + alturaEncabezado + alturaCasilla;
    doc.line(trillizo2X, divisorY, trillizo2X + anchoTrillizo, divisorY);
    
    // Texto en las casillas izquierdas
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 3);
    doc.setTextColor(70, 70, 70);
    
    // Casilla superior izquierda
    doc.text("Sueldo semanal $", trillizo2X + 1, baseY + alturaEncabezado + 4);
    
    // Casilla inferior izquierda  
    doc.text("Sueldo mensual $", trillizo2X + 1, baseY + alturaEncabezado + 4 + alturaCasilla);
    
    // === TRILLIZO 3: AUTORIZACIÓN RH ===
    // Restaurar grosor de línea principal
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(BORDER_WIDTH_TRILLIZOS);
    
    try {
        doc.roundedRect(trillizo3X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_3, BORDER_RADIUS_TRILLIZOS, BORDER_RADIUS_TRILLIZOS, 'S');
    } catch (e) {
        doc.rect(trillizo3X, baseY, anchoTrillizo, TRILLIZO_HEIGHT_3, 'S');
    }
    
    // Título
    doc.setFont(FONT_BOLD, 'bold');
    doc.setFontSize(FONT_SIZE_NORMAL - 2);
    doc.setTextColor(50, 50, 50);
    doc.text("Autorización RH", trillizo3X + 2, baseY + 4);
    
    // Línea para firma
    const lineaFirmaRHY = baseY + TRILLIZO_HEIGHT_3 - 8;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    doc.line(trillizo3X + 2, lineaFirmaRHY, trillizo3X + anchoTrillizo - 2, lineaFirmaRHY);
    
    // Texto pequeño debajo de la línea
    doc.setFont(FONT_NORMAL, 'normal');
    doc.setFontSize(FONT_SIZE_NORMAL - 4);
    doc.setTextColor(100, 100, 100);
    doc.text("Firma del entrevistador", trillizo3X + 2, lineaFirmaRHY + 3);
    
    // Actualizar currentY
    const alturaMaximaReal = Math.max(TRILLIZO_HEIGHT_1, TRILLIZO_HEIGHT_2, TRILLIZO_HEIGHT_3);
    currentY = baseY + alturaMaximaReal + 8;
    
    console.log("✅ Sección Trillizos DIAMANTE PULIDO completada exitosamente");

} catch (error) {
    console.error("❌ Error en Sección Trillizos:", error);
    currentY += 35;
}

// --- Fin de la sección Trillizos ---

// ===============================
// 🍒 CERECITA DEL PASTEL: Copyright como Pie de Página
// ===============================

// Esta función se ejecuta AL FINAL de todo el PDF, después de todas las constelaciones
function agregarCopyrightPiePagina() {
    try {
        // Obtener información de la página actual
        const totalPaginas = doc.internal.getNumberOfPages();
        const paginaActual = doc.internal.getCurrentPageInfo().pageNumber;
        
        // Aplicar el copyright a TODAS las páginas
        for (let i = 1; i <= totalPaginas; i++) {
            doc.setPage(i);
            
            // 🎯 CONFIGURACIÓN FÁCIL DE EDITAR - PARÁMETROS DE COPYRIGHT
            // =====================================================
            const PIE_PAGINA_Y = pageHeight - 15;        // 📏 Posición Y del pie de página (EDITABLE)
            const SEPARACION_LINEAS = 3;                // 📏 Separación entre líneas (EDITABLE)
            const TAMAÑO_TEXTO_PRINCIPAL = 8;           // 📏 Tamaño texto principal (EDITABLE)
            const TAMAÑO_TEXTO_DESARROLLADOR = 7;       // 📏 Tamaño texto desarrollador (EDITABLE)
            // =====================================================
            
            // === LÍNEA 1: TEXTO PRINCIPAL ===
            doc.setFont(FONT_BOLD, 'bold');
            doc.setFontSize(TAMAÑO_TEXTO_PRINCIPAL);
            doc.setTextColor(80, 80, 80); // Gris profesional
            
            const textoPrincipal = "Este documento fue creado con SEMP la aplicación de solicitud de Empleo más avanzada del mundo.";
            const anchoPrincipal = doc.getTextWidth(textoPrincipal);
            const xPrincipal = (pageWidth - anchoPrincipal) / 2; // Centrado
            
            doc.text(textoPrincipal, xPrincipal, PIE_PAGINA_Y);
            
            // === LÍNEA 2: DESARROLLADOR CON ESTILO GOOGLE ===
            doc.setFont(FONT_NORMAL, 'normal');
            doc.setFontSize(TAMAÑO_TEXTO_DESARROLLADOR);
            
            // Texto "desarrollador" en gris
            const textoDesarrollador = "desarrollador    ";
            doc.setTextColor(120, 120, 120);
            const anchoDesarrollador = doc.getTextWidth(textoDesarrollador);
            
            // Texto "Creative-JM" con colores de Google
            const textoLogo = "Creative-JM";
            doc.setFont(FONT_BOLD, 'bold');
            
            // Calcular posición centrada para toda la línea
            const anchoTotal = anchoDesarrollador + doc.getTextWidth(textoLogo);
            const xInicio = (pageWidth - anchoTotal) / 2;
            
            // Dibujar "desarrollador"
            doc.setTextColor(120, 120, 120);
            doc.text(textoDesarrollador, xInicio, PIE_PAGINA_Y + SEPARACION_LINEAS);
            
            // Dibujar "Creative-JM" con colores de Google (cada letra un color)
            const coloresGoogle = [
                [66, 133, 244],   // Azul Google - C
                [234, 67, 53],    // Rojo Google - r
                [251, 188, 5],    // Amarillo Google - e
                [52, 168, 83],    // Verde Google - a
                [66, 133, 244],   // Azul Google - t
                [52, 168, 83],    // Verde Google - i
                [234, 67, 53],    // Rojo Google - v
                [251, 188, 5],    // Amarillo Google - e
                [66, 133, 244],   // Azul Google - -
                [52, 168, 83],    // Verde Google - J
                [234, 67, 53],    // Rojo Google - M
            ];
            
            let xActual = xInicio + anchoDesarrollador;
            
            for (let j = 0; j < textoLogo.length; j++) {
                const letra = textoLogo[j];
                const color = coloresGoogle[j % coloresGoogle.length];
                
                doc.setTextColor(color[0], color[1], color[2]);
                doc.text(letra, xActual, PIE_PAGINA_Y + SEPARACION_LINEAS);
                
                xActual += doc.getTextWidth(letra);
            }
        }
        
        console.log("🍒 Copyright/Pie de página agregado exitosamente a todas las páginas");
        
    } catch (error) {
        console.error("❌ Error agregando copyright:", error);
    }
}

// === LLAMAR LA FUNCIÓN AL FINAL DE TODO EL PDF ===
// (Esto va después de todas las constelaciones, al final del código)
agregarCopyrightPiePagina();
    
    // 🎨 AGREGAR MARCA DE AGUA ANTES DE GUARDAR
    const pageCount = doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Configurar marca de agua
        doc.setTextColor(200, 200, 200); // Gris claro
        doc.setFontSize(40);
        doc.setFont(undefined, 'bold');
        
        // Rotar y posicionar la marca de agua
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        doc.text('SEMP by Creative-JM', pageWidth/2, pageHeight/2, {
            angle: 45,
            align: 'center'
        });
        
        // Segunda marca de agua más pequeña
        doc.setFontSize(20);
        doc.text('www.semp-app.com', pageWidth/2, pageHeight/2 + 30, {
            angle: 45,
            align: 'center'
        });
    }
    
    // Guardar el PDF
    try {
        doc.save('SEMP-Gratuito.pdf');
        console.log("PDF gratuito generado con marca de agua");
        alert("¡PDF Gratuito generado con marca de agua!");
    } catch (e) {
        console.error("Error al guardar el PDF:", e);
        alert("Hubo un error al intentar guardar el PDF.");
    }
}

// ⭐ FUNCIÓN #2: PDF Premium sin marca de agua
function generarPDFPremium() {
    console.log("Generando PDF PREMIUM sin marca de agua...");
    
    // Usar la función original sin modificaciones
    generarPDF();
}

// 🎉 FUNCIÓN #3: Iniciar Proceso de Pago
async function iniciarPago() {
    console.log("Iniciando proceso de pago...");

    try {
        const response = await fetch('/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Si necesitas enviar datos del producto desde el frontend, agrégalos aquí
        });

        const data = await response.json();

        if (response.ok) {
            const mp = new MercadoPago('APP_USR-73017095-6b5f-4d49-b187-57bdc0dd25e4', { // Tu Public Key
                locale: 'es-MX'
            });

            // Redirige al usuario a la URL de Mercado Pago
            mp.checkout({
                preference: {
                    id: data.init_point.split('id=')[1] // Extrae solo el ID de la preferencia
                }
            }).open();

            // Ocultar botón de pago si existe (puedes ajustar esta lógica según necesites)
            const btnPagarPremium = document.getElementById('btnPagarPremium');
            if (btnPagarPremium) {
                btnPagarPremium.style.display = 'none';
            }

        } else {
            console.error('Error al crear la preferencia de pago:', data.error);
            const errorNotif = document.getElementById('notificacionError');
            if (errorNotif) {
                errorNotif.textContent = 'Error al iniciar el pago. Intenta de nuevo.';
                errorNotif.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error de red o servidor:', error);
        const errorNotif = document.getElementById('notificacionError');
        if (errorNotif) {
            errorNotif.textContent = 'Problemas de conexión. Intenta de nuevo.';
            errorNotif.style.display = 'block';
        }
    }
}

// 🎉 FUNCIÓN #4: Manejar pago exitoso
function pagoExitoso() {
    console.log("¡Pago exitoso detectado!");
    
    // Mostrar notificación de éxito
    const notificacion = document.getElementById('notificacionExito');
    if (notificacion) {
        notificacion.style.display = 'block';
    }
    
    // Mostrar botón premium
    const btnPremium = document.getElementById('btnPremium');
    if (btnPremium) {
        btnPremium.style.display = 'inline-block';
    }
    
    // Ocultar botón de pago
    const botonesPago = document.querySelectorAll('button[onclick="iniciarPago()"]');
    botonesPago.forEach(btn => btn.style.display = 'none');
    
    // Mensaje de celebración
    alert("🎊 ¡FELICIDADES! 🎊\n\n✅ Tu pago fue exitoso\n⭐ Botón Premium desbloqueado\n🚀 ¡Disfruta tu PDF sin marca de agua!");
}
