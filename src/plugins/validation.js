import { extend } from "vee-validate";
import {
  required,
  regex,
  email,
  min,
  max,
  alpha_dash,
  confirmed
} from "vee-validate/dist/rules";

// No message specified.
extend("email", {
  ...email,
  message: "The {_field_} field must be a valid email"
});

// Override the default message.
extend("required", {
  ...required,
  message: "{_field_} is required"
});

extend("regex", {
  ...regex,
  message: "The {_field_} field format is invalid"
});

extend("min", {
  ...min,
  message: "The {_field_} field must have at least {length} characters"
});

extend("max", {
  ...max,
  message: "The {_field_} field must have at least {length} characters"
});

extend("alpha_dash", {
  ...alpha_dash,
  message:
    "The {_field_} field may contain alphabetic characters, numbers, dashes or underscores"
});

extend("confirmed", {
  ...confirmed,
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Confirm Password does not match"
});
