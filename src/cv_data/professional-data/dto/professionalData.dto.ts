export interface ProfessionalDataDTO {
     IdUser: string;
     Title: string;  // Titre
     LevelOfEducation: string;  // Niveau d'éducation
     LevelOfExperience: string;  // Niveau d'expérience
     CurrentNetSalary: number;  // Salaire net actuel
     ProfessionalSituation: string;  // Situation professionnelle
     Availability: string;  // Disponibilité
     DesiredMinimumNetSalary: number;  // Salaire net minimum souhaité
     Jobs: string[]; //table de metiers
     JobCategorie: string[];//chaque metier a plus de categogrie
     SectorsOfActivity: string[];//table des secteurs d'activité
     TypesOfPositions: string[];//table de string
     DesiredWorkLocations: string[];//table de string
     Occupation: string[];//table de stringes
     Mobility: string[];//table de string 
}