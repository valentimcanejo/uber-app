import { Coordenada } from "./coordenada";
import { Entidade } from "./entidade";

export default class Corrida extends Entidade {
  constructor(
    id: string,
    private _tempo: string,
    private _localizacaoInicial: string,
    private _localizacaoFinal: string,
    private _status: string,
    private _coordenadas: Coordenada[],
    ativo: boolean,
    criadoEm: Date,
    alteradoEm: Date
  ) {
    super(id, ativo, criadoEm, alteradoEm);
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

  get status() {
    return this._status;
  }

  get coordenadas() {
    return this._coordenadas;
  }
}
