const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Sirve automáticamente los archivos de la carpeta "public"
app.use(express.static('public'));

let logs = [];
let tareas = [
    { id: 1, titulo: 'Demostrar middlewares en vivo', completada: true },
    { id: 2, titulo: 'Explicar el valor agregado de Express', completada: false }
];

// MIDDLEWARE PERSONALIZADO: Mide el tiempo y registra cada petición a /api/tareas
app.use((req, res, next) => {
    if (req.url.startsWith('/api/tareas')) {
        const inicio = Date.now();
        res.on('finish', () => {
            logs.unshift({
                hora: new Date().toLocaleTimeString(),
                metodo: req.method,
                ruta: req.url,
                estado: res.statusCode,
                duracion: `${Date.now() - inicio}ms`
            });
            if (logs.length > 8) logs.pop(); // Mantiene los últimos 8 registros
        });
    }
    next();       
});

// Endpoints de la API
app.get('/api/tareas', (req, res) => res.json(tareas));

app.post('/api/tareas', (req, res) => {
    const { titulo } = req.body;
    if (!titulo) return res.status(400).json({ error: 'Título requerido' });
    const nueva = { id: Date.now(), titulo, completada: false };
    tareas.push(nueva);
    res.status(201).json(nueva);
});

app.put('/api/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === Number(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'No encontrada' });
    tarea.completada = !tarea.completada;
    res.json(tarea);
});

app.delete('/api/tareas/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!tareas.some(t => t.id === id)) return res.status(404).json({ error: 'No encontrada' });
    tareas = tareas.filter(t => t.id !== id);
    res.json({ ok: true });
});

// Endpoint para alimentar el monitor visual de middlewares
app.get('/api/logs', (req, res) => res.json(logs));

app.listen(PORT, () => console.log(`Demo visual lista en http://localhost:${PORT}`));