import { css,html } from "lit-element";
import "google-maps-limited/google-maps-limited";

export class SlumMap extends customElements.get("google-maps-limited") {

  constructor() {
    super();
    this.apiKey = "";
    this.shadowRoot.create;
  }

  static get properties() {
    return {
      apiKey: {
        type: String,
        attribute: "api-key",
      },
    };
  }

  render() {
    return html`
      <style>
        :host {
          display: block
        }
        #map {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      </style>
      <div id="map"></div>
    `;
  }
}

customElements.define("slum-map", SlumMap);
