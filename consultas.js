// Importar dependencias
const { Pool } = require('pg');

// Nueva instancia de la clase Pool() con objeto de configuración
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    port:5432,
    password:'password',
    database:'cursos',
})

// Función asincrónica para ingresar un curso
async function nuevoCurso(nombre,nivel,fecha,duracion) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre,nivel,fecha,duracion)
            VALUES ('${nombre}','${nivel}','${fecha}','${duracion}')
            RETURNING *`
        );
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

// Función asincrónica para consultar todos los cursos
async function consultarCursos() {
    try{
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

// Función asincrónica para editar un curso
async function editarCurso(id,nombre,nivel,fecha,duracion){
    try{
        const result = await pool.query(`
            UPDATE cursos SET
            nombre = '${nombre}',
            nivel = '${nivel}',
            fecha = '${fecha}',
            duracion = '${duracion}'
            WHERE id = '${id}'
            RETURNING *
        `);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

// Función asincrónica para eliminar un curso
async function eliminarCurso(id) {
    try {
        const result = await pool.query(`
            DELETE FROM cursos WHERE id = '${id}'
        `);
        
        return result.rowCount;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { nuevoCurso,consultarCursos,editarCurso,eliminarCurso };