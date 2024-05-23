import React, { createContext, useState, ReactNode } from "react";
import { Corrida } from "../../backend/firebase/core/entities/corrida";
import {
  GoogleAddressProps,
  PolylineProps,
  RespostaDadosMatrixProps,
} from "../types/GoogleTypes";

interface CorridaContextType {
  dadosCorrida: Corrida | null;
  setDadosCorrida: (dadosCorrida: Corrida | null) => void;
  dadosMatrix: RespostaDadosMatrixProps | null;
  setDadosMatrix: (dadosMatrix: RespostaDadosMatrixProps | null) => void;
  enderecoDestino: GoogleAddressProps | null;
  setEnderecoDestino: (enderecoDestino: GoogleAddressProps | null) => void;
  desenhoCaminho: PolylineProps[] | null;
  setDesenhoCaminho: (desenhoCaminho: PolylineProps[] | null) => void;
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
      }}
    >
      {children}
    </CorridaContext.Provider>
  );
};

export default CorridaProvider;
