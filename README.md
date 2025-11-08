# HelloWorld Ecommerce

## Descripción del Proyecto

HelloWorld Ecommerce es una aplicación web de comercio electrónico full-stack construida con un backend en Python (usando Flask y SQLAlchemy) y un frontend en React (usando Vite y Tailwind CSS). La aplicación permite a los usuarios navegar productos, registrar cuentas, iniciar sesión, gestionar carritos de compra y completar compras. Incluye autenticación de usuarios, gestión de productos y una interfaz de usuario responsiva.

El backend maneja los endpoints de la API para autenticación de usuarios, recuperación de productos y operaciones de base de datos. El frontend proporciona una interfaz moderna y fácil de usar para interactuar con la plataforma de comercio electrónico.

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- **Python 3.8 o superior**: Para el servidor backend.
- **Node.js 16 o superior**: Para la compilación del frontend y el servidor de desarrollo.
- **PostgreSQL** (u otra base de datos compatible): Para la persistencia de datos. La aplicación utiliza SQLAlchemy para ORM.
- **Git**: Para clonar el repositorio.

## Instalación

1. **Clonar el repositorio**:
```bash
   git clone 
   cd HelloWorld_ecomerce
```

2. **Configuración del Backend**:
   - Navega al directorio del backend:
```bash
     cd backend
```
   - Crea un entorno virtual:
```bash
     python -m venv venv
     source venv/bin/activate  # En Windows: venv\Scripts\activate
```
   - Instala las dependencias:
```bash
     pip install -r requirements.txt
```

3. **Configuración del Frontend**:
   - Navega al directorio del frontend:
```bash
     cd ../frontend
```
   - Instala las dependencias:
```bash
     npm install
```

## Configuración

1. **Configuración de la Base de Datos**:
   - Asegúrate de que PostgreSQL esté en ejecución.
   - Actualiza la configuración de conexión de la base de datos en `backend/config/database_config.py` o utiliza variables de entorno.
   - Ejecuta el script de inicialización de la base de datos:
```bash
     python config/create_db.py
```

2. **Variables de Entorno**:
   - Crea un archivo `.env` en el directorio raíz con las configuraciones necesarias (ej., URL de la base de datos, claves secretas).
   - Ejemplo de `.env`:
```
     DATABASE_URL=postgresql://usuario:contraseña@localhost/helloworld_ecommerce
     SECRET_KEY=tu-clave-secreta
```

3. **Registro de Logs**:
   - Los logs están configurados en `backend/config/logging_config.py` y se almacenan en `backend/logs/`.

## Instrucciones de Ejecución

1. **Iniciar el Backend**:
   - Desde el directorio del backend:
```bash
     python main.py
```
   - El servidor backend se ejecutará en `http://localhost:5000` (o el puerto configurado).

2. **Iniciar el Frontend**:
   - Desde el directorio del frontend:
```bash
     npm run dev
```
   - El frontend se ejecutará en `http://localhost:5173` (o el puerto configurado).

3. **Acceder a la Aplicación**:
   - Abre tu navegador y navega a la URL del frontend.
   - Registra una nueva cuenta o inicia sesión para comenzar a comprar.

## Características

- **Autenticación de Usuarios**: Registro, inicio de sesión y gestión de perfiles de usuario.
- **Catálogo de Productos**: Navega y visualiza detalles de productos.
- **Carrito de Compras**: Agrega/elimina artículos, visualiza resumen del carrito.
- **Proceso de Compra**: Completa compras con resumen de pedido.
- **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles usando Tailwind CSS.
- **Endpoints de API**: APIs RESTful para productos, usuarios y pedidos.
- **Operaciones de Base de Datos**: Operaciones CRUD para usuarios y productos.
- **Registro de Logs**: Logs de errores y aplicación para depuración.

## Estructura del Proyecto

- `backend/`: Aplicación Flask de Python con rutas de API, modelos y configuraciones.
- `frontend/`: Aplicación React con componentes, páginas y contextos.
- `.env`: Variables de entorno (no se incluye en el control de versiones).
- `.gitignore`: Excluye archivos sensibles como `.env` y logs.
