import { Stage, StageProps } from "aws-cdk-lib";
import { StackSetDeploymentModel } from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";

export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps){
    super(scope, id, props)

    // place to hold our other Stacks
    new LambdaStack(this, "LambdaStack", {
        stageName: "LambdaStageName"
    })
    }
    
}