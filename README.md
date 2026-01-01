# 🎆 Carta Digital de Año Nuevo 2026

Una carta digital animada e interactiva para celebrar el Año Nuevo 2026 con fuegos artificiales, cuenta regresiva y mensajes personalizados.

## 🚀 Características

- ✨ Cuenta regresiva hasta el Año Nuevo
- 🎆 Fuegos artificiales interactivos
- 💫 Animaciones fluidas y efectos visuales
- 📱 Diseño responsive (móvil, tablet, escritorio)
- 🎁 Sorpresas interactivas
- 🌟 Mensajes personalizados aleatorios
- ♿ Accesible (ARIA labels)
- 🔍 Optimizado para SEO

## 📋 Requisitos

- **PHP**: 7.4 o superior
- **Servidor Web**: Apache/IIS (Azure App Service)

## 🌐 Despliegue en Azure App Service

### Opción 1: Despliegue desde Git

1. **Inicializar repositorio Git** (si aún no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Crear un repositorio en GitHub/Azure DevOps** y hacer push:
   ```bash
   git remote add origin <URL_DE_TU_REPOSITORIO>
   git push -u origin main
   ```

3. **En Azure Portal**:
   - Ve a tu App Service
   - En el menú lateral, selecciona **"Deployment Center"**
   - Selecciona tu fuente (GitHub, Azure Repos, etc.)
   - Configura la autenticación y selecciona tu repositorio
   - Guarda la configuración

### Opción 2: Despliegue con FTP

1. **En Azure Portal**:
   - Ve a tu App Service
   - Selecciona **"Deployment Center"** → **"FTP credentials"**
   - Copia las credenciales FTP

2. **Conecta con un cliente FTP** (FileZilla, WinSCP, etc.):
   - Host: El endpoint FTPS que te proporciona Azure
   - Usuario y contraseña: Las credenciales del paso anterior
   - Sube todos los archivos a la carpeta `/site/wwwroot/`

### Opción 3: Despliegue con Azure CLI

```bash
# Instalar Azure CLI si no lo tienes
# https://docs.microsoft.com/cli/azure/install-azure-cli

# Iniciar sesión
az login

# Crear un App Service Plan (si no tienes uno)
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux

# Crear la Web App
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myNewYearApp --runtime "PHP|8.2"

# Desplegar desde un directorio local
az webapp up --name myNewYearApp --resource-group myResourceGroup --runtime "PHP:8.2"
```

### Opción 4: Despliegue con ZIP Deploy

```bash
# Crear un archivo ZIP con todos los archivos
# En PowerShell:
Compress-Archive -Path * -DestinationPath deploy.zip

# Desplegar con Azure CLI
az webapp deployment source config-zip --resource-group myResourceGroup --name myNewYearApp --src deploy.zip
```

## ⚙️ Configuración en Azure

### Configurar la versión de PHP

1. En Azure Portal, ve a tu App Service
2. Selecciona **"Configuration"** → **"General settings"**
3. En **"Stack settings"**, selecciona:
   - **Stack**: PHP
   - **PHP version**: 8.2 (o la versión que prefieras ≥ 7.4)

### Variables de Entorno (Opcional)

Si necesitas configurar variables de entorno:

1. Ve a **"Configuration"** → **"Application settings"**
2. Agrega las variables necesarias

### Habilitar logs para diagnóstico

1. Ve a **"App Service logs"**
2. Activa **"Application logging"** y **"Web server logging"**
3. Guarda los cambios

## 🔍 Verificación

Después del despliegue:

1. Visita: `https://<tu-app-name>.azurewebsites.net`
2. Deberías ver la cuenta regresiva y la carta de Año Nuevo
3. Verifica que funcionen:
   - ✅ La cuenta regresiva
   - ✅ Los fuegos artificiales al hacer clic en el botón
   - ✅ Las sorpresas interactivas
   - ✅ La responsividad en diferentes dispositivos

## 📁 Estructura del Proyecto

```
Año nuevo/
├── index.php          # Archivo principal
├── styles.css         # Estilos CSS
├── script.js          # JavaScript/Interactividad
├── web.config         # Configuración IIS (Azure)
├── .deployment        # Configuración de despliegue
├── .gitignore         # Archivos a ignorar en Git
└── README.md          # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (animaciones, gradientes)
- **Backend**: PHP 7.4+
- **Animaciones**: Animate.css, Canvas Confetti
- **Fonts**: Google Fonts (Poppins, Pacifico)
- **Hosting**: Azure App Service

## 📝 Notas Importantes

- El archivo `web.config` es específico para IIS (usado por Azure App Service con Windows)
- Si usas Azure App Service con Linux, el archivo `web.config` no es necesario
- Asegúrate de que todos los archivos estén en UTF-8 para evitar problemas con caracteres especiales

## 🎨 Personalización

Para personalizar los mensajes:
1. Edita el array `$messages` en `index.php` (líneas 95-101)
2. Edita el array `$wishes` en `index.php` (líneas 106-115)
3. Modifica la firma en `index.php` (líneas 134-138)

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ iOS Safari, Chrome Mobile
- ✅ Tablets y dispositivos móviles

## 📄 Licencia

Libre de usar y modificar según tus necesidades.

---

**¡Feliz Año Nuevo 2026!** 🎆✨
