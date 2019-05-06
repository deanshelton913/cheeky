type ErrorCode = 'BAD_REQUEST' | 'NOT_FOUND' | 'MISCONFIGURATION'

export class FailureByDesign extends Error {
  code: ErrorCode;
  message: string;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}