import { Controller, Inject, Post, UnauthorizedException, Headers, UploadedFile, UseInterceptors, Param, HttpStatus, HttpException, Patch, Get, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';

@Controller('upload-files')
export class FilesController {

    constructor(@Inject("UPLOAD-MC") private readonly fileService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }




    @Post('createFile')
    @UseInterceptors(
        FileInterceptor('file', {
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
        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid authorization token');
        }
        const userId = decodedToken.id;

        const newFile = {
            IdUser: userId,
            data: file.buffer.toString('base64'),
            name: file.originalname,
            contentType: file.mimetype,
        };
        console.log(newFile)

        const newImageData = await firstValueFrom(this.fileService.send('uploadFile', newFile));
        return newImageData;
    }



    @Patch('updateFileByUserId/:IdUser')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: {
                fileSize: 1024 * 1024 * 10, // 10MB
            },
        }),
    )
    async updateFileByUserId(
        @Param('IdUser') IdUser: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const newData = file.buffer.toString('base64');
            const updatedData = await firstValueFrom(this.fileService.send('updateFileByUserId', {
                IdUser,
                base64EncodedImage: newData,
                name: file.originalname,
                contentType: file.mimetype,
            }));
            return updatedData;
        } catch (error) {
            console.log(error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Get('getFileByUserId/:IdUser')
    async getFileByUserId(@Param('IdUser') IdUser: string) {
        try {
            const imageData = await this.fileService.send('getFileByUserId', { userId: IdUser }).toPromise();
            return imageData;
        } catch (error) {
            console.log(error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }


    @Delete('deleteFileByUserId/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        await firstValueFrom(this.fileService.send('deleteFileByUserId', IdUser));
    }


}
