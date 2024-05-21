import { Coordenada } from "./coordenada";
import { Entidade, EntidadeProps } from "./entidade";
export interface CorridaProps extends EntidadeProps {
  tempo: number;
  codCorrida: string;
  localizacaoInicial: string;
  localizacaoFinal: string;
  status: string;
  coordenadas: Coordenada[];
}

export class Corrida extends Entidade {
  private _tempo: number;
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

  static gerarCodCorrida(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  static criar(data: Partial<Corrida>): Corrida {
    return new Corrida({
      id: data.id || "",
      codCorrida: data.codCorrida || this.gerarCodCorrida(),
      tempo: data.tempo || 0,
      localizacaoInicial: data.localizacaoInicial || "",
      localizacaoFinal: data.localizacaoFinal || "",
      status: data.status || "",
      coordenadas: data?.coordenadas || [],
      ativo: data.ativo !== undefined ? data.ativo : true,
      criadoEm: data.criadoEm || new Date(),
      alteradoEm: data.alteradoEm || new Date(),
    });
  }
}
