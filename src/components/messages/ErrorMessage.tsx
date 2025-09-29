interface Props {
  errors: any;
  id: string;
  isNestable?: boolean;
}

const ErrorMessage = ({ errors, id, isNestable = false }: Props) => {
  // Safe way to get error message
  const getErrorMessage = () => {
    if (!errors) return null;

    try {
      if (isNestable) {
        // Handle nested errors like "name.en", "slug.ar"
        const [parent, child] = id.split(".");
        // Check if parent exists and has the child property
        if (errors[parent] && typeof errors[parent] === "object") {
          const childError = errors[parent][child];
          if (childError && childError.message) {
            return childError.message;
          }
        }
      } else {
        // Handle flat errors
        const error = errors[id];
        if (error && error.message) {
          return error.message;
        }
      }
    } catch (error) {
      console.warn("Error accessing error message:", error);
      return null;
    }

    return null;
  };

  const errorMessage = getErrorMessage();

  if (!errorMessage) return null;

  return (
    <small className="text-red-600 text-sm block mt-1">{errorMessage}</small>
  );
};

export default ErrorMessage;
