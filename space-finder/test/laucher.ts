import {handler} from "../src/services/spaces/handler";


handler({
    httpMethod: 'PUT',
    queryStringParameters: {
        id: 'fe9f3b46-fa9f-46d5-83ad-8082d404cef4'
    },
    body: JSON.stringify({
        location: 'Dublin updated'
    })
} as any, {} as any)