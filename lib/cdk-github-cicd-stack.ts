import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CdkGithubCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CDKGithubPipeline', {
      pipelineName: 'CDKGithubPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('nduevans/cdk-github-cicd', 'main'),
        commands: [
          // 'cd cdk-github-cicd',
          'npm ci', // clean install
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineStage', {
      stageName: 'TestStage',
    }))
  }
}
