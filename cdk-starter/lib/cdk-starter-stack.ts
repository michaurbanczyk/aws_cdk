import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket, CfnBucket} from 'aws-cdk-lib/aws-s3'
import {CfnOutput, CfnParameter, Duration} from "aws-cdk-lib";
import {CfnOutcome} from "aws-cdk-lib/aws-frauddetector";

// L3 Approach
class L3Bucket extends Construct{
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [
        {expiration: Duration.days(expiration)}
      ]
    })
  }
}


export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // L1 approach
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: 'Enabled'
          }
        ]
      }
    })

    const duration = new CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })


    // L2 approach
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {expiration: Duration.days(duration.valueAsNumber)}
      ]
    })

    // L3 approach
    new L3Bucket(this, 'MyL3Bucket', 3)


    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    })
  }

}
