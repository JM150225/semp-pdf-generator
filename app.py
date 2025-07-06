import os
from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

@app.route('/')
def home():
    """Página principal con verificador de códigos"""
    code = request.args.get('code', '')
    return render_template('index.html', code=code)

@app.route('/enigma')
def enigma():
    """Página Enigma para detección de pagos de MercadoPago"""
    return render_template('enigma.html')

@app.route('/test-sync')
def test_sync():
    """Página de prueba para verificar sincronización de códigos"""
    return render_template('test_sync.html')

@app.route('/api/health')
def health():
    """Endpoint de salud para verificar que el servidor está funcionando"""
    return jsonify({"status": "ok", "message": "Sistema Enigma funcionando correctamente"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
