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
        return this.http.post('http://35.196.124.122:5000/processamento', {
            //image: '/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gNzUK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9Wbxbbfw20p+pAqB/Fyfw2RP1k/+tXJl5+0Mf/fw/wCFNLXH/POIf8DP+FaGHIi3qXxJYyzWllbKskZ2vKW3BT6AY5NZun+KdUiuPOa6eUHqkhyp/Dt+FeV3V9fWbyNCo/eTSSHeMkjOP6Vdi8SahFbW832QN5mRyODzjjFctWtUT909TDYejyNTWp7EnjC6utwiMAKnDAKePzNRS69qMoIMwAPYRj/CvMvDOoy3fiaWNX8sSQBsDkeveu2MMv8Az8yfgF/wrqjNtJnnTpqMmi9/al9/z8P+Qoqh5En/AD8y/wDjv+FFVzMnlRoGk709l+QNTako8p8RynS1lR4Tv37RxjAyap2uuyxWsK3NoBGD8u3uPzroPGNzBJrpg2MrRRL5hP8AGDkgj6c1kyXtrFprRqT5pI27h0964KyafLbqezh5px5720Oi8J2qtq15eImIxGI1z6k5P8q681V0mKCHSbUWwIjaJWBIwTkZyferTV3QjyqzPJqzU5uSG0UUVRmWmYbAD64zUF0s4XZFgEjrQ8wazJPAMiMp9VyR/wCyn860byLEqlegORW8IqFrrUl+8jzPX7KS7vEYCPdCgUt/GQSevqAMY/4FXM3EMouEWWIgnKoUTeM9iR3Fepa1p0cqidQEl6A9j7H2rnrTTiZzKwKFW2/41E6DnWVRbG8K6hRdN7o3rC4nWzgMxBcp8wHTPtVv7QhAODy23AGaqquxFUdBUE7CIljnHXArtlSjM89VJI0T1orI/tpE+VlJZeCfU0VzfVqnY29rHubdwANDtzjny2/9DWtYcwKTzxRRRPf5s1jt9xmalzZvmseE/wCjg99x/nRRXTR+E5q3xE561WvP9QaKK1Ric5N/r5P94/zooorpRJ//2Q=='
            image:baseImage.replace("data:image/*;charset=utf-8;base64,", "")
        });
    }

    mockPost() {
        
        return this.http.get('http://localhost:5000/mock');
    }
}