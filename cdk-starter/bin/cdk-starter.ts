#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import {PhotosStack} from "../lib/photos-stack";
import {PhotosHandlerStack} from "../lib/photos-handler-stack";
import {BucketTaggers} from "../lib/tagger";

const app = new cdk.App();
// new CdkStarterStack(app, 'CdkStarterStack', {});
const photoStack = new PhotosStack(app, 'PhotosStack', {})
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photoStack.photosBucketArn
})
const tagger = new BucketTaggers('level', 'test')
cdk.Aspects.of(app).add(tagger)