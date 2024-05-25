import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {Context} from "vm";
import {v4} from "uuid";


async function handler(event: APIGatewayProxyEvent, context: Context){
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Hello from lambda, this is the id: ` + v4())
    }
    console.log("Event", event)
    return response
}

export {handler}