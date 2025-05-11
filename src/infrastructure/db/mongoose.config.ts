import mongoose from 'mongoose';
import colors from 'colors';
import { DB_URI } from '../../config.js';

export async function connect() {
  try {
    const { connection } = await mongoose.connect(DB_URI, {dbName: "linktree"});
    console.log('✅ Connected to %s:%d/%s (MongoDB)', connection.host, connection.port, connection.db?.databaseName);
  } catch (error) {
    console.error("Credentials\nDB_URI: %s", DB_URI);
    console.error(colors.bgRed.bold('❌ Error connecting to MongoDB: %s'), error);
    process.exit(1);
  }
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error(colors.bgRed.bold('❌ Error disconnecting from MongoDB: %s'), error);
  }
}