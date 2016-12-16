import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Ajax {

    constructor(private http: Http) {

    }

    getData(): Observable < any > {
        return this.http.get('app/test.json')
            .map(this.extractData)
    }

    private extractData(res: any) {
        let body = res.json();
        return body || {};
    }
}
