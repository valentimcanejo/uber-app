export interface EntidadeProps {
  id?: string | null | undefined;
  ativo: boolean | null | undefined;
  criadoEm: Date | null | undefined;
  alteradoEm: Date | null | undefined;
}

export class Entidade {
  private _id: string | null | undefined;
  private _ativo: boolean | null | undefined;
  private _criadoEm: Date | null | undefined;
  private _alteradoEm: Date | null | undefined;

  constructor(props: EntidadeProps) {
    this._id = props.id;
    this._ativo = props.ativo;
    this._criadoEm = props.criadoEm;
    this._alteradoEm = props.alteradoEm;
  }

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
