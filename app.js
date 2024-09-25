require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

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

		const database = client.db('docs');
		const collection = database.collection('users');

		await createDocument(collection);
		await readDocument(collection);
		await updateDocument(collection);
		await deleteDocument(collection);
	} catch (err) {
		console.error('Error during execution: ', err);
	} finally {
		await client.close();
	}
}
run().catch((err) => {
	console.error('Error connecting to MongoDB: ', err);
});

// createDocument function
async function createDocument(collection) {
	try {
		const doc = { name: 'John Doe', age: 30, job: 'Software Developer' };
		const result = await collection.insertOne(doc);

		console.log(`Document inserted with _id: ${result.insertedId}`);
	} catch (error) {
		console.error('Error in createDocument: ', error);
	}
}

// readDocument function
async function readDocument(collection) {
	try {
		const query = { name: 'John Doe' };
		const result = await collection.find(query).toArray();

		if (result.length === 0) {
			console.log('No document found with the given query.');
		} else {
			console.log('Documents found:', result);
		}
	} catch (error) {
		console.error('Error in reading document: ', error);
	}
}

// updateDocument function
async function updateDocument(collection) {
	try {
		const filterQuery = { name: 'John Doe' };
		const update = { $set: { job: 'CEO' } };

		const result = await collection.updateOne(filterQuery, update);

		console.log(`${result.modifiedCount} document(s) updated`);
	} catch (error) {
		console.error('Unable to find entity for updating ', error);
	}
}

// deleteDocument function
async function deleteDocument(collection) {
	try {
		const filterQuery = { name: 'John Doe', job: 'CEO' };
		const result = await collection.deleteOne(filterQuery);

		console.log(`${result.deletedCount} document(s) deleted`);
	} catch (error) {
		console.error('Unable to delete entity ', error);
	}
}
