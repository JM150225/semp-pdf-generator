const express = require('express');
const mercadopago = require('mercadopago');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar MercadoPago
mercadopago.configure({
    access_token: 'APP_USR-4519065747758458-062214-cfe5ab4826ff7396ffcb8a283799dcca-816159964'
});

// Middleware
app.use(express.json());
app.use(express.static('public')); // Para servir tus archivos HTML

// Ruta para crear preferencia de pago
app.post('/create_preference', async (req, res) => {
    try {
        const preference = {
            items: [{
                title: 'PDF Profesional - Solicitud de Empleo',
                unit_price: 5.00,
                quantity: 1,
            }],
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            },
            auto_return: 'approved'
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ init_point: response.body.init_point });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error creando preferencia' });
    }
});

// Rutas de retorno
app.get('/success', (req, res) => {
    res.send(`
        <html>
        <body>
            <h1>¡Pago Exitoso!</h1>
            <script>
                window.opener.location.href = window.opener.location.href + '?collection_status=approved';
                window.close();
            </script>
        </body>
        </html>
    `);
});

app.get('/failure', (req, res) => {
    res.send('<h1>Pago Cancelado</h1><a href="/">Volver</a>');
});

app.get('/pending', (req, res) => {
    res.send('<h1>Pago Pendiente</h1><a href="/">Volver</a>');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
