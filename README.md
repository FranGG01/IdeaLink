# 💡 IdeaLink

**IdeaLink** es una plataforma colaborativa donde desarrolladores y creativos pueden **publicar ideas, encontrar colaboradores, chatear en tiempo real y crear proyectos conjuntos** directamente desde el navegador.

Desarrollada como un proyecto **Full Stack** con **React + Flask + PostgreSQL**, IdeaLink busca fomentar la cooperación y la innovación en la comunidad tecnológica.

---

## 🚀 Características principales

- 🔐 **Autenticación JWT** (registro, login y persistencia de sesión segura)  
- 🧠 **Feed dinámico** con proyectos destacados, hashtags y favoritos  
- 💬 **Sistema de chat en tiempo real** integrado con **Stream Chat**  
- 🧩 **Gestión de postulaciones** (aceptar o rechazar colaboradores)  
- 👤 **Perfil de usuario editable** (avatar, fondo, descripción y proyectos)  
- 🧭 **Carrusel de proyectos colaborativos** en la sección de edición  
- 💻 **Integración embebida de StackBlitz SDK** para editar proyectos online  
- 🔔 **Notificaciones** para solicitudes de colaboración  
- 🌙 **Diseño moderno y responsive** con **Tailwind CSS**  

---

## 🧱 Tecnologías utilizadas

### Frontend
- **React 18 + Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Lucide Icons**
- **Stream Chat SDK**
- **StackBlitz SDK**
- **Reducer / Hooks / Context API**

### Backend
- **Flask (Python)**
- **Flask-JWT-Extended**
- **SQLAlchemy**
- **PostgreSQL**
- **CORS / Marshmallow**
- **Render (Deploy)**

---

## ⚙️ Instalación y uso local

### 🔹 Clonar el repositorio
```bash
git clone https://github.com/FranGG01/IdeaLink.git
cd IdeaLink
```

### 🔹 Frontend
```bash
cd client
npm install
npm run dev
```

### 🔹 Backend
```bash
cd server
pip install -r requirements.txt
flask run
```

> Asegúrate de configurar tus variables de entorno (`.env`) con las claves JWT, base de datos y Stream Chat antes de ejecutar.

---

## 📂 Estructura del proyecto
```
IdeaLink/
├── client/               # Frontend en React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── ...
├── server/               # Backend Flask
│   ├── app.py
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md
```

---

## 🧑‍💻 Autores
- **Francisco García** — Full Stack Developer  
- **Juanca** — Full Stack Developer  

---

## 🌍 Demo
📸 [Versión demo de IdeaLink (presentación completa)](https://github.com/FranGG01/IdeaLink)  
*(Incluye: login/register, feed, postulaciones, chat, perfil, colaboraciones, sección About Us, centro de ayuda y easter egg interactivo.)*

---

## 💬 Visión
> “Una plataforma escalable donde la creatividad y la colaboración se fusionan. IdeaLink sigue en desarrollo — la integración de IA y nuevas funcionalidades están en camino.”

---

## 🏷️ Licencia
Este proyecto se distribuye bajo la licencia **MIT**.
