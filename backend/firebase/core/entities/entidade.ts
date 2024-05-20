export class Entidade {
  constructor(
    private _id: string | null | undefined,
    private _ativo: boolean | null | undefined,
    private _criadoEm: Date | null | undefined,
    private _alteradoEm: Date | null | undefined
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
