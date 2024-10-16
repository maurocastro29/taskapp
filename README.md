Este es un proyecto realizado con nodejs para el manejo de tareas para diferentes usuarios.

El sistema te permite crear una cuenta nueva si no la tienes o iniciar sesion.
para las validaciones de inicio de sesion se usa token con JWT, en el archivo .env hay unas configuraciones que puedes modificar como más te convenga

para crear las nuevas tareas debe loguearse primero, las tareas se pueden: CREAR, VER, EDITAR y ELIMINAR (un CRUD básico).
* se incluye tambien la opción de buscar
* la tarea cuentan con los estados creadas o completadas. 
* la tarea le pertenece al usuario que la creo y este puede ver solo sus tareas.

para los usuario existen dos tipos de usuario los GENERAL  y los ADMIN 
* los admin pueden manipular ademas de sus propias tareas las tareas de los demas usuario
* los unicos que pueden ver solo sus tareas son los usuarios generales.

Para instalar este proyecto en tu pc necesitaras

1. tener instalado nodejs
2. tener instalado mysql (para efectos personales instale xampp que viene con mysql predeterminado)
3. clonar el repositorio en cualquier parte de pc:
* por https (git clone https://github.com/maurocastro29/taskapp.git)
4. Crear la base de datos en tu maquina con el nombre task_db
5. importar el archivo task_db.sql para crear la estructura de las tablas en la base de datos
6. abrir la linea de comandos ya sea por el editor de codigo o del sistema operativo y ejecutar el siguiente comando npm start o node app.js para correr el proyecto
7. abrir en el navegador de tu preferencia el enlace [localhost:5000](http://localhost:5000/)

El codigo fue creado en base a otros proyectos por lo que estás en libertad de usarlo y modificarlo como creas conveniente
