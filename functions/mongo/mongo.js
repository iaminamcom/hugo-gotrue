// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    const { identity, user } = context.clientContext;
    console.log(context.clientContext);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: context.clientContext }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
