export interface FetchError {
  message: string;
  data: {
    message: string;
    description: string;
    statusCode: number;
    url: string;
  };
}
