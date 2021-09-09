import { LitElement, html } from 'lit-element';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
var js_cookie = createCommonjsModule(function (module, exports) {

  (function (factory) {
    var registeredInModuleLoader;

    {
      module.exports = factory();
      registeredInModuleLoader = true;
    }

    if (!registeredInModuleLoader) {
      var OldCookies = window.Cookies;
      var api = window.Cookies = factory();

      api.noConflict = function () {
        window.Cookies = OldCookies;
        return api;
      };
    }
  })(function () {
    function extend() {
      var i = 0;
      var result = {};

      for (; i < arguments.length; i++) {
        var attributes = arguments[i];

        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }

      return result;
    }

    function decode(s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    function init(converter) {
      function api() {}

      function set(key, value, attributes) {
        if (typeof document === 'undefined') {
          return;
        }

        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
        } // We're using "expires" because "max-age" is not supported by IE


        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
          var result = JSON.stringify(value);

          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var stringifiedAttributes = '';

        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue;
          } // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...


          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return document.cookie = key + '=' + value + stringifiedAttributes;
      }

      function get(key, json) {
        if (typeof document === 'undefined') {
          return;
        }

        var jar = {}; // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.

        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var i = 0;

        for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');

          if (!json && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }

          try {
            var name = decode(parts[0]);
            cookie = (converter.read || converter)(cookie, name) || decode(cookie);

            if (json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }

            jar[name] = cookie;

            if (key === name) {
              break;
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar;
      }

      api.set = set;

      api.get = function (key) {
        return get(key, false
        /* read as raw */
        );
      };

      api.getJSON = function (key) {
        return get(key, true
        /* read as json */
        );
      };

      api.remove = function (key, attributes) {
        set(key, '', extend(attributes, {
          expires: -1
        }));
      };

      api.defaults = {};
      api.withConverter = init;
      return api;
    }

    return init(function () {});
  });
});

var _templateObject;
class DjangoForm extends LitElement {
  static get properties() {
    return {
      method: {
        type: String,
        attribute: "method"
      },
      action: {
        type: String,
        attribute: "action"
      },
      button: {
        type: String,
        attribute: "button"
      },
      successMessage: {
        type: String,
        attribute: "success-message"
      },
      success: {
        type: Boolean
      }
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
    var form = new Object();
    [...this.inputs].forEach(input => form[input.name] = input.value);
    return JSON.stringify(form);
  }

  errorMessage(message) {
    var error = document.createElement("p");
    error.innerText = message;
    error.classList.add("django-form__field-error");
    return error;
  }

  clearErrors() {
    var errors = document.querySelectorAll('.django-form__field-error, [part="django-form__fallback-error"]');

    if (errors) {
      errors.forEach(element => element.remove());
    }
  }

  renderErrors(errors) {
    var _this = this;

    return _asyncToGenerator(function* () {
      Object.entries(errors).map((_ref) => {
        var [field, error] = _ref;
        var input = document.querySelector("#id_".concat(field));

        if (input) {
          input.after(_this.errorMessage(error));
          return;
        }

        _this.shadowRoot.querySelector('[part="django-form__fallback-error"]').appendChild(_this.errorMessage(error));
      });
    })();
  }

  sendForm() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.clearErrors();

      var res = yield fetch(_this2.action, {
        method: _this2.method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": js_cookie.get("csrftoken")
        },
        body: _this2.form
      }).then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (response) {
          if (response.status !== 200) {
            var res_errors = yield response.json();

            _this2.renderErrors(res_errors);

            return;
          }

          _this2.success = true;
        });

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      return res;
    })();
  }

  handleSubmit(event) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      event.preventDefault();

      _this3.sendForm();
    })();
  }

  render() {
    return html(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <form part=\"django-form\" @submit=", ">\n        <slot></slot>\n        <button part=\"django-form__submit-button\" type=\"submit\">\n          ", "\n        </button>\n        <p ?hidden=\"", "\" part=\"django-form__success-message\">\n          ", "\n        </p>\n        <div part=\"django-form__fallback-error\"></div>\n      </form>\n    "])), this.handleSubmit, this.button, !this.success, this.successMessage);
  }

}
customElements.define("django-form", DjangoForm);
//# sourceMappingURL=bundle.js.map
