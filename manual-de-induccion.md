# MANUAL DE MANEJO DEL PROTOTIPO
## Sistema de Inducción Institucional y Reglamento del Aprendiz SENA
### Centro de Biotecnología Industrial • Ficha 2834912 ADSO • Vigencia Normativa: Acuerdos 009 de 2024 y 002 de 2026

---

## 1. INTRODUCCIÓN Y PROPÓSITO DEL SISTEMA

El **Portal de Inducción SENA** es una plataforma web interactiva diseñada para acompañar a la comunidad educativa en el proceso de Inducción a la Formación Profesional Integral. Ofrece herramientas de aprendizaje dinámico, simuladores de casos éticos, validación de conocimientos y seguimiento administrativo de la cohorte.

El prototipo cumple estrictamente con el **Nuevo Reglamento del Aprendiz SENA (Acuerdo 009 de 2024)** y sus modificaciones vigentes (**Acuerdo 002 de 2026**).

---

## 2. ROLES DE USUARIO Y CREDENCIALES DE ACCESO

La plataforma cuenta con 3 perfiles diferenciados con permisos específicos:

### 2.1. ROL DE APRENDIZ
- **Propósito**: Realizar las actividades de inducción, aprender la simbología institucional, consultar el reglamento, resolver evaluaciones y obtener la constancia oficial.
- **Registro de Nuevo Aprendiz**:
  1. En la portada, presionar el botón **"Registro de Nuevo Aprendiz"**.
  2. Diligenciar los datos personales indicados: Nombres completos, Tipo y Número de Documento, Correo Electrónico Institucional, Ficha y Programa de Formación.
  3. Al guardar el registro, el sistema genera automáticamente su contraseña de acceso.
- **Política de Contraseña del Aprendiz**:
  - La clave equivale a los **4 últimos dígitos de su documento de identidad** (ej. Documento `1023847562` $\rightarrow$ Contraseña `7562`).
- **Inicio de Sesión**:
  1. Presionar **"Iniciar Sesión (Aprendiz Registrado)"**.
  2. Ingresar el Número de Documento y la Contraseña de 4 dígitos.
- **Consulta por Ficha de Formación**:
  - Presionar el botón **"Consultar Aprendices por Ficha"** en la portada o en la barra superior. Permite filtrar y visualizar todos los aprendices inscritos en una Ficha específica.

---

### 2.2. ROL DE INSTRUCTOR
- **Propósito**: Supervisar el rendimiento de la cohorte, registrar planes de mejoramiento, dar seguimiento al avance de inducción y exportar informes a Coordinación Académica.
- **Credenciales de Acceso**:
  - **Usuario**: Número de Documento de Identidad del Instructor.
  - **Contraseña**: Clave personal asignada por el Administrador.
- **Fórmula Institucional de Asignación de Clave para Instructores**:
  $$\text{Clave} = \text{3 primeras letras del nombre (minúsculas)} + \text{4 últimos dígitos del documento}$$
  *Ejemplo*: Instructor **Carlos Eduardo Martínez** (Doc. `14892301`) $\rightarrow$ Contraseña: **`car2301`**.
- **Acceso en el Prototipo**:
  1. En la portada, seleccionar el botón **"Acceder como Instructor"**.
  2. Ingresar el Número de Documento y la Contraseña de Instructor (`car2301` o la asignada al registrarse).

---

### 2.3. ROL DE ADMINISTRADOR (ALTA DIRECCIÓN)
- **Propósito**: Módulo de control supremo para crear e inscribir nuevos instructores en la plataforma.
- **Credencial de Acceso Maestra**:
  - Contraseña exclusiva de Administrador: **`admon1234`** *(Restringida únicamente para la Alta Dirección)*.
- **Acciones del Administrador**:
  1. En la portada, seleccionar **"Rol de Administrador"** e ingresar la clave `admon1234`.
  2. **Inscribir Nuevo Instructor**: Diligenciar el formulario con Nombre Completo, Documento, Correo, Teléfono, Cargo, Ficha Asignada y Programa.
  3. **Previsualización de Clave**: El sistema muestra en tiempo real la contraseña asignada según la norma (3 letras del nombre + 4 dígitos del documento) para ser entregada al docente.
  4. **Directorio de Instructores**: Consultar la lista de instructores autorizados en el sistema.

---

## 3. MÓDULOS DEL PORTAL DE INDUCCIÓN

Una vez dentro de la plataforma, la navegación se realiza a través de las pestañas superiores:

