import { LitElement, html } from "lit-element";
import Cookies from "js-cookie";

export class DjangoForm extends LitElement {
  static get properties() {
    return {
      method: {
        type: String,
        attribute: "method",
      },
      action: {
        type: String,
        attribute: "action",
      },
      button: {
        type: String,
        attribute: "button",
      },
    };
  }

  constructor() {
    super();
    this.button = "Add";
    this.method = "post";
  }

  get form() {
    this.inputs = this.querySelectorAll("input, textarea, select")
    const formData = new FormData();
    [...this.inputs].map(input => {
      console.log(input)
      console.log(input.name)
      console.log(input.value)
      return formData.append(input.name, input.value)
    })
    console.log(formData)
    console.log(formData.values())
    return formData
  }

  async handleSubmit(event) {
    event.preventDefault();
    await fetch(this.action, {
      method: this.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(this.form),
    });
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <slot id="form"></slot>
        <button type="submit">${this.button}</button>
      </form>
    `;
  }
}

customElements.define("django-form", DjangoForm);
