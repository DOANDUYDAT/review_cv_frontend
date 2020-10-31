import { extend } from "vee-validate";
import { required, email, min, max, alpha_dash } from "vee-validate/dist/rules";

// No message specified.
extend("email", email);

// Override the default message.
extend("required", {
  ...required,
  message: "This field is required"
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
