const fetch = require('node-fetch')

const handler = async function (event, context) {
  const { identity, user } = context.clientContext
  try {
    // const response = await fetch('https://api.chucknorris.io/jokes/random');  if (!response.ok) return { statusCode: response.status, body: response.statusText }

    const data = { value: '###' } // await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ identity, user, msg: data.value }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
