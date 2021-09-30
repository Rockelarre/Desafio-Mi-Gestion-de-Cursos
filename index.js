// Importar dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar funciones
const { nuevoCurso,consultarCursos,editarCurso,eliminarCurso } = require('./consultas');

// Integrar de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Iniciar servidor
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT} and PID: ${process.pid}`)
});


// Ruta raíz
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

// Ruta POST
app.post('/curso',async (req,res)=>{
    const { nombre,nivelTecnico,fechaInicio,duracion } = req.body;
    const respuesta = await nuevoCurso(nombre,nivelTecnico,fechaInicio,duracion);
    res.send(respuesta);
})

// Ruta GET
app.get('/cursos',async (req,res)=>{
    const respuesta = await consultarCursos();
    res.send(respuesta);
})

// Ruta PUT
app.put('/curso/:id',async (req,res)=>{
    const { id } = req.params;
    const { nombre,nivelTecnico,fechaInicio,duracion } = req.body
    const respuesta = await editarCurso(id,nombre,nivelTecnico,fechaInicio,duracion);
    res.send(respuesta);
})

// Ruta DELETE
app.delete('/curso/:id',async(req,res)=>{
    const { id } = req.params;
    const respuesta = await eliminarCurso(id);

    respuesta > 0
        ? res.send(`El curso de id ${id} fué eliminado con éxito`)
        : res.send('No existe un curso registrado con ese id');
})

