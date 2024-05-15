import { Point } from "react-native-google-places-autocomplete";

interface Tempo {
  minutos: number;
  horas: number;
  segundos: number;
}

interface Distancia {
  metros: number;
  km: number;
}

export interface GoogleAddressProps extends Point {
  address: string;
}

export interface DadosMatrixProps {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export interface RespostaDadosMatrixProps {
  distancia: Distancia;
  tempo: Tempo;
}

export interface MatrixAPIError {
  error: string;
}

export interface PolylineProps {
  latitude: number;
  longitude: number;
}
