
// Reloj en tiempo real
function actualizarReloj() {
    const now = new Date();
    document.getElementById('reloj').textContent = now.toLocaleTimeString();
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Guardar nombre en localStorage
document.getElementById('guardarNombre').addEventListener('click', () => {
    const nombre = document.getElementById('nombreTrabajador').value;
    localStorage.setItem('nombreTrabajador', nombre);
    alert('Nombre guardado: ' + nombre);
});

// Modal leyenda colores
const modal = document.getElementById('leyendaModal');
const btn = document.getElementById('leyendaBtn');
const span = document.getElementsByClassName('close')[0];
btn.onclick = () => { modal.style.display = 'block'; }
span.onclick = () => { modal.style.display = 'none'; }
window.onclick = (event) => { if(event.target == modal){ modal.style.display='none'; }}

// Fichaje (entrada/salida) simple
let historial = JSON.parse(localStorage.getItem('historial')) || [];
document.getElementById('entrada').addEventListener('click', () => { registrarFichaje('Entrada'); });
document.getElementById('salida').addEventListener('click', () => { registrarFichaje('Salida'); });

function registrarFichaje(tipo) {
    const now = new Date();
    historial.push({fecha: now.toLocaleDateString(), tipo, hora: now.toLocaleTimeString()});
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarTabla();
}

// Mostrar historial en tabla
function actualizarTabla() {
    const tbody = document.querySelector('#historialTable tbody');
    tbody.innerHTML = '';
    historial.forEach(h => {
        const row = `<tr><td>${h.fecha}</td><td>${h.tipo==='Entrada'?h.hora:''}</td><td>${h.tipo==='Salida'?h.hora:''}</td><td>--</td></tr>`;
        tbody.innerHTML += row;
    });
}
actualizarTabla();

// Exportar CSV simple
document.getElementById('exportar').addEventListener('click', () => {
    let csvContent = 'data:text/csv;charset=utf-8,Fecha,Entrada,Salida,Horas\n';
    historial.forEach(h => {
        csvContent += `${h.fecha},${h.tipo==='Entrada'?h.hora:''},${h.tipo==='Salida'?h.hora:''},--\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'historial_marcaje.csv');
    document.body.appendChild(link);
    link.click();
});
