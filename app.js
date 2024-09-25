require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');
		await createDocument();
		await readDocument();
		await updateDocument();
		await deleteDocument();
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

// createDocument function
async function createDocument() {
	try {
		const database = client.db('docs');
		const collection = database.collection('users');

		const doc = { name: 'John Doe', age: 30, job: 'Software Developer' };
		const result = await collection.insertOne(doc);

		console.log(`Document inserted with _id: ${result.insertedId}`);
	} catch (error) {
		console.error('Error in createDocument: ', error);
	}
}

// readDocument function
async function readDocument() {
	try {
		const database = client.db('docs');
		const collection = database.collection('users');

		const query = { name: 'John Doe', age: 30, job: 'Software Developer' };
		const result = await collection.find(query).toArray();

		console.log('Document return with:', result);
	} catch (error) {
		console.error('Error in reading document: ', error);
	}
}

//updateDocument function
async function updateDocument() {
	try {
		const database = client.db('docs');
		const collection = database.collection('users');

		const query = { name: 'John Doe', age: 30, job: 'Software Developer' };
		const update = { $set: { job: 'CEO' } };
		//db.collection.updateOne()

		const result = await collection.updateOne(query, update);

		console.log(`${result.modifiedCount} document(s) updated`);
	} catch (error) {
		console.error('Unable to find entity for updating ', error);
	}
}

//deleteDocument function
async function deleteDocument() {
	try {
		const database = client.db('docs');
		const collection = database.collection('users');

		const query = { name: 'John Doe', age: 30, job: 'CEO' };
		const result = await collection.deleteOne(query);

		console.log(`${result.deletedCount} document(s) deleted`);
	} catch (error) {
		console.error('Unable to delete entity ', error);
	}
}
