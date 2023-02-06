import * as mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

// Once we connect to the database once, we'll store that connection
// and reuse it so that we don't have to connect to the database on every request.
let cachedDb: mongodb.Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const URI = process.env.MONGODB_URI ?? '';
  if (!URI) {
    throw new Error('Missing Mong db Uri env variable');
  }
  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(URI);

  // Specify which database we want to use
  cachedDb = await client.db('crypto-portfolio');

  return cachedDb;
}

export async function usersCollection() {
  const db = await connectToDatabase();
  return db.collection('users');
}
