import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() {}

    /**
     * setData
     * @param key string
     * @param data any
     */
    public set(key: string, data: any): boolean {
        if (typeof data === 'object') {
            localStorage.setItem(key, JSON.stringify(data));
        } else if (typeof data !== 'undefined') {
            localStorage.setItem(key, data);
        } else {
            return false;
        }
        return true;
    }

    /**
     * @param key string
     */
    public get(key: string): any {
        let response = null;
        if (key) {
            const data = localStorage.getItem(key);
            if (this.isJson(data)) {
                response = JSON.parse(data);
            } else {
                response = data;
            }
        }

        return response;
    }

    /**
     *
     * isJson
     * @param str string
     * @returns boolean
     *
     */
    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * remove remove data from localStorage
     * @param key
     */
    public remove(key: string): boolean {
        localStorage.removeItem(key);
        return true;
    }

    /**
     * clear
     */
    public clear(): void {
        localStorage.clear();
    }
}
