require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    //console.log('Hola Mundo');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    //si hay tareas 
    if( tareasDB) {
        //cargar tareas
        tareas.cargarTareasFromArry( tareasDB);

    }

    //imprime el menu
    do {
        opt = await inquirerMenu();
        //esto es para ver que opcion se selecciono
        //console.log({opt});

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                //console.log(desc);
                tareas.crearTarea( desc );
            break;

            case '2':
                // crear opcion
                tareas.listadoCompleto( );
                //console.log( tareas.listadoArr);
                
            break;

            case '3':
                // Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                // Listar pendiente                
                tareas.listarPendientesCompletadas(false);
            break;

            case '5'://completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                //console.log(ids);
                tareas.toggleCompletadas( ids);
                
            break;

            case '6':
                // Borrar              
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if( id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                //console.log({ok});
            break;



        }

        //const tareas = new Tareas();
        //const tarea = new Tarea('Comprar comida');

        //tareas._listado[tarea.id] = tarea;

        //console.log(tareas);

        //enviamos el arreglo de tareas para generar el txt
        guardarDB( tareas.listadoArr);

        await pausa()

        //if( opt !== '0') await pausa();
        
    } while ( opt !== '0' );

    //pausa();
}

main();