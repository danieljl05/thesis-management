export class Program {

    static SYSTEMS_ENGINEERING = new Program('1', 'Ingeniería de sistemas');
    static ELECTRONIC_ENGINEERING = new Program('2', 'Ingeniería electrónica');
    static INDUSTRIAL_ENGINEERING = new Program('3', 'Ingeniería industrial');
    static CIVIL_ENGINEERING = new Program('4', 'Ingeniería civil');
    static GRAPHIC_DESIGN = new Program('5', 'Diseño gráfico');
    static PSYCHOLOGY = new Program('6', 'Psicología');

    private constructor(private readonly key: string, public readonly value) {}

    toString() {
        return this.key;
    }

}