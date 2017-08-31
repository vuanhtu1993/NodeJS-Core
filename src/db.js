import config from './config';
import {MongoClient} from 'mongodb'
export default callback => {
    MongoClient.connect(config.database, (err, db) => {
        if (err) {
            console.log('Error initializing connection to MongoDB')
            callback(err)
            return;
        }
        callback(null, db);
    })

}
