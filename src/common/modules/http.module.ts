import axios from 'axios';
import { Module } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosService } from '../services/http.service';

@Module({
  providers: [
    {
      provide: HttpService,
      useFactory: async () => {
        return new HttpService(
          axios.create({
            timeout: 5000,
            headers: {},
          }),
        );
      },
    },
    AxiosService,
  ],
  exports: [AxiosService],
})
export class HttpAxiosModule {}
