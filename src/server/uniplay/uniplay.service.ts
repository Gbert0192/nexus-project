import { env } from "@/env";
import type {
  AuthTokenResponse,
  DirectTopUpResponse,
  SaldoResponse,
  VoucherResponse,
} from "@/schema/uniplay.schema";
import { TRPCError } from "@trpc/server";
import axios, { type AxiosResponse } from "axios";
import crypto from "crypto";

export class UniPlayService {
  private static client = axios.create({
    baseURL: "https://api-reseller.uniplay.id/v1", // Corrected base URL
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static _generateSignature() {
    const apiKey = env.UNIPLAY_API_KEY;

    if (!apiKey) {
      throw new Error("UNIPLAY_API_KEY is not configured");
    }

    const timestamp = new Date()
      .toLocaleString("sv-SE", {
        timeZone: "Asia/Jakarta",
        hour12: false,
      })
      .replace("T", " ")
      .substring(0, 19);

    const jsonObject = {
      api_key: apiKey,
      timestamp: timestamp,
    };

    const jsonString = JSON.stringify(jsonObject);
    const hmacKey = `${apiKey}|${jsonString}`;

    const uplSignature = crypto
      .createHmac("sha512", hmacKey)
      .update(jsonString)
      .digest("hex");

    return { signature: uplSignature, apiKey, timestamp };
  }

  private static fail(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 300:
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid API Key",
            cause: error,
          });
        case 400:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Signature",
            cause: error,
          });
        case 500:
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Signature Header Not Found",
            cause: error,
          });
        case 600:
          throw new TRPCError({
            code: "TIMEOUT",
            message: "Request Expired / Timestamp Timeout",
            cause: error,
          });
        case 401:
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Authentication failed",
            cause: error,
          });
        case 403:
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Access denied",
            cause: error,
          });
        case 404:
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "API endpoint not found",
            cause: error,
          });
        case 429:
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Rate limit exceeded",
            cause: error,
          });
        default:
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `UniPlay API Error: error`,
            cause: error,
          });
      }
    }

    // Handle non-axios errors
    if (error instanceof Error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        cause: error,
      });
    }

    // Handle unknown errors
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unknown error occurred",
      cause: error,
    });
  }

  /**
   * Get access token from UniPlay API
   * Handles token caching and automatic refresh
   */
  private static async _getAccessToken() {
    try {
      const { signature, apiKey, timestamp } = this._generateSignature();

      const response: AxiosResponse<AuthTokenResponse> = await this.client.post(
        "/access-token",
        {
          api_key: apiKey,
          timestamp: timestamp,
        },
        {
          headers: {
            "UPL-SIGNATURE": signature,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      this.fail(error);
    }
  }

  /**
   * Health check method to test API connectivity
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      await this._getAccessToken();
      return true;
    } catch (error) {
      console.error("UniPlay API health check failed:", error);
      return false;
    }
  }

  public static async getSaldo() {
    try {
      const { signature, apiKey, timestamp } = this._generateSignature();
      const accessToken = await this._getAccessToken();
      const response: AxiosResponse<SaldoResponse> = await this.client.post(
        "/inquiry-saldo",
        {
          api_key: apiKey,
          timestamp: timestamp,
        },
        {
          headers: {
            "UPL-SIGNATURE": signature,
            "UPL-ACCESS-TOKEN": accessToken,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      this.fail(error);
    }
  }

  public static async getDirectTopUp() {
    try {
      const { signature, apiKey, timestamp } = this._generateSignature();
      const accessToken = await this._getAccessToken();
      const response: AxiosResponse<DirectTopUpResponse> =
        await this.client.post(
          "/inquiry-dtu",
          {
            api_key: apiKey,
            timestamp: timestamp,
          },
          {
            headers: {
              "UPL-SIGNATURE": signature,
              "UPL-ACCESS-TOKEN": accessToken,
              "Content-Type": "application/json",
            },
          },
        );

      return response.data;
    } catch (error) {
      this.fail(error);
    }
  }

  public static async getVoucher() {
    try {
      const { signature, apiKey, timestamp } = this._generateSignature();
      const accessToken = await this._getAccessToken();
      const response: AxiosResponse<VoucherResponse> = await this.client.post(
        "/inquiry-voucher",
        {
          api_key: apiKey,
          timestamp: timestamp,
        },
        {
          headers: {
            "UPL-SIGNATURE": signature,
            "UPL-ACCESS-TOKEN": accessToken,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      this.fail(error);
    }
  }
}
