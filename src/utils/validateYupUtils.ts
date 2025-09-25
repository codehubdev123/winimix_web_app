// TODO: JUST RE USABLE HOOK FOR VALIDATION USING  YUP PACKAGE BEFADL ALLAH WA7DOO
import * as Yup from "yup";

type Props = {
  abortEarly: boolean;
  strict: boolean;
};

export const validateYup = async (
  schema: Yup.Schema,
  data: any,
  props: Props = { abortEarly: false, strict: false },
) => {
  var success = false;
  var validatedData: Yup.InferType<typeof schema>;
  var errors: Record<string, string[]> = {};
  var errorMessage: string = "";

  // Function to clear errors
  const clearErrors = () => {
    errors = {};
  };
  //  NOTE: VALIDATE THE SCHEMA
  try {
    const validate = await schema.validate(data, props);
    // NOTE: SET STATUSES AND DATA AFTER VALIDATITION SUCCESS
    success = true;
    validatedData = validate;
  } catch (err) {
    clearErrors();
    if (!(err instanceof Yup.ValidationError)) {
      throw new Error("Not a validation error");
    }

    err.inner.forEach((element) => {
      // Path is undefined when the error relates to the root object
      const path = element.path || "root";
      // compile errors for same field into one array
      errors[path]
        ? errors[path].push(element.message)
        : (errors[path] = [element.message]);
    });
    // NOTE: SET STATUSES AND DATA AFTER VALIDATITION ERROR
    success = false;
    validatedData = null;
  }

  return { success: success, validatedData, errorMessage, errors };
};
