declare namespace Request {
  interface requestResult {
    code: number;
    message: string;
    resultCode: number;
    result: any;
  }

  interface requestError {
    code: number;
    message: string;
    resultCode: number;
    error: any;
  }
}
