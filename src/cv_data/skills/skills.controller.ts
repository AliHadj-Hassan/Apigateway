import { Controller, Inject, Get, HttpException, Headers, HttpStatus, Post, Body, Param, Delete, Put, Request, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import { SkillDto } from './dto/skills.dto';

@Controller('skills')
export class SkillsController {
    constructor(@Inject("CV-SERVICE") private readonly ServicesDataService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }

    @Get('getAllSkillsData')
    async findAll() {
        try {
            const Data = await this.ServicesDataService.send<SkillDto, {}>('getAllSkillsData', {});
            console.log("Skill here ?")
            return Data;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Post("create")
    async CreateASkill(@Body() Dto: SkillDto, @Headers() headers): Promise<SkillDto> {
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
        try{
                const newskill: SkillDto = {
                    IdUser: userId,
                    ...Dto,
                };
                // Send the new skill to the microservice and wait for the response
                const createdSkill$ = this.ServicesDataService.send("CreateSkillData", newskill);
                const createdSkill = await firstValueFrom(createdSkill$);
                // Return the created skill
                console.log("ur data is " + createdSkill)
                return createdSkill; 
            } catch (error) {
                if (error instanceof HttpException) {
                    throw error;
                  }
                  throw new InternalServerErrorException('Something went wrong ! ');            
        }
    }

    @Put('update')
    async update( @Body() dataDto: SkillDto , @Body() id: string,): Promise<SkillDto> {
        console.log(" data equals to "+ dataDto.competence)
        try {
            const data = await this.ServicesDataService.send<SkillDto, { id: string, dataDto: SkillDto }>('updateSkill', { id, dataDto }).toPromise();
            return data;
        } catch (error) {
            throw new HttpException('Microservice is not available pliz check ur servers ', HttpStatus.NOT_FOUND);
        }
    }

    @Get('get/:id')
    async getById(@Param('id') id) {
        try {
            const data = await this.ServicesDataService.send("findoneSkillById", id);
            console.log(" getway get by id " + id);
            // not knowing the id fix it here
            return data
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }

    }




}
