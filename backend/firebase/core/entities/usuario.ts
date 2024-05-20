import { Coordenada } from "./coordenada";
import { Entidade } from "./entidade";

export default class Usuario extends Entidade {
  constructor(
    id: string,
    private _nome: string,
    private _cargo: string,
    private _ultimoAcesso: Date,
    private _ultimaCoordenada: Coordenada,
    ativo: boolean,
    criadoEm: Date,
    alteradoEm: Date
  ) {
    super(id, ativo, criadoEm, alteradoEm);
  }

  get nome() {
    return this._nome;
  }

  get cargo() {
    return this._cargo;
  }

  get ultimoAcesso() {
    return this._ultimoAcesso;
  }

  get ultimaCoordenada() {
    return this._ultimaCoordenada;
  }
}
