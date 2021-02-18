import "google-maps-limited/google-maps-limited";
export class SlumMap extends customElements.get("google-maps-limited") {
  constructor() {
    super();
    this.apiKey = "AIzaSyBSLegpj5AfyRaVvFn5Kz-ycqMwtMEPMUk"
  }
}

customElements.define("slum-map", SlumMap);
