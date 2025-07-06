# 🚀 INSTRUCCIONES SÚPER FÁCILES PARA HOSTING

## Archivos que DEBES subir a tu hosting:

✅ **Carpeta completa `templates/`** (con todos los HTML)
✅ **Carpeta completa `static/`** (con CSS y JS)
✅ **app.py**
✅ **main.py**
✅ **requirements_hosting.txt** (renómbralo a `requirements.txt`)
✅ **Procfile**

## PASO A PASO para hostings populares:

### 🌐 RENDER.COM (RECOMENDADO - MÁS FÁCIL)

1. Ve a render.com y registrate gratis
2. Haz clic en "New +" → "Web Service"
3. Conecta tu GitHub o sube los archivos directamente
4. En "Build Command" deja vacío
5. En "Start Command" pon: `gunicorn --bind 0.0.0.0:$PORT main:app`
6. En "Environment Variables" agrega:
   - Nombre: `SESSION_SECRET`
   - Valor: `mi-clave-super-secreta-123`
7. Haz clic en "Deploy"

### 🚂 RAILWAY.APP

1. Ve a railway.app y regístrate
2. Haz clic en "Deploy now" → "Deploy from GitHub repo"
3. Sube tus archivos o conecta GitHub
4. Railway detectará automáticamente que es Python
5. En Variables de entorno agrega:
   - `SESSION_SECRET` = `mi-clave-super-secreta-123`
6. Deploy automático

### 🐍 PYTHONANYWHERE

1. Ve a pythonanywhere.com y regístrate gratis
2. Ve a "Files" y sube todos los archivos
3. Ve a "Web" → "Add a new web app"
4. Selecciona Flask
5. En la configuración, apunta a tu `app.py`

## ⚠️ IMPORTANTE:

- **requirements_hosting.txt** DEBE renombrarse a **requirements.txt**
- **NO cambies nada más**
- **SI el CSS no se ve, es problema del hosting, no tuyo**

## 🆘 Si algo no funciona:

1. Verifica que subiste TODAS las carpetas
2. Verifica que renombraste requirements_hosting.txt a requirements.txt
3. Verifica que agregaste la variable SESSION_SECRET

¡Ya está! Con esto debería funcionar perfecto.