export class Pagination<T> {
    data: Array<T>;
    to: number;
    total: number;
    current_page:number;

    constructor(
        data: Array<T> = new Array<T>(),
        to: number = 0,
        total: number = 0,
        current_page:number =1,
    ) {
        this.data = data;
        this.to = to;
        this.total = total;
        this.current_page = current_page;
    }
}

export class PagingAttributes {
    iTotalDisplayRecords: number;
    iTotalRecords: number;

    constructor(iTotalDisplayRecords: number = 0, iTotalRecords: number = 0) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
        this.iTotalRecords = iTotalRecords;
    }
}

export class Page {
    limit = 10;
    page = 0;
}

export class PaginationPage {
    limit = 10;
    page = 0;
    search ? = '';
}

export class Paginate<T>{
    ds?:Array<T>;
    data:any;
    message:string;
    success:boolean;

    constructor(
        data:any=[],
        message:string="",
        success:boolean=false
    ){
        console.log(data);
        
        this.data = data;
        this.message = message;
        this.success = success;
        this.ds = data.data;
    }
}