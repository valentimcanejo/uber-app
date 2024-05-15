export class Entidade {
  constructor(
    private _id: string,
    private _ativo: boolean,
    private _criadoEm: Date,
    private _alteradoEm: Date
  ) {}

  get id() {
    return this._id;
  }

  get ativo() {
    return this._ativo;
  }

  get criadoEm() {
    return this._criadoEm;
  }

  get alteradoEm() {
    return this._alteradoEm;
  }
}
