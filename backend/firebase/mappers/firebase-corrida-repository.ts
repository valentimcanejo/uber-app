import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { Corrida, CorridaProps } from "../core/entities/corrida";

export class FirebaseCorridaMapper {
  static toDomain(corrida: DocumentData): Corrida {
    return new Corrida({
      id: corrida.id,
      codCorrida: corrida.codCorrida,
      tempo: corrida.tempo,
      localizacaoInicial: corrida.localizacaoInicial,
      localizacaoFinal: corrida.localizacaoFinal,
      status: corrida.status,
      coordenadas: corrida.coordenadas,
      ativo: corrida.ativo,
      criadoEm: corrida.criadoEm,
      alteradoEm: corrida.alteradoEm,
    });
  }

  static toFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): DocumentData {
    const data = snapshot.data(options);

    return new Corrida({
      codCorrida: data.codCorrida,
      tempo: data.tempo,
      localizacaoInicial: data.localizacaoInicial,
      localizacaoFinal: data.localizacaoFinal,
      status: data.status,
      coordenadas: data.coordenadas,
      ativo: data.ativo,
      criadoEm: data.criadoEm,
      alteradoEm: data.alteradoEm,
    });
  }
}
