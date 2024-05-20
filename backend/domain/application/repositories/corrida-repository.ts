import Corrida from "../../../firebase/core/entities/corrida";

export default interface CorridaRepository {
  create(corrida: Corrida): Promise<Corrida | null>;
  findById(id: string): Promise<Corrida | null>;
  findAll(callbackFunction: (data: Corrida[] | []) => void): Promise<Corrida[]>;
  findByCodCorrida(codCorrida: string): Promise<Corrida | null>;
}
