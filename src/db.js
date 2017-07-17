import mongoose from 'mongoose';
import config from './config';
export default callback => {
	// connect to a database if needed, then pass it to `callback`:
  mongoose.connect(config.database); // connect to database
	callback();
}
