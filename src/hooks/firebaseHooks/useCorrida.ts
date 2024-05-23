import { Coordenada } from "../../../backend/firebase/core/entities/coordenada";
import { Corrida } from "../../../backend/firebase/core/entities/corrida";
import { FirebaseCorridaRepository } from "../../../backend/firebase/repositories/firebase-corridas-repository";

export default function useCorrida() {
  const instanciaRepositorioCorrida = new FirebaseCorridaRepository();

  const registrarCorrida = async (corrida: Corrida) =>
    await instanciaRepositorioCorrida.create(corrida);

  const atualizarPosicao = async (idCorrida: string, coordenada: Coordenada) =>
    await instanciaRepositorioCorrida.atualizarCoordenadas(
      idCorrida,
      coordenada
    );

  const comecarCorrida = async (
    idCorrida: string,
    callbackFunction: (data: Corrida) => void
  ) => {
    return await instanciaRepositorioCorrida.comecarCorrida(
      idCorrida,
      callbackFunction
    );
  };

  return { comecarCorrida, registrarCorrida, atualizarPosicao };
}
