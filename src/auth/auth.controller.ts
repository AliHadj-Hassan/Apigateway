import { Body, Controller, Get, HttpException, HttpStatus, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { IResponseUser } from './interfaces/responseuser.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) { }


  @Get('verifytoken')
  async Verify(@Payload() token: string) {
    const res = await this.authServiceClient.send('verifytoken', token);
    return res;
  }




  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    //const user = await this.userService.login(loginDTO);
    let resLogin: IResponseUser = await firstValueFrom(this.authServiceClient.send<IResponseUser>('login', loginDTO));
    if (resLogin.res == null) {
      throw new HttpException(
        {
          message: resLogin.message,
          data: null,
          errors: resLogin.errors,
        },
        resLogin.status,
      );
    }
    return resLogin
  }


  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      const resRegister: IResponseUser = await firstValueFrom(this.authServiceClient.send<IResponseUser>('register', registerDTO));
      if (resRegister.res == null) {
        throw new HttpException(
          {
            message: resRegister.message,
            data: null,
            errors: resRegister.errors,
          },
          resRegister.status,
        );
      }
      return resRegister;
    } catch (err) {
      throw new HttpException(
        {
          message: 'Error occurred while registering user.',
          data: null,
          errors: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
