import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './decorators/role.decorator';
import { Roles } from './enums/roles.enum';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Role([Roles.ADMIN,Roles.SUPERADMIN])
  getHello(): string {
    return this.appService.getHello();
  }
}
