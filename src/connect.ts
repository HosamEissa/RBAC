import mongoose from 'mongoose';

export default (db: string) => {
	console.log(db)
	const connect = () => {
		mongoose.connect(
			db,
			{ useNewUrlParser: true }
		)
			.then(() => {
				return console.info(`Successfully connected to ${db}`);
			})
			.catch(error => {
				console.error('Error connecting to database: ', error);
				return process.exit(1);
			});
	}
	connect();
	mongoose.connection.on('disconnected', connect);
}
