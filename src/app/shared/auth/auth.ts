import { StorageService } from 'app/shared/storage.service';

export class User {
    empSite: string;
    empSubArea: number;
    empNo: number;
    expired: number;
    flagApp: string;
    group: number;
    images: string;
    name: string;
    section: string;
    userID: string;
    username: string;
    email: string;

    constructor(
        empSite: string = '-',
        empSubArea: number = 0,
        empNo: number = 0,
        expired: number = 0,
        flagApp: string = '-',
        group: number = 0,
        images: string = '-',
        name: string = '-',
        section: string = '-',
        userID: string = '-',
        username: string = '-',
        email: string = '-'
    ) {
        const storage = new StorageService();
        if (storage.get('token')) {
            Object.keys(User).forEach(val => {
                this[val] = storage.get(val);
            });
        } else {
            this.empSite = empSite;
            this.empSubArea = empSubArea;
            this.empNo = empNo;
            this.expired = expired;
            this.flagApp = flagApp;
            this.group = group;
            this.images = images;
            this.name = name;
            this.section = section;
            this.userID = userID;
            this.username = username;
            this.email = email;
        }
    }
}

export class Profiles {
    nik: string;
    nik_atasan: string;
    grade: string;
    positionID: string;
    emp_profile_id: number;
    hired_date: string;
    flag_app: string;
    effective_date: string;
    fullname: string;
    department: string;
    division: string;
    sub_area: string;
    job_code: string;
    job_code_description: string;
    current_position: string;
    photo_address?: string;
}

export interface Auth {
    token: string;
    type: string;
}
