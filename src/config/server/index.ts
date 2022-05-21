import * as http from 'http';
import * as serverHandlers from './serverHandlers';
import server from './server';
import sequelize from '../connection/connectBD';

(async () => {
    await sequelize.sync();

    const Server: http.Server = http.createServer(server);
    console.log('tabla creada User');
    

    Server.listen(server.get('port'), () => {
        console.log('app running'); 
    });

    /**
    * Server Events
    */
    Server.on('error', (error: Error) => serverHandlers.onError(error, server.get('port')));
    Server.on('listening', serverHandlers.onListening.bind(Server));

})()
