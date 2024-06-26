import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {
    DeleteItemCommand,
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
    UpdateItemCommand
} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";


export async function deleteSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters)){

        const spaceId = event.queryStringParameters['id']

        await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            }
        }))

        return {
            statusCode: 204,
            body: JSON.stringify(`Deleted space with id ${spaceId}`)
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right Id!')
    }
}