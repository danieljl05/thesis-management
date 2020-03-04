export class ERole {

    static ADMIN = new ERole(1, 'Admin');
    static EVALUATOR = new ERole(2, 'Evaluador');
    static STUDENT = new ERole(3, 'Estudiante');

    static list: ERole[] = [
        ERole.ADMIN,
        ERole.EVALUATOR,
        ERole.STUDENT,
    ];

    private constructor(public readonly key: any, public readonly value: any) { }

    toString() {
        return this.key.toString();
    }

}