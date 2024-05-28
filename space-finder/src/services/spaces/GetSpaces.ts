import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBClient, GetItemCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";


export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters){
        if ('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id']
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': {S: spaceId}
                }
            }))
            if (getItemResponse.Item){
                const unmarshalled = unmarshall(getItemResponse.Item)
                return {
                    statusCode: 200,
                    body: JSON.stringify(unmarshalled)
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Space with spaceId: ${spaceId} not found!`)
                }
            }
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify('Id required!')
            }
        }
    }

    const results = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME,
    }))
    const unmarshalledItems = results.Items?.map(item => unmarshall(item))


    return {
        statusCode: 201,
        body: JSON.stringify(unmarshalledItems)
    }
}