class UniquenessError extends Error {
  statusCode = 409;

  constructor(message: any) {
    super(message);
    this.statusCode = 409;
  }
}

export default UniquenessError;
