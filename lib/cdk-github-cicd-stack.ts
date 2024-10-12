import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkGithubCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'CDKGithubPipeline', {
      pipelineName: 'CDKGithubPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('nduevans/cdk-github-cicd', 'main'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    });
  }
}
