export class Helper {
    /**
     * buildDeletePayload
     */
    public buildDeletePayload(arrObj: Array<any>): Array<any> {
        const response = new Array();

        if (typeof arrObj === 'undefined') {
            return null;
        }

        arrObj.forEach(val => {
            if ('id' in val) {
                response.push(val.id);
            } else {
                return true;
            }
        });

        return response;
    }

    /**
     * isDataExistsInArray
     *
     * @param {Array} Array Object
     * @param {String} Compared key string in object
     * @param payload Compared value
     */
    public isDataExistsInArray(arr: Array<any>, key: string, payload: any): boolean {
        let found = false;
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i][key] === payload) {
                found = true;
                break;
            }
        }
        return found;
    }

    /**
     * isEmptyObject
     */
    public isEmptyObject(obj: Object): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}
