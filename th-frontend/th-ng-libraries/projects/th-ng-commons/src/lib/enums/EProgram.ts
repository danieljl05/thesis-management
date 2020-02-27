export class EProgram {

    static SYSTEMS_ENGINEERING = new EProgram('1', 'Ingeniería de sistemas');
    static ELECTRONIC_ENGINEERING = new EProgram('2', 'Ingeniería electrónica');
    static INDUSTRIAL_ENGINEERING = new EProgram('3', 'Ingeniería industrial');
    static CIVIL_ENGINEERING = new EProgram('4', 'Ingeniería civil');
    static GRAPHIC_DESIGN = new EProgram('5', 'Diseño gráfico');
    static PSYCHOLOGY = new EProgram('6', 'Psicología');

    private constructor(private readonly key: string, public readonly value) {}

    toString() {
        return this.key;
    }

}