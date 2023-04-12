import { Controller, Inject, Get, Headers, HttpException, HttpStatus, Post, Body, Param, Delete, Put, Request, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { ProfessionalDataDTO } from './dto/professionalData.dto';
import { firstValueFrom } from 'rxjs';

@Controller('professional-data')
export class ProfessionalDataController {
    constructor(@Inject("CV-SERVICE") private readonly professionalDataService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }

    @Get("getAllProfessionalData")
    async findAll() {
        try {
            const ProData = await this.professionalDataService.send<ProfessionalDataDTO, {}>("getAllProfessionalData", {});
            return ProData;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Get("getProfessionalDataByIdUser/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const ProData = await this.professionalDataService.send('getProfessionalDataByIdUser', IdUser);
            return ProData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async add(@Body() professionalDataDTO: ProfessionalDataDTO, @Headers() headers) {
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
        //     // Check if a professional data record already exists for the user
        //     const existingProData = await this.findbyuserId(userId)
        //     existingProData.subscribe(async data => {
        //         data
        //         console.log("prodata :",data);
        //     if (data===null) {
        //     } else {
        //         throw new HttpException('Professional data already exists for this user', HttpStatus.BAD_REQUEST);}})
        // Create a new professional data record for the user
        const newProfessionalData: ProfessionalDataDTO = {
            IdUser: userId,
            ...professionalDataDTO,
        };
        const newProData = await this.professionalDataService
            .send('createProfessionalData', newProfessionalData);
        return newProData;
    }

    @Get('getProfessionalDataById/:id')
    async getProfessionalDataById(@Param('id') id) {
        try {
            const OneProData = await this.professionalDataService.send("getProfessionalDataById", id);
            return OneProData
        }
        catch {

            throw new HttpException("Microservice PROFESSIONAL_DATA_SERVICE is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Delete('deleteProfessionalData/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        try {
            const deletedProData = await this.professionalDataService.send('deleteProfessionalData', IdUser);
            return deletedProData;
        } catch {
            throw new HttpException(
                'Microservice PROFESSIONAL_DATA_SERVICE is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Put('updateProfessionalDataByUserId/:IdUser')
    async updateByUserId(@Param('IdUser') IdUser, @Body() professionalDataDTO: ProfessionalDataDTO) {
        try {
            const updatedProData = await this.professionalDataService.send('updateProfessionalDataByUserId', { IdUser, professionalDataDTO });
            console.log(updatedProData)
            return updatedProData;
        } catch (error) {
            console.log(error);
            throw new HttpException('Microservice PROFESSIONAL_DATA_SERVICE is not available', HttpStatus.NOT_FOUND);
        }
    }
}
