import { Coordenada } from "./coordenada";
import { Entidade } from "./entidade";

interface UsuarioProps extends Entidade {
  nome: string;
  cargo: string;
  ultimoAcesso: Date;
  ultimaCoordenada: Coordenada;
  ativo: boolean;
}

export default class Usuario extends Entidade {
  private _nome: string;
  private _cargo: string;
  private _ultimoAcesso: Date;
  private _ultimaCoordenada: Coordenada;

  constructor(props: UsuarioProps) {
    super({
      id: props.id,
      ativo: props.ativo,
      criadoEm: props.criadoEm,
      alteradoEm: props.alteradoEm,
    });
    this._nome = props.nome;
    this._cargo = props.cargo;
    this._ultimoAcesso = props.ultimoAcesso;
    this._ultimaCoordenada = props.ultimaCoordenada;
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
