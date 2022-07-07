const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient("mongodb+srv://web:PH5AqUBfNJRw3H7Q@scraper.qtquw.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const handler = async function (event, context) {
  const { identity, user } = context.clientContext
  const { NE, SW } = event.queryStringParameters

  console.log(NE, SW);
  try {

    if (!user) return { statusCode: 401, body: JSON.stringify({ message: 'You\'re not authorized.' }) }

    await client.connect();
    const coll = client.db("scraped-data").collection("data");
    const coords = [SW.split(',').map(Number), NE.split(',').map(Number)]
    const data = await coll.find({ "location.geometry": { $geoWithin: { $box: coords } } }).toArray()

    return { statusCode: 200, body: JSON.stringify({ data }) }

  } catch ({ message }) {
    console.log(message)
    return { statusCode: 500, body: JSON.stringify({ message }) }

  } finally {
    await client.close();
  }
}

module.exports = { handler }
