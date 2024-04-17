import { Controller, Get, Res } from '@nestjs/common';
import { resolve } from 'path';
import { Public } from './utils/public-decorator';
@Controller()
export class AppController {
  @Get()
  @Public()
  sendApplication(@Res() res) {
    res.sendFile(resolve('client/index.html'));
  }
}
