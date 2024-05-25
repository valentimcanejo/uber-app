import { PolylineProps } from "../types/GoogleTypes";

export default function useGoogleAPI() {
  const decodePolyline = (polyline: string) => {
    const points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < polyline.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const getRota = (rotas: any) => {
    return rotas.overview_polyline.points;
  };

  const getCaminhoCompleto = async (
    distanciaInicial: string,
    distanciaFinal: string
  ): Promise<PolylineProps[] | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${distanciaInicial}&destination=${distanciaFinal}&key=AIzaSyB4A1Mk4PLS_lvASCirHYQVEpvWRCd9sPo&mode=driving`
      );

      if (!response.ok) return null;

      const res = await response.json();

      const objetoRotas = decodePolyline(getRota(res.routes[0]));

      return objetoRotas;
    } catch (error) {
      return null;
    }
  };

  return { getCaminhoCompleto };
}
