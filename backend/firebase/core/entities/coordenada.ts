export class Coordenada {
  constructor(private _latitude: number, private _longitude: number) {}

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }
}
