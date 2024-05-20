import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {CfnOutput, Fn} from "aws-cdk-lib";


export class PhotosStack extends cdk.Stack {
    private stackSuffix: string;
    public readonly photosBucketArn: string;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix()

        const photosBucket = new Bucket(this, 'MyPhotosBucket', {
            bucketName: `photosbucket-${this.stackSuffix}`
        })

        this.photosBucketArn = photosBucket.bucketArn
    }

    private initializeSuffix(){
        const shortStack = Fn.select(2, Fn.split('/', this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStack))
    }
}
