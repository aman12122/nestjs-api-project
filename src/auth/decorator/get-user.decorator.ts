import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // If data is provided, return specific property from user
    if (data) {
      return request.user[data];
    }
    
    // Otherwise return the entire user object
    return request.user; 
  }
)