### 3.1. RUTA DE INDUCCIÓN (HOME & ROADMAP)
- Panorama general del avance del aprendiz.
- Resumen de hitos completados y acceso rápido a los módulos principales.
- Reproductor oficial del **Himno del SENA** con audio interactivo y letra sincronizada.

### 3.2. IDENTIDAD Y SÍMBOLOS SENA
- Módulo educativo con los símbolos institucionales:
  - **Escudo SENA**: Explicación de los 3 sectores (Piñón - Industria, Caduceo - Comercio y Servicios, Café/Tierra - Sector Agrario).
  - **Bandera y Logotipo Oficial**: Simbología y colores institucionales (Verde SENA `#39A900` y Azul Institucional `#00324D`).
  - **Himno SENA**: Reproducción de la pieza musical institucional.
  - **Flashcards Interactivas**: Tarjetas de memorización sobre la historia, misión y visión del SENA.

### 3.3. REGLAMENTO DEL APRENDIZ (ACUERDOS 2024 Y 2026)
- Compendio normativo digitalizado y estructurado por capítulos.
- Filtro interactivo de **Derechos, Deberes, Prohibiciones, Faltas (Leves, Graves y Gravísimas), Medidas Formativas y Sanciones**.
- **Asistente Normativo (Tutor Normativo)**: Consultorio dinámico de preguntas frecuentes sobre el reglamento.

### 3.4. SIMULADOR DE CASOS PRÁCTICOS
- Escenarios reales de comités de evaluación.
- El usuario analiza dilemas académicos y disciplinarios, toma decisiones como miembro del comité y recibe retroalimentación fundamentada jurídicamente en los artículos de los Acuerdos 009 de 2024 y 002 de 2026.

### 3.5. QUIZZES Y TRIVIA INSTITUCIONAL
- Retos de evaluación contrarreloj.
- Valida los conocimientos sobre símbolos y reglamento con puntuación en tiempo real y explicaciones pedagógicas ante cada respuesta.

### 3.6. SEGUIMIENTO FICHA (PANEL DE SUPERVISIÓN)
- Vista diferenciada según el rol (Aprendiz / Instructor).
- Los instructores pueden filtrar aprendices por estado de inducción, registrar anotaciones y consultar indicadores generales de la Ficha 2834912.

### 3.7. CONSTANCIA OFICIAL DE INDUCCIÓN
- Documento formal descargable e imprimible generado automáticamente al alcanzar el 100% de los compromisos de inducción.
- Incluye firma del Instructor Líder, detalles de la Ficha y código QR de verificación.

---

## 4. GUÍA DE OPERACIÓN RÁPIDA

| Objetivo | Pasos a Seguir |
| :--- | :--- |
| **Registrar un Aprendiz** | Portada $\rightarrow$ Rol de Aprendiz $\rightarrow$ "Registro de Nuevo Aprendiz" $\rightarrow$ Diligenciar datos $\rightarrow$ Guardar. |
| **Ingresar como Aprendiz** | Portada $\rightarrow$ Rol de Aprendiz $\rightarrow$ "Iniciar Sesión" $\rightarrow$ Documento y clave (4 dígitos). |
| **Consultar Aprendices por Ficha** | Portada o Barra Superior $\rightarrow$ "Consultar Aprendices por Ficha" $\rightarrow$ Filtrar por número de Ficha. |
| **Ingresar como Instructor** | Portada $\rightarrow$ Rol de Instructor $\rightarrow$ Ingrese Documento y Clave (ej. `car2301`). |
| **Inscribir un Instructor (Admin)** | Portada $\rightarrow$ Rol de Administrador $\rightarrow$ Clave `admon1234` $\rightarrow$ "Nuevo Instructor" $\rightarrow$ Guardar. |
| **Descargar Constancia SENA** | Iniciar sesión como Aprendiz $\rightarrow$ Completar la Ruta $\rightarrow$ Presionar "Constancia SENA" en el encabezado $\rightarrow$ Imprimir/PDF. |
| **Cambiar Modo Oscuro/Claro** | Presionar el botón de **"Modo Oscuro / Modo Claro"** en la barra superior de la pantalla. |

---

## 5. SOPORTE Y CONTACTO TÉCNICO

- **Centro de Formación**: Centro de Biotecnología Industrial (CBI)
- **Regional**: Regional Valle del Cauca
- **Ficha de Formación**: 2834912 ADSO
- **Instructor Líder**: Ing. Carlos Eduardo Martínez (`cmartinez@sena.edu.co`)
- **Sistema**: Plataforma de Inducción Institucional SENA (Vigencia 2026)
