import { Coordenada } from "./coordenada";
import { Entidade, EntidadeProps } from "./entidade";
export interface CorridaProps extends EntidadeProps {
  tempo: string;
  codCorrida: string;
  localizacaoInicial: string;
  localizacaoFinal: string;
  status: string;
  coordenadas: Coordenada[];
}

export default class Corrida extends Entidade {
  private _tempo: string;
  private _codCorrida: string;
  private _localizacaoInicial: string;
  private _localizacaoFinal: string;
  private _status: string;
  private _coordenadas: Coordenada[];

  constructor(props: CorridaProps) {
    super({
      id: props.id,
      ativo: props.ativo,
      criadoEm: props.criadoEm,
      alteradoEm: props.alteradoEm,
    });
    this._tempo = props.tempo;
    this._codCorrida = props.codCorrida;
    this._localizacaoInicial = props.localizacaoInicial;
    this._localizacaoFinal = props.localizacaoFinal;
    this._status = props.status;
    this._coordenadas = props.coordenadas;
  }

  get tempo() {
    return this._tempo;
  }

  get codCorrida() {
    return this._codCorrida;
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
