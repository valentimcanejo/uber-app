import {
  DadosMatrixProps,
  RespostaDadosMatrixProps,
} from "../types/GoogleTypes";

export default function useMatrixAPI() {
  const getDistancia = (dadosMatrix: DadosMatrixProps) => {
    return {
      metros: dadosMatrix.distance.value,
      km: dadosMatrix.distance.value / 1000,
    };
  };

  const getTempo = (dadosMatrix: DadosMatrixProps) => {
    return {
      minutos: dadosMatrix.duration.value / 60,
      horas: dadosMatrix.duration.value / 3600,
      segundos: dadosMatrix.duration.value,
    };
  };

  const getMatrixDistance = async (
    distanciaInicial: string,
    distanciaFinal: string
  ): Promise<RespostaDadosMatrixProps | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${distanciaInicial}&origins=${distanciaFinal}&key=AIzaSyB4A1Mk4PLS_lvASCirHYQVEpvWRCd9sPo`
      );

      if (!response.ok) return null;

      const res = await response.json();

      return {
        distancia: getDistancia(res.rows[0].elements[0]),
        tempo: getTempo(res.rows[0].elements[0]),
      };
    } catch (error) {
      return null;
    }
  };

  return { getMatrixDistance };
}
