#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkGithubCicdStack } from '../lib/cdk-github-cicd-stack';

const app = new cdk.App();
new CdkGithubCicdStack(app, 'CdkGithubCicdStack', {
});

app.synth();