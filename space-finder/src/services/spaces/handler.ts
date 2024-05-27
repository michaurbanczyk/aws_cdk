import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {Context} from "vm";

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{

    let message = ''

    switch (event.httpMethod){
        case 'GET':
            message = 'Hello from GET!'
            break;
        case 'POST':
            message = 'Hello from POST!'
            break;
        default:
            break;
    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: message
    }
    return response
}

export {handler}