import { Annuity, EvaluationConfig, EvaluationItem } from "th-ng-commons";

export interface AnnuityRequest {
    annuity: Annuity;
    evaluationConfig: EvaluationConfig;
    lEvaluationItem: EvaluationItem[];
}
