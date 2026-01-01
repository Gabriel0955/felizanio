# 🚀 Instrucciones de Despliegue para Azure

## ❌ Problema Actual

Estás intentando usar **Azure Static Web Apps** pero tu aplicación es **PHP**.
**Azure Static Web Apps NO soporta PHP.**

## ✅ Solución: Usar Azure App Service

### Método 1: Portal de Azure (Más Fácil)

1. **Ir a Azure Portal**: https://portal.azure.com

2. **Crear App Service**:
   - Haz clic en "Create a resource"
   - Busca "Web App" y selecciónalo
   - Configuración:
     - **Resource Group**: Crea uno nuevo o usa existente
     - **Name**: nombre-unico-para-tu-app
     - **Publish**: Code
     - **Runtime stack**: PHP 8.2
     - **Operating System**: Windows (para usar web.config)
     - **Region**: Selecciona la más cercana
     - **Pricing plan**: Free F1 o Basic B1

3. **Desplegar con ZIP**:
   ```powershell
   # En tu carpeta del proyecto
   Compress-Archive -Path index.php,styles.css,script.js,web.config -DestinationPath deploy.zip
   ```
   
   - En Azure Portal, ve a tu App Service
   - Busca "Advanced Tools" → "Go"
   - En la nueva pestaña, ve a "Tools" → "Zip Push Deploy"
   - Arrastra tu `deploy.zip`
   - ¡Listo! 🎉

### Método 2: Azure CLI

```bash
# 1. Instalar Azure CLI
# https://docs.microsoft.com/cli/azure/install-azure-cli

# 2. Login
az login

# 3. Crear Resource Group
az group create --name myResourceGroup --location eastus

# 4. Crear App Service Plan
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku F1

# 5. Crear Web App
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name nombre-unico-app --runtime "PHP:8.2"

# 6. Desplegar código
# Desde la carpeta del proyecto:
az webapp up --name nombre-unico-app --resource-group myResourceGroup --runtime "PHP:8.2"
```

### Método 3: GitHub Actions (CI/CD Automático)

1. **Inicializar Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Crear repo en GitHub** y hacer push:
   ```bash
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git branch -M main
   git push -u origin main
   ```

3. **En Azure Portal**:
   - Ve a tu App Service
   - "Deployment Center" → "GitHub"
   - Autoriza y selecciona tu repositorio
   - Azure creará automáticamente el workflow de GitHub Actions
   - Cada push desplegará automáticamente 🚀

## 🔍 Verificar Despliegue

Después del despliegue, visita:
```
https://nombre-unico-app.azurewebsites.net
```

Si ves la cuenta regresiva, ¡funcionó! 🎆

## 🛠️ Troubleshooting

### Si ves un error 500:
1. Ve a "App Service logs" en Azure Portal
2. Activa "Application logging" y "Web server logging"
3. Revisa los logs en "Log stream"

### Si no se muestra index.php:
- Asegúrate de que `web.config` esté en la carpeta raíz
- Verifica que PHP runtime esté configurado correctamente

### Si los estilos no cargan:
- Verifica que todos los archivos (CSS, JS) estén en la misma carpeta
- Revisa la consola del navegador (F12) para errores

---

## 📊 Comparación: Static Web Apps vs App Service

| Característica | Static Web Apps | App Service |
|----------------|-----------------|-------------|
| **PHP Support** | ❌ NO | ✅ SÍ |
| **HTML/CSS/JS** | ✅ SÍ | ✅ SÍ |
| **Precio Free Tier** | ✅ Generoso | ✅ Limitado |
| **Tu Aplicación** | ❌ No compatible | ✅ **USAR ESTE** |
