import { Controller, Delete, Get, Headers, HttpException, HttpStatus, Inject, Param, Patch, Post, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { firstValueFrom } from 'rxjs';
import { ImageDTO } from './dto/file.dto';

@Controller('upload-image')
export class ImagesController {

    constructor(@Inject("UPLOAD-MC") private readonly ImageService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }


    @Get("loadImageByUserId/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const ProData = await this.ImageService.send('loadImageByUserId', IdUser);
            return ProData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Patch('updateImageByUserId/:IdUser')
    @UseInterceptors(
        FileInterceptor('image', {
            limits: {
                fileSize: 1024 * 1024 * 10, // 10MB
            },
        }),
    )
    async updateByUserId(
        @Param('IdUser') IdUser: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const newData = file.buffer.toString('base64');
            const updatedData = await this.ImageService.send('updateImageByUserId', { IdUser, base64EncodedImage: newData });


            return updatedData;
        } catch (error) {
            console.log(error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }





    @Post('createImage')
    @UseInterceptors(
        FileInterceptor('image', {
            limits: {
                fileSize: 1024 * 1024 * 10, // 10MB
            },
        }),
    )
    async add(@UploadedFile() file: Express.Multer.File, @Headers() headers: any) {
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

        const newImage = {
            IdUser: userId,
            data: file.buffer.toString('base64'),
        };

        const newImageData = await this.ImageService.send('uploadImage', newImage).toPromise();
        return newImageData;
    }


    @Delete('deleteImageByUserId/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        await firstValueFrom(this.ImageService.send('deleteImageByUserId', IdUser));
    }

}
