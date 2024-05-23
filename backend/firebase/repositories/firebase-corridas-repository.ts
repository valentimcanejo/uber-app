import {
  SnapshotOptions,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { Corrida } from "../core/entities/corrida";
import { db } from "../initFirebase";
import { FirebaseCorridaMapper } from "../mappers/firebase-corrida-mapper";
import { DocumentNotFoundError } from "./errors/document-not-found-error";
import CorridaRepository from "../../domain/application/repositories/corrida-repository";
import { Coordenada } from "../core/entities/coordenada";

export class FirebaseCorridaRepository implements CorridaRepository {
  private conversor = {
    toFirestore(corrida: Corrida): DocumentData {
      return {
        codCorrida: corrida.codCorrida,
        tempo: corrida.tempo,
        localizacaoInicial: corrida.localizacaoInicial,
        localizacaoFinal: corrida.localizacaoFinal,
        status: corrida.status,
        coordenadas: corrida.coordenadas.map((coordenada) => ({
          latitude: coordenada.latitude,
          longitude: coordenada.longitude,
        })),
        ativo: corrida.ativo,
        criadoEm: corrida.criadoEm,
        alteradoEm: corrida.alteradoEm,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Corrida {
      const data = snapshot.data(options);

      return Corrida.criar({
        id: snapshot.id,
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
    },
  };

  async existeCorridaAtiva(): Promise<string | null> {
    try {
      const corridasCollection = query(
        collection(db, "corridas"),
        where("status", "==", "Iniciada")
      ).withConverter(this.conversor);

      const corridasSnapshot = await getDocs(corridasCollection);

      return corridasSnapshot?.docs[0]?.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async atualizarCoordenadas(
    idCorrida: string,
    coordenada: Coordenada
  ): Promise<void> {
    try {
      const corridaDoc = doc(db, "corridas", idCorrida).withConverter(
        this.conversor
      );

      if (!corridaDoc) throw new DocumentNotFoundError("corridas");

      await updateDoc(corridaDoc, {
        coordenadas: arrayUnion({
          latitude: coordenada.latitude,
          longitude: coordenada.longitude,
        }),
      });

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async comecarCorrida(
    idCorrida: string,
    callbackFunction: (data: Corrida) => void
  ): Promise<void> {
    try {
      const corridaDoc = doc(db, "corridas", idCorrida).withConverter(
        this.conversor
      );

      if (!corridaDoc) throw new DocumentNotFoundError("corridas");

      onSnapshot(corridaDoc, (doc) => {
        const data = doc.data();

        const objetoConvertido = FirebaseCorridaMapper.toDomain(data!);

        callbackFunction(objetoConvertido);
      });

      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async finalizarCorrida(idCorrida: string): Promise<void> {
    try {
      const corridaDoc = doc(db, "corridas", idCorrida).withConverter(
        this.conversor
      );

      if (!corridaDoc) throw new DocumentNotFoundError("corridas");

      await updateDoc(corridaDoc, {
        status: "Finalizada",
      });

      return;
    } catch (error) {
      console.log(error);
    }
  }

  async create(corrida: Corrida): Promise<Corrida | null> {
    try {
      const corridaCollection = collection(db, "corridas").withConverter(
        this.conversor
      );

      const createdCorridaDoc = (
        await addDoc(corridaCollection, corrida)
      ).withConverter(this.conversor);

      if (!createdCorridaDoc.id) throw new DocumentNotFoundError("corridas");

      const snapshot = await getDoc(createdCorridaDoc);
      const data = snapshot.data();

      if (!data) throw new DocumentNotFoundError("corridas");

      const createdCorrida = new Corrida({
        id: snapshot.id,
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

      return createdCorrida;
    } catch (error) {
      console.log(error);

      throw new Error("Failed to save corrida.");
    }
  }

  async findById(id: string): Promise<Corrida | null> {
    try {
      const corridaDoc = await getDoc(
        doc(db, "corridas", id).withConverter(this.conversor)
      );

      if (!corridaDoc.exists()) throw new DocumentNotFoundError("corridas");

      const corrida = corridaDoc.data();

      return FirebaseCorridaMapper.toDomain(corrida);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findAll(
    callbackFunction: (data: Corrida[] | []) => void
  ): Promise<void> {
    try {
      onSnapshot(
        collection(db, "corridas").withConverter(this.conversor),
        (snapshot) => {
          callbackFunction(
            snapshot.docs.map((doc) =>
              FirebaseCorridaMapper.toDomain(doc.data())
            )
          );
        }
      );
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findByCodCorrida(codCorrida: string): Promise<Corrida | null> {
    try {
      const corridaDoc = await getDoc(
        doc(db, "corridas").withConverter(this.conversor)
      );

      if (!corridaDoc.exists()) throw new DocumentNotFoundError("corridas");

      const corrida = corridaDoc.data();

      return FirebaseCorridaMapper.toDomain(corrida);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
