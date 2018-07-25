import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ApiService {
 
    constructor(private http:HttpClient) {
        
    }
 
    // Uses http.get() to load data from a single API endpoint
    postImage(baseImage:String) {
        return this.http.post('http://'+this.getUrl()+'/processamento', {
            image:baseImage.replace("data:image/*;charset=utf-8;base64,", "")
        });
    }

    mockPost() {
        
        return this.http.get('http://localhost:5000/mock');
    }

    getUrl(){
        return '104.196.12.213';
    }
}