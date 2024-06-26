import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {v4} from "uuid";
import {marshall} from "@aws-sdk/util-dynamodb";

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const randomId = v4();
    const item = JSON.parse(event.body)
    item.id = randomId

    const results = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
    }))

    console.log("Results", results)
    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}