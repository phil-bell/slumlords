import "google-maps-limited/google-maps-limited";

export class SlumMap extends customElements.get("google-maps-limited") {
  constructor() {
    super();
    this.apiKey = ""
  }

  static get properties() {
    return {
      apiKey: {
        type: String,
        attribute: "api-key"
      }
    }
  }

}

customElements.define("slum-map", SlumMap);
