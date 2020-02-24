export class Role {

    static SYSTEMS_ENGINEERING = new Role('1', 'Admin');
    static ELECTRONIC_ENGINEERING = new Role('2', 'Evaluator');
    static INDUSTRIAL_ENGINEERING = new Role('3', 'Student');

    private constructor(private readonly key: string, public readonly value) {}

    toString() {
        return this.key;
    }

}