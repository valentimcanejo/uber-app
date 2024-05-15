import { Entidade } from "./entidade";

export default class Usuario extends Entidade {
  constructor(
    id: string,
    private _nome: string,
    private _cargo: string,
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
}
