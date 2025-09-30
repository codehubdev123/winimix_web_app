import { PropsError } from "@/types/props-error";
import { PropsRedirect } from "@/types/props-redirect";
import { PropsSuccess } from "@/types/props-success";
import { NextRequest, NextResponse } from "next/server";

export abstract class BaseController {
  public abstract execute(req: NextRequest): any;

  public async executeImpl(req: NextRequest): Promise<void> {
    try {
      await this.execute(req);
    } catch (error) {
      console.log(error);
    }
  }

  protected error({
    success = false,
    message = "Some errors occurred",
    errors = [],
    fieldErrors = [],
    status = 422,
  }: PropsError) {
    return NextResponse.json({
      success: success,
      status: status,
      message,
      errors,
      fieldErrors,
    });
  }

  // protected error({
  //   success = false,
  //   message = "Some errors occurred",
  //   errors = [],
  //   status = 422,
  // }: PropsError) {
  //   return NextResponse.json({
  //     success: success,
  //     status: status,
  //     message,
  //     errors,
  //   });
  // }

  protected success({
    success = true,
    status = 200,
    message = "Data has been saved",
    data = [],
    ...rest
  }: PropsSuccess) {
    return NextResponse.json({
      success: success,
      status: status,
      message: message,
      data: data,
      ...rest,
    });
  }

  protected redirect({
    success = true,
    message = "Redirect",
    data = [],
    status = 407,
  }: PropsRedirect) {
    return NextResponse.json({
      success: success,
      status: status,
      message: message,
      data: data,
    });
  }
}
