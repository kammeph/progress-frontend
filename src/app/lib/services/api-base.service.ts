import { HttpClient } from "@angular/common/http";

export class ApiBaseService {
    constructor(
        protected http: HttpClient,
        protected apiUrl: string,
        protected prefix: string) { }
}