import { LitElement, html, css } from "lit-element";
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
      successMessage: {
        type: String,
        attribute: "success-message",
      },
    };
  }

  constructor() {
    super();
    this.button = "Add";
    this.method = "post";
    this.successMessage = "saved";
    this.success = false;
  }

  get form() {
    this.inputs = this.querySelectorAll("input, textarea, select");
    let form = new FormData();
    [...this.inputs].forEach((input) => {
      form.append(input.name, input.value);
    });
    return form;
  }

  errorMessage(message) {
    const error = document.createElement("p");
    error.innerText = message;
    error.classList.add("django-form__field-error");
    return error;
  }

  clearErrors() {
    const errors = document.querySelectorAll(".django-form__field-error");
    if (errors) {
      errors.forEach((element) => element.remove());
    }
  }

  async renderErrors(errors) {
    Object.entries(errors).map(([field, error]) => {
      let input = document.querySelector(`#id_${field}`);
      if (input) {
        input.after(this.errorMessage(error));
        return;
      }
      this.shadowRoot
        .querySelector(".django-form__fallback-errors")
        .appendChild(this.errorMessage(error));
    });
  }

  async sendForm() {
    this.clearErrors();
    await fetch(this.action, {
      method: this.method,
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: this.form,
    })
      .then(async (response) => {
        if (!response.ok) {
          const res_errors = await response.json();
          this.renderErrors(res_errors);
          throw Error;
        }
        return response.json();
      })
      .then((data) => {
        this.success = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.sendForm();
  }

  render() {
    return html`
      <form class="django-form" @submit=${this.handleSubmit}>
        <slot></slot>
        <button class="django-form__submit-button" type="submit">
          ${this.button}
        </button>
        <p ?hidden="${!this.success}" class="django-form__success-message">
          ${this.successMessage}
        </p>
        <div class="django-form__fallback-errors"></div>
      </form>
    `;
  }
}

customElements.define("django-form", DjangoForm);
