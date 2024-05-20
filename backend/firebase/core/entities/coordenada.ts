interface CoordenadaProps {
  latitude: number;
  longitude: number;
}

export class Coordenada {
  private _latitude: number;
  private _longitude: number;

  constructor(props: CoordenadaProps) {
    this._latitude = props.latitude;
    this._longitude = props.longitude;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }
}
