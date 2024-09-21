const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.registerTask = async (req, res) => {
    try {
        const nombre_task = req.body.taskInput;
        const userId = req.user.user_id;  // Obtiene el ID del usuario autenticado
        console.log(req.user);
        if (!userId) {
            console.log('Error: No se encontró el userId en req.user');
            return res.status(400).send('No se puede registrar la tarea. El usuario no está autenticado.');
        }

        // Inserta la tarea con el user_id correspondiente
        conexion.query('INSERT INTO task SET ?', {nombre_task: nombre_task, status: 0, user_id: userId}, (error, result) => {
            if (error) {
                console.log('Error al registrar la tarea:', error);
                return res.status(500).send('Error al registrar la tarea');
            }
            res.redirect('/');
        });
    } catch (error) {
        console.log('Error general al registrar la tarea:', error);
        res.status(500).send('Error en el servidor');
    }
};



exports.getAllTareas = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const tipoUsuario = req.user.tipo_usuario;
        let query = 'SELECT * FROM task';
        let queryParams = [];

        if (tipoUsuario === 'GENERAL') {
            // Si es un usuario GENERAL, solo traerá las tareas que le pertenecen
            query += ' WHERE user_id = ?';
            queryParams.push(userId);
        }

        conexion.query(query, queryParams, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al recuperar las tareas');
            }

            res.render('index', {
                user: req.user,  // el usuario autenticado
                tasks: result    // las tareas recuperadas
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error del servidor');
    }
};


exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    conexion.query('DELETE FROM task WHERE id_task = ?', [taskId], (error, results) => {
        if (error) {
            console.log(error);
        }
        res.redirect('/');
    });
};

exports.editTask = async (req, res) => {
    try {
        const { id_task, nombre_task, status } = req.body;
        conexion.query('UPDATE task SET nombre_task = ?, status = ? WHERE id_task = ?', [nombre_task, status, id_task], (error, results) => {
            if (error) {
                console.log(error);
            }
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
    }
};

exports.searchTasks = (req, res) => {
    const searchQuery = req.query.search; // Captura el parámetro de búsqueda
    
    if (!searchQuery) {
        return res.redirect('/'); // Si no hay término de búsqueda, redirige a la página principal
    }

    // Realiza la búsqueda en la base de datos
    conexion.query('SELECT * FROM task WHERE nombre_task LIKE ?', ['%' + searchQuery + '%'], (error, results) => {
        if (error) {
            console.error('Error al buscar tareas:', error);
            return res.status(500).send('Error al realizar la búsqueda');
        }

        // Renderiza la página con los resultados
        res.render('index', { user: req.user, tasks: results });
    });
};


//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const nombres_user = req.body.nombres_user
        const user = req.body.user
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)    
        //console.log(passHash)   
        conexion.query('INSERT INTO users SET ?', {user:user, nombres_user: nombres_user, password:passHash}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].password)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].user_id
                    const token = jwt.sign({user_id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE user_id = ?', [decodificada.user_id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}