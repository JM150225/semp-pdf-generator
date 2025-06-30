const https = require('https');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const preferenceId = event.queryStringParameters?.preference_id;
    const externalReference = event.queryStringParameters?.external_reference;
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!preferenceId && !externalReference) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Se requiere preference_id o external_reference' })
        };
    }

    if (!accessToken) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'MercadoPago no configurado' })
        };
    }

    try {
        // Buscar pagos por referencia externa
        const searchQuery = externalReference || preferenceId;
        const payments = await searchPayments(searchQuery, accessToken);
        
        if (payments.results && payments.results.length > 0) {
            // Buscar el pago más reciente aprobado
            const approvedPayment = payments.results.find(p => p.status === 'approved');
            const latestPayment = approvedPayment || payments.results[0];
            
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: latestPayment.status,
                    payment_id: latestPayment.id,
                    amount: latestPayment.transaction_amount,
                    description: latestPayment.description,
                    date_created: latestPayment.date_created,
                    external_reference: latestPayment.external_reference
                })
            };
        } else {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'not_found',
                    message: 'No se encontraron pagos para esta referencia'
                })
            };
        }
        
    } catch (error) {
        console.error('Error verificando pago:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                error: 'Error verificando pago',
                details: error.message 
            })
        };
    }
};

function searchPayments(reference, token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.mercadopago.com',
            path: `/v1/payments/search?external_reference=${reference}&sort=date_created&criteria=desc`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (res.statusCode === 200) {
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

        req.end();
    });
}