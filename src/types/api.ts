export interface ApiError {
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
      error?: string;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
  code?: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}
