import { Coordenada } from "../../../firebase/core/entities/coordenada";
import { Corrida } from "../../../firebase/core/entities/corrida";

export default interface CorridaRepository {
  create(corrida: Corrida): Promise<Corrida | null>;
  findById(id: string): Promise<Corrida | null>;
  findAll(callbackFunction: (data: Corrida[] | []) => void): Promise<void>;
  findByCodCorrida(codCorrida: string): Promise<Corrida | null>;
  comecarCorrida(
    idCorrida: string,
    callbackFunction: (data: Corrida) => void
  ): void;
  atualizarCoordenadas(idCorrida: string, coordenada: Coordenada): void;
}
