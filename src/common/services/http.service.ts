import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);
  constructor(private readonly httpService: HttpService) {}
  /**
   * Makes a GET request to the specified URL and returns the response data.
   *
   * @param url - The URL to make the request to.
   * @param config - Optional configuration object containing headers.
   * @returns The response data, or null if the response is empty.
   * @throws Throws an error if the request fails.
   *
   * @example
   * ```typescript
   * const data = await axiosService.get<MyData>('https://api.example.com/data');
   * const dataWithAuth = await axiosService.get<MyData>('https://api.example.com/data', { headers: { authorization: 'Bearer y-token' } });
   * ```
   */
  async get<T>(
    url: string,
    config?: { headers?: Record<string, string> },
  ): Promise<T | null> {
    const headers = config?.headers ?? {};

    const { data } = await firstValueFrom(
      this.httpService.get<T>(url, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return !data ? null : (data as T);
  }
}
