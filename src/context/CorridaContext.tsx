import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Corrida } from "../../backend/firebase/core/entities/corrida";
import {
  GoogleAddressProps,
  PolylineProps,
  RespostaDadosMatrixProps,
} from "../types/GoogleTypes";
import useGoogleAPI from "../hooks/useGoogleAPI";
import useMatrixAPI from "../hooks/useMatrixAPI";
import { useUserLocation } from "../hooks/useUserLocation";

interface CorridaContextType {
  dadosCorrida: Corrida | null;
  setDadosCorrida: (dadosCorrida: Corrida | null) => void;
  dadosMatrix: RespostaDadosMatrixProps | null;
  setDadosMatrix: (dadosMatrix: RespostaDadosMatrixProps | null) => void;
  enderecoDestino: GoogleAddressProps | null;
  setEnderecoDestino: (enderecoDestino: GoogleAddressProps | null) => void;
  desenhoCaminho: PolylineProps[] | null;
  setDesenhoCaminho: (desenhoCaminho: PolylineProps[] | null) => void;
  salvarDadosCorrida: () => void;
  limparDadosCorrida: () => void;
}

export const CorridaContext = createContext<CorridaContextType>({
  dadosCorrida: null,
  setDadosCorrida: () => {},
  dadosMatrix: null,
  setDadosMatrix: () => {},
  enderecoDestino: null,
  setEnderecoDestino: () => {},
  desenhoCaminho: null,
  setDesenhoCaminho: () => {},
  salvarDadosCorrida: () => {},
  limparDadosCorrida: () => {},
});

interface CorridaProviderProps {
  children: ReactNode;
}

const CorridaProvider = ({ children }: CorridaProviderProps) => {
  const [dadosCorrida, setDadosCorrida] = useState<Corrida | null>(null);
  const [dadosMatrix, setDadosMatrix] =
    useState<RespostaDadosMatrixProps | null>(null);
  const [enderecoDestino, setEnderecoDestino] =
    useState<GoogleAddressProps | null>(null);
  const [desenhoCaminho, setDesenhoCaminho] = useState<PolylineProps[] | null>(
    null
  );

  const {
    currentAddress,
    currentCoords,
    isLoadingLocation,
    locationForegroundPermission,
  } = useUserLocation();

  const { getMatrixDistance } = useMatrixAPI();
  const { getCaminhoCompleto } = useGoogleAPI();

  const salvarDadosCorrida = async () => {
    try {
      console.log(currentAddress);
      console.log(enderecoDestino);
      if (!enderecoDestino?.address || !currentAddress) return;
      const distancia = await getMatrixDistance(
        currentAddress,
        enderecoDestino?.address
      );

      const caminho = await getCaminhoCompleto(
        currentAddress,
        enderecoDestino?.address
      );

      setDadosMatrix(distancia);
      setDesenhoCaminho(caminho);
    } catch (error) {
      console.log(error);
    }
  };

  const limparDadosCorrida = () => {
    setDadosCorrida(null);
    setDadosMatrix(null);
    setEnderecoDestino(null);
    setDesenhoCaminho(null);
  };

  return (
    <CorridaContext.Provider
      value={{
        dadosCorrida,
        setDadosCorrida,
        dadosMatrix,
        setDadosMatrix,
        enderecoDestino,
        setEnderecoDestino,
        desenhoCaminho,
        setDesenhoCaminho,
        salvarDadosCorrida,
        limparDadosCorrida,
      }}
    >
      {children}
    </CorridaContext.Provider>
  );
};

export default CorridaProvider;
