export class AppSettings {
    private settings = {
        appName: "Laiqa Tech",
        appDesc: "App belum jelas",
        appVers: "1.0",
        baseURL: "http://localhost/laiqatech/src/api/",
        imageURL: "http://hcportal.nabatisnack.co.id/api/empdocument/"
    };

    /**
     * apiEndpoint
     * Register API Endpoint Here
     * @param key string
     */
    private apiEndpoint(key: string): any {
        const endpoint = {
            auth: "/login",
            brands: "/brands",
        };
        return endpoint[key];
    }

    public getSettings(): any {
        return this.settings;
    }

    /**
     * getApiEndpoint
     * Get Data Endpoint
     * @param key string
     */
    public getApiEndpoint(key: string = null): any {
        if (key !== null) {
            return this.settings.baseURL + this.apiEndpoint(key);
        }
        return this.settings.baseURL;
    }
}
