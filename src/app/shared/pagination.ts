export class Pagination<T> {
    data: Array<T>;
    meta:any;    
    iTotalDisplayRecords: number;
    iTotalRecords: number;

    constructor(
        data: Array<T> = new Array<T>(),
        iTotalDisplayRecords: number = 0,
        iTotalRecords: number = 0
    ) {
        this.data = data;
        this.iTotalDisplayRecords = iTotalDisplayRecords;
        this.iTotalRecords = iTotalRecords;
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