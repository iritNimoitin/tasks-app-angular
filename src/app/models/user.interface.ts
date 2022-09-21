export interface IUser{
    id:number;
    name:string;
    email: string;
    address: {street:string,city:string,zipcode:string};
}