const fs = require('fs');
//colocamos la ruta en donde se va a guardar el archivo
const archivo = './db/data.json';

const guardarDB = ( data ) => {

    //creamos el archivo
    //y pasamos de arreglo a un string
    fs.writeFileSync( archivo , JSON.stringify (data) );

}

const leerDB = () => {

    if( !fs.existsSync(archivo) ) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});
    const data = JSON.parse(info);
    //console.log(data);

    return data;

}

module.exports = {
    guardarDB,
    leerDB
}