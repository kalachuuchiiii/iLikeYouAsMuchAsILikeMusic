export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation Error") {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422, "UNPROCESSABLE_ENTITY");
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too Many Requests") {
    super(message, 429, "TOO_MANY_REQUESTS");
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}

export class BadGatewayError extends AppError {
  constructor(message = "Bad Gateway") {
    super(message, 502, "BAD_GATEWAY");
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable") {
    super(message, 503, "SERVICE_UNAVAILABLE");
  }
}

export class GatewayTimeoutError extends AppError {
  constructor(message = "Gateway Timeout") {
    super(message, 504, "GATEWAY_TIMEOUT");
  }
}
