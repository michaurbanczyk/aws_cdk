import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {Fn} from "aws-cdk-lib";
import {Code, Function as LambdaFunction, Runtime} from "aws-cdk-lib/aws-lambda"

interface PhotosHandlerStackProp extends cdk.StackProps {
    targetBucketArn: string
}

export class PhotosHandlerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PhotosHandlerStackProp) {
        super(scope, id, props);

        const {targetBucketArn} = props

        new LambdaFunction(this, "PhotosHandler", {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromInline(`exports.handler = async (event) => {
                console.log("Hello: " + process.env.TARGET_BUCKET)
            }`),
            environment: {
                TARGET_BUCKET: targetBucketArn
            }
        })

    }
}
