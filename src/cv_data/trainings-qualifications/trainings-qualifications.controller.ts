import { Body, Controller, Delete, Get, HttpException, Headers, HttpStatus, Inject, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { TrainingsQualificationsDTO } from './dto/trainings-qualications.dto';

@Controller('trainings-qualifications')
export class TrainingsQualificationsController {
    constructor(@Inject("CV-SERVICE") private readonly trainingsQualificationsService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }

    @Get("getAllTrainingsQualificationsData")
    async findAll() {
        try {
            const ProData = await this.trainingsQualificationsService.send<TrainingsQualificationsDTO, {}>("getAllTrainingsQualificationsData", {});
            return ProData;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Get("getTrainingsQualificationsByIUser/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const trainQualData = await this.trainingsQualificationsService.send('getTrainingsQualificationsByIUser', IdUser);
            return trainQualData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Post('createTrainingQualifcationsData')
    async add(@Body() trainingsQualificationsDTO: TrainingsQualificationsDTO, @Headers() headers) {
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
        const newTrainingsQualificationsDTO: TrainingsQualificationsDTO = {
            IdUser: userId,
            ...trainingsQualificationsDTO,
        };
        const newdata = await this.trainingsQualificationsService.send('createTrainingQualifcationsData', newTrainingsQualificationsDTO);
        return newdata;
    }

    @Delete('deleteTrainingQualifcationsDataById/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        try {
            const deletedltrainQualData = await this.trainingsQualificationsService.send('deleteTrainingQualifcationsDataById', IdUser);
            return deletedltrainQualData;
        } catch {
            throw new HttpException(
                'Microservice  is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Put('updateTrainingQualifcationsDataByIUser/:IdUser')
    async update(@Param('IdUser') IdUser: string, @Body() dataDto: TrainingsQualificationsDTO): Promise<TrainingsQualificationsDTO> {

        try {
            const data = await firstValueFrom(this.trainingsQualificationsService.send<TrainingsQualificationsDTO, { IdUser: string, dataDto: TrainingsQualificationsDTO }>('updateTrainingQualifcationsDataByIUser', { IdUser, dataDto }));
            return data;
        } catch (error) {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }
}

