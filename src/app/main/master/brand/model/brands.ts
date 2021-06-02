import { Category } from "../../category/model/category";

export class Brands {
  id?:number;
  categorie_id:number;
  categorie:Category;
  name:string;
  description:string;
  create_at:string;
  update_at:string;
  deleted_at:string;
}