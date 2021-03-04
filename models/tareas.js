const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};
    
    get listadoArr() {

        const listado = [];
        Object.keys( this._listado).forEach( key => {
            //console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }
    
    constructor(  ) {

        this._listado = {};
        
    }

    //borrar una tarea 
    borrarTarea( id = '') {
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArry( tareas = []) {

        tareas.forEach( tarea => {


            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        //se coloca para crear un espacio en blanco
        console.log();
        this.listadoArr.forEach( (tarea, id) => {

            const idx = `${id + 1}`.green;
            const { desc, completadoEn } = tarea;

            const estado = ( completadoEn )
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            
            //console.log(idx);
            //armar la salida del listado de tareas
            console.log( ` ${idx} ${ desc} :: ${ estado} `);

        });
    }

    listarPendientesCompletadas( completadas = true) {

        //se coloca para crear un espacio en blanco
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            
                            if( completadoEn) {
                                //mostrar completadas
                                if( completadas ) {
                                    contador += 1;
                                    console.log( ` ${(contador + '.').green} ${ desc} :: ${ completadoEn.green} `);
                                }
                            } else {
                                if( !completadas ) {
                                    contador += 1;
                                    console.log( ` ${(contador + '.').red} ${ desc} :: ${ estado} `);
                                }
                                //
                            }

        });


    }

    toggleCompletadas (ids = []){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });


    }

}

module.exports = Tareas;