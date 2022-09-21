export interface IUser{
    id:number;
    name:string;
    email: string;
    adress: {street:string,city:string,zipcode:string};
}