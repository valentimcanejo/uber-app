export class Coordenadas {
  constructor(private _latitude: number, private _longitude: number) {}

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }
}

export default class Corrida {
  constructor(
    private _id: string,
    private _tempo: string,
    private _localizacaoInicial: string,
    private _localizacaoFinal: string,
    private _coordenadas: Coordenadas[],
    private _criadoEm: Date,
    private _alteradoEm: Date
  ) {}

  get id() {
    return this._id;
  }

  get tempo() {
    return this._tempo;
  }

  get localizacaoInicial() {
    return this._localizacaoInicial;
  }

  get localizacaoFinal() {
    return this._localizacaoFinal;
  }

  get coordenadas() {
    return this._coordenadas;
  }

  get criadoEm() {
    return this._criadoEm;
  }

  get alteradoEm() {
    return this._alteradoEm;
  }
}
