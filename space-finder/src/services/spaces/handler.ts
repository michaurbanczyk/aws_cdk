import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {Context} from "vm";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {postSpaces} from "./PostSpaces";
import {getSpaces} from "./GetSpaces";


const ddbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{

    let message = ''

    try {
        switch (event.httpMethod){
            case 'GET':
                return await getSpaces(event, ddbClient);
            case 'POST':
                return await postSpaces(event, ddbClient);
            default:
                break;
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }


    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: message
    }
    return response
}

export {handler}