const https = require('https');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'MercadoPago no configurado' })
        };
    }

    const preferenceData = {
        items: [{
            title: 'PDF Premium SEMP',
            unit_price: 5.00,
            quantity: 1,
            description: 'PDF sin marca de agua para solicitud de empleo'
        }],
        back_urls: {
            success: `${process.env.URL || 'https://tu-sitio.netlify.app'}/success`,
            failure: `${process.env.URL || 'https://tu-sitio.netlify.app'}/failure`,
            pending: `${process.env.URL || 'https://tu-sitio.netlify.app'}/pending`
        },
        auto_return: 'approved',
        external_reference: `SEMP_${Date.now()}`
    };

    try {
        const preference = await createMercadoPagoPreference(preferenceData, accessToken);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                preference_id: preference.id,
                init_point: preference.init_point,
                external_reference: preference.external_reference
            })
        };
    } catch (error) {
        console.error('Error creando preferencia:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                error: 'Error creando preferencia de pago',
                details: error.message 
            })
        };
    }
};

function createMercadoPagoPreference(data, token) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        
        const options = {
            hostname: 'api.mercadopago.com',
            path: '/checkout/preferences',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
                'X-Idempotency-Key': `SEMP_${Date.now()}_${Math.random()}`
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (res.statusCode === 201) {
                        resolve(result);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${result.message || data}`));
                    }
                } catch (parseError) {
                    reject(new Error(`Parse error: ${parseError.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request error: ${error.message}`));
        });

        req.write(postData);
        req.end();
    });
}