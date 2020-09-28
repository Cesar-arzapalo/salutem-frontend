export class PreguntaModel {

    constructor(public descrpcion: string, public alternativas: string[],
                public tipoAlteranativa: number, tipoVariable: string,
                public nroPagina: number, public id: string) {

    }

}
