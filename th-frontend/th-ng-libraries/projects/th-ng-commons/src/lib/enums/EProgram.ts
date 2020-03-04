export class EProgram {

    static SYSTEMS_ENGINEERING = new EProgram(1, 'Ingeniería de sistemas');
    static ELECTRONIC_ENGINEERING = new EProgram(2, 'Ingeniería electrónica');
    static INDUSTRIAL_ENGINEERING = new EProgram(3, 'Ingeniería industrial');
    static CIVIL_ENGINEERING = new EProgram(4, 'Ingeniería civil');
    static GRAPHIC_DESIGN = new EProgram(5, 'Diseño gráfico');
    static PSYCHOLOGY = new EProgram(6, 'Psicología');

    static list: EProgram[] = [
        EProgram.SYSTEMS_ENGINEERING,
        EProgram.ELECTRONIC_ENGINEERING,
        EProgram.INDUSTRIAL_ENGINEERING,
        EProgram.CIVIL_ENGINEERING,
        EProgram.GRAPHIC_DESIGN,
        EProgram.PSYCHOLOGY,
    ];

    private constructor(private readonly key: any, public readonly value: any) { }

    toString() {
        return this.key.toString();
    }

}