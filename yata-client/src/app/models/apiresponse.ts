export type ApiResponse<T> = {
  data?: T;
  error?: string;
  statusCode: HttpStatusCode;
}

export type HttpStatusCode = 200 | 201 | 404 | 500

