export interface IProfessionalData {
    Title: string;  // Titre (lecture seule)
    LevelOfEducation: string;  // Niveau d'éducation (lecture seule)
    LevelOfExperience: string;  // Niveau d'expérience (lecture seule)
    CurrentNetSalary: number;  // Salaire net actuel (lecture seule)
    ProfessionalSituation: string;  // Situation professionnelle (lecture seule)
    Availability: string;  // Disponibilité (lecture seule)
    DesiredMinimumNetSalary: number;  // Salaire net minimum souhaité (lecture seule)
    Jobs: string[]; //table de metiers
    JobCategorie: string[];//chaque metier a plus de categogrie
    SectorsOfActivity: string[];//table des secteurs d'activité
    TypesOfPositions: string[];//table de string
    DesiredWorkLocations: string[];//table de string
    Occupation: string[];//table de stringes
    Mobility: string[];//table de string 
}