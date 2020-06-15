import { Project } from "th-ng-commons";

export interface EvaluationRequest {
    project: Project;
    approved: boolean;
    lNewEvaluation: any[];
    lUpdateEvaluation: any[];
}
