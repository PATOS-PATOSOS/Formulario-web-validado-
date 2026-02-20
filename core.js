const form = document.getElementById('formHilbert');
const listado = document.getElementById('listaHuespedes');
const modal = document.getElementById('modalExito');
const detalleReserva = document.getElementById('detalleReserva');

// Inputs
const fields = {
    nombre: document.getElementById('nombre'),
    correo: document.getElementById('correo'),
    cantidad: document.getElementById('cantidad'),
    fecha: document.getElementById('fecha'),
    habitacion: document.getElementById('habitacion'),
    condiciones: document.getElementById('condiciones')
};

// Contenedores de error
const errors = {
    nombre: document.getElementById('errorNombre'),
    correo: document.getElementById('errorCorreo'),
    cantidad: document.getElementById('errorCantidad'),
    fecha: document.getElementById('errorFecha'),
    habitacion: document.getElementById('errorHabitacion'),
    condiciones: document.getElementById('errorCondiciones')
};

// --- VALIDACIONES ---

const validateField = (id) => {
    const input = fields[id];
    const errorDiv = errors[id];

    if (input.checkValidity()) {
        input.classList.remove('input-error');
        input.classList.add('input-ok');
        errorDiv.textContent = '';
        return true;
    } else {
        input.classList.add('input-error');
        input.classList.remove('input-ok');
        
        if (input.validity.valueMissing) errorDiv.textContent = 'Este dato es vital para el infinito.';
        else if (input.validity.typeMismatch) errorDiv.textContent = 'Formato no reconocido en esta dimensión.';
        else if (input.validity.tooShort) errorDiv.textContent = `Nombre demasiado corto (mín. ${input.minLength}).`;
        else if (input.validity.rangeUnderflow) errorDiv.textContent = 'Debe venir al menos un huésped.';
        
        return false;
    }
};

const validateLogic = () => {
    let isValid = true;

    // 1. Validación de Fecha (No puede ser en el pasado)
    const fechaInput = new Date(fields.fecha.value);
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    if (fechaInput < hoy) {
        errors.fecha.textContent = 'No aceptamos reservas en el pasado (aún).';
        fields.fecha.classList.add('input-error');
        isValid = false;
    }

    // 2. Validación de Nombre (Mínimo 2 palabras)
    const nombre = fields.nombre.value.trim();
    if (nombre.split(' ').length < 2) {
        errors.nombre.textContent = 'Por favor, indique nombre y apellido.';
        fields.nombre.classList.add('input-error');
        isValid = false;
    }

    return isValid;
};

// --- ENVÍO ---

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let allOk = true;
    Object.keys(fields).forEach(key => {
        if (!validateField(key)) allOk = false;
    });

    if (allOk && validateLogic()) {
        // Simular número de habitación infinita
        const roomNum = Math.floor(Math.random() * 999999) + "∞";
        
        // Mostrar Modal
        detalleReserva.innerHTML = `Huésped: <strong>${fields.nombre.value}</strong><br>Habitación: <strong>#${roomNum}</strong>`;
        modal.style.display = 'flex';

        // Añadir a la lista
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${fields.nombre.value}</strong><br>
                <small>${fields.habitacion.options[fields.habitacion.selectedIndex].text}</small>
            </div>
            <button onclick="this.parentElement.remove()" style="width: auto; padding: 5px 10px; font-size: 0.7rem;">Desalojar</button>
        `;
        listado.prepend(li);

        form.reset();
        Object.values(fields).forEach(f => f.classList.remove('input-ok'));
    }
});

function cerrarModal() { modal.style.display = 'none'; }