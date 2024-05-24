exports.main = async function(event, context){

    console.log("Hello we are in the lambda!")

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    }
}
