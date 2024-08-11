import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class RefreshTokenService {
  readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
  readonly REFRESH_TOKEN_NAME = "refreshToken";

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: "localhost",
      expires: expiresIn,
      secure: true,
      sameSite: "none", // lax to production
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: "localhost",
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
  }
}