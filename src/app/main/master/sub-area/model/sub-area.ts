import { Area } from "../../area/model/area";
import { Company } from "../../company/model/company";

export class SubArea {
  id?:number;
  area:Area;
  description:string;
  address:string;
  phone1:string;
  phone2:string;
  email:string;
  deleted_at:string;
  created_at:string;
  updated_at:string;
}
