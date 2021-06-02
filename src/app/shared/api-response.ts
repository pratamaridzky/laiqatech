import { Injectable } from '@angular/core';

export class ApiResponse {
    title = 'Cancel';
    message = 'Request Canceled';
    data: any;

    constructor(options?: { title?: string; message: string; data?: any }) {
        if (typeof options !== 'undefined') {
            Object.keys(options).forEach(key => {
                this[key] = options[key];
            });
        }
    }
}
