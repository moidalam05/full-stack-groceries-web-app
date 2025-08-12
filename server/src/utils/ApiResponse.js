export class ApiResponse {
  constructor(statusCode, data = null, message = "Success", errors = []) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }
}
