import { Body, Controller, Get, HttpException, HttpStatus, Inject, Headers, InternalServerErrorException, Post, UnauthorizedException, Put, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PersonalDataDto } from './dto/personalData.dto';

@Controller('personal-data')
export class PersonalDataController {
    constructor(@Inject("CV-SERVICE") private readonly ServicesDataService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }
    
    @Get('getAllPersonalData')
    async findAll() {
        try {
            const Data = await this.ServicesDataService.send<PersonalDataDto, {}>('getAllPersonalData', {});
            console.log("personal here ?")
            return Data;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Post("create")
    async CreateASkill(@Body() Dto: PersonalDataDto, @Headers() headers): Promise<PersonalDataDto> {
        // Extract the JWT token from the request headers
        const token = headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Missing authorization token');
        }
        // Verify the JWT token and extract the user ID
        const decodedToken = await firstValueFrom(this.authServiceClient.send('verifytoken', token));
        console.log(decodedToken)
        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid authorization token');
        }
        const userId = decodedToken.id;
        console.log("User ID: " + userId);
        try {
            const newpersonaldata: PersonalDataDto = {
                IdUser: userId,
                ...Dto,
            };
            // Send the new skill to the microservice and wait for the response
            const createdPersonalData$ = this.ServicesDataService.send("createPersonalData", newpersonaldata);
            const createdPersonalData = await firstValueFrom(createdPersonalData$);
            // Return the created skill
            console.log("ur data is " + createdPersonalData)
            return createdPersonalData;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Something went wrong ! ');
        }
    }
    @Put('update')
    async update( @Body() dataDto: PersonalDataDto , @Body() id: string,): Promise<PersonalDataDto> {
        console.log(" data equals to "+ dataDto.IdUser)
        try {
            const data = await this.ServicesDataService.send<PersonalDataDto, { id: string, dataDto: PersonalDataDto }>('updatePersonalData', { id, dataDto }).toPromise();
            return data;
        } catch (error) {
            throw new HttpException('Microservice is not available pliz check ur servers ', HttpStatus.NOT_FOUND);
        }
    }

    @Get('get/:id')
    async getById(@Param('id') UserId) {
        try {
            const data = await this.ServicesDataService.send("getPersonalDataById", UserId);
           // console.log(" getway get by id " + id);
           
            return data
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }

    }

}
