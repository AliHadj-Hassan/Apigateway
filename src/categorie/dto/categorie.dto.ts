/* eslint-disable prettier/prettier */
export interface CategorieDto{
    title: string;
    code: string;
    //absolutePath: string;
    Parent: CategorieDto;
   // Childs: CreateCategorieDto[];
}