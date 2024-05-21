import { Corrida } from "../../../backend/firebase/core/entities/corrida";
import { FirebaseCorridaRepository } from "../../../backend/firebase/repositories/firebase-corridas-repository";

export default function useCorrida() {
  const instanciaRepositorioCorrida = new FirebaseCorridaRepository();

  const registrarCorrida = async (corrida: Corrida) =>
    await instanciaRepositorioCorrida.create(corrida);

  const comecarCorrida = async (
    idCorrida: string,
    callbackFunction: (data: Corrida) => void
  ) => {
    return await instanciaRepositorioCorrida.comecarCorrida(
      idCorrida,
      callbackFunction
    );
  };

  return { comecarCorrida, registrarCorrida };
}
