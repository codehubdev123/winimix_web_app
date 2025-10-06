class ValidationUtils {
  public validateId(id: any) {
    if (!id || typeof id !== "string") {
      return false;
      // return NextResponse.json(
      //   {
      //     success: false,
      //     message: "Invalid category ID",
      //     errors: ["Category ID is required and must be a string"],
      //   },
      //   { status: 400 },
      // );
    }
    return true;
  }
}
const validationUtils = new ValidationUtils();
export default validationUtils;
