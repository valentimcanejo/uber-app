export class UsuariosCorridas {
  constructor(
    private _id: string,
    private _usuarioId: string,
    private _corridaId: string,
    private _criadoEm: Date,
    private _alteradoEm: Date
  ) {}

  get id() {
    return this._id;
  }

  get usuarioId() {
    return this._usuarioId;
  }

  get corridaId() {
    return this._corridaId;
  }

  get criadoEm() {
    return this._criadoEm;
  }

  get alteradoEm() {
    return this._alteradoEm;
  }
}
