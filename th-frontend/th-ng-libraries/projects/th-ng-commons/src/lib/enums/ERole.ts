export class ERole {

    static ADMIN = new ERole('1', 'Admin');
    static EVALUATOR = new ERole('2', 'Evaluator');
    static STUDENT = new ERole('3', 'Student');

    private constructor(private readonly key: string, public readonly value) {}

    toString() {
        return this.key;
    }

}