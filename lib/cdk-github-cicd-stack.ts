import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CdkGithubCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CDKGithubPipeline', {
      pipelineName: 'CDKGithubPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource .gitHub('nduevans/cdk-github-cicd', 'main'),
        commands: [
          // 'cd cdk-github-cicd', // no need to navigate any folder
          'npm ci', // clean install
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineStage', {
      stageName: 'TestStage',
    }));

    testStage.addPre(new CodeBuildStep('unit-tests', {
      commands: [
        // 'cd cdk-github-cicd',
        'npm ci',
        'npm test'
      ]
    }))
  }
}
