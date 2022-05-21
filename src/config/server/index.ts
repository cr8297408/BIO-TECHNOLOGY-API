import * as http from 'http';
import * as serverHandlers from './serverHandlers';
import server from './server';
import db from '../connection/connectBD';


const Server: http.Server = http.createServer(server);
console.log('tabla creada User');
    
async function dbConnection(){
    try {
        await db.authenticate();
        console.log('Database connect');
            
    } catch (error) {
        throw new Error(error)
    }
}

dbConnection();

Server.listen(server.get('port'), () => {
    console.log('app running'); 
});


/**
* Server Events
*/
Server.on('error', (error: Error) => serverHandlers.onError(error, server.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
 