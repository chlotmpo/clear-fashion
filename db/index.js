const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://chlotmpo:kp2MUB8zZUMtxi9@clearfahsion.poek8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashion';


// async function main () {
//     const client = new MongoClient(MONGODB_URI);
//     try {
//         await client.connect();
//         console.log("Connection to MongoDB - ClearFashion cluster ...");
//     } catch(e) {
//         console.error(e);
//     }
//     finally {
//         await client.close();
//         console.log("Connection successful");
//     }
// }

// main().catch(console.error);

let client

// async function Connect(MONGODB_URI, MONGODB_DB_NAME){
//     try {     
//         const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true}); 
//         const db =  client.db(MONGODB_DB_NAME)
//     }
//     catch(e) {
//         console.error(e);
//     }
//     finally {
//         await client.close();
//     }
// }

// Connect(MONGODB_URI, MONGODB_DB_NAME);

async function Connect(MONGODB_URI, MONGODB_DB_NAME){
    console.log("⏳ Connection to MongoDB - ClearFashion cluster ...");
    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    console.log("🎯 Connection Successful");
    const db =  client.db(MONGODB_DB_NAME)
}

async function Close(){
    await client.close();
    console.log("🔐 Connection Closed");
}

async function main(){
    await Connect(MONGODB_URI, MONGODB_DB_NAME);
    await Close();
}

main();