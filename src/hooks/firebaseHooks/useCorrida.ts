import { Corrida } from "../../../backend/firebase/core/entities/corrida";
import { FirebaseCorridaRepository } from "../../../backend/firebase/repositories/firebase-corridas-repository";

export default function useCorrida() {
  const instanciaRepositorioCorrida = new FirebaseCorridaRepository();

  async function comecarCorrida(
    idCorrida: string,
    callbackFunction: (data: Corrida) => void
  ): Promise<void> {
    return await instanciaRepositorioCorrida.comecarCorrida(
      idCorrida,
      callbackFunction
    );
  }

  return { comecarCorrida };
}
