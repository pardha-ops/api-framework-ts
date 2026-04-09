import { APIRequestContext, APIResponse } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
}

export class HttpClient {
  private context: APIRequestContext;
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private authToken: string | null = null;

  constructor(context: APIRequestContext) {
    this.context = context;
    this.baseURL =
      process.env.BASE_URL || "https://restful-booker.herokuapp.com";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  // inject auth token into all subsequent requests
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = null;
  }

  private buildHeaders(
    extraHeaders?: Record<string, string>,
  ): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...extraHeaders };
    if (this.authToken) {
      headers["Cookie"] = `token=${this.authToken}`;
    }
    return headers;
  }

  async get(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return await this.context.get(`${this.baseURL}${path}`, {
      headers: this.buildHeaders(options.headers),
      params: options.params,
      timeout: options.timeout || Number(process.env.DEFAULT_TIMEOUT) || 30000,
    });
  }

  async post(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return await this.context.post(`${this.baseURL}${path}`, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout || Number(process.env.DEFAULT_TIMEOUT) || 30000,
    });
  }

  async put(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return await this.context.put(`${this.baseURL}${path}`, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout || Number(process.env.DEFAULT_TIMEOUT) || 30000,
    });
  }

  async patch(
    path: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    return await this.context.patch(`${this.baseURL}${path}`, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout || Number(process.env.DEFAULT_TIMEOUT) || 30000,
    });
  }

  async delete(
    path: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    return await this.context.delete(`${this.baseURL}${path}`, {
      headers: this.buildHeaders(options.headers),
      timeout: options.timeout || Number(process.env.DEFAULT_TIMEOUT) || 30000,
    });
  }
}
