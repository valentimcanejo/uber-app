import React, { createContext, useState, ReactNode } from "react";
import { Corrida } from "../../backend/firebase/core/entities/corrida";

interface CorridaContextType {
  dadosCorrida: Corrida | null;
  setDadosCorrida: (dadosCorrida: Corrida | null) => void;
}

export const CorridaContext = createContext<CorridaContextType>({
  dadosCorrida: null,
  setDadosCorrida: () => {},
});

interface CorridaProviderProps {
  children: ReactNode;
}

const CorridaProvider = ({ children }: CorridaProviderProps) => {
  const [dadosCorrida, setDadosCorrida] = useState<Corrida | null>(null);

  return (
    <CorridaContext.Provider value={{ dadosCorrida, setDadosCorrida }}>
      {children}
    </CorridaContext.Provider>
  );
};

export default CorridaProvider;
