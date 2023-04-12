import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TagsDto } from './dto/tags.dto';
 
@Controller('tags')
export class TagsController {
    constructor(@Inject("TAGS_SERVICE") private readonly tagsService:ClientProxy){}

    @Post("add")
    async add(@Body() tagDto:TagsDto){
        try{     
            

            const tag=await this.tagsService.send("add",tagDto);
            return tag
        }
        catch{
            throw new HttpException("Microservice is not available",HttpStatus.NOT_FOUND)
       
        }
    }
  
    @Get("all")
     async getAll(){
        try{
            const tags=await this.tagsService.send("all",{});
            return tags
        }
        catch{
            throw new HttpException("Microservice is not available",HttpStatus.NOT_FOUND)
        }
        
    }

    
    @Get('get/:title')
   async getTagsByTitle(@Param('title') title){
        try{
          
            const tags=await this.tagsService.send("getByTitle",title);
            return tags
        }
        catch{
            throw new HttpException("Microservice is not available",HttpStatus.NOT_FOUND)
        }
        
    }

  

    @Put('update/:title')
    async updateByTitle(@Param('title') title:string,@Body() tagDto:TagsDto){
         try{
            
            const tag=await  this.tagsService.send("update",{title,tagDto});
               
              return tag
             

         }
         catch{
             throw new HttpException("Microservice is not available",HttpStatus.NOT_FOUND)
         }
         
     }





    @Delete('delete/:title')
    async deleteByTitle(@Param('title') title){
         try{
             const tag=await this.tagsService.send("delete",title);
             return tag
         }
         catch{
             throw new HttpException("Microservice is not available",HttpStatus.NOT_FOUND)
         }
         
     }

}
