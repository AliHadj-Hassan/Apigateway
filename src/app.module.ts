import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CategorieModule } from './categorie/categorie.module';
import { ProfessionalDataModule } from './cv_data/professional-data/professional-data.module';
import { LanguagesModule } from './cv_data/languages/languages.module';
import { ProfessionalExperienceModule } from './cv_data/professional-experience/professional-experience.module';
import { TrainingsQualificationsModule } from './cv_data/trainings-qualifications/trainings-qualifications.module';
import { AdditionalDataModule } from './cv_data/additional-data/additional-data.module';
import { ImagesModule } from './upload_ms/images/images.module';
import { FilesModule } from './upload_ms/files/files.module';
import { SkillsModule } from './cv_data/skills/skills.module';
import { PersonalDataModule } from './cv_data/personal-data/personal-data.module';
import { TagsModule } from './tags/tags.module';





@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CategorieModule,
    ClientsModule.register([
      { 
      name: 'AUTH_SERVICE', 
      transport: Transport.TCP,
      options:{ 
        host: "0.0.0.0",
        port: 3010//parseInt(process.env.AUTHMCPORT),
      } 
    },
   
  
    ]),
    ProfessionalDataModule,
    LanguagesModule,
    ProfessionalExperienceModule,
    TrainingsQualificationsModule,
    AdditionalDataModule,
    ImagesModule,
    FilesModule,
    SkillsModule,
    PersonalDataModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    RoleGuard,
],
})
export class AppModule {}
