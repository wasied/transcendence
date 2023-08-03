import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthHttpOptions {
	headers?: HttpHeaders;
	context?: HttpContext;
	params?: HttpParams;
}

@Injectable()
export class AuthHttpClient {
	constructor(private readonly http: HttpClient) {}

	private addAuthHeader(headers: HttpHeaders): HttpHeaders {
		return headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
	}

	get<T>(url: string, options?: AuthHttpOptions): Observable<T> {
		var headers: HttpHeaders;
		if (!options || !options.headers)
			headers = new HttpHeaders();
		else
			headers = options.headers;
		if (!options)
			options = { headers: this.addAuthHeader(headers) };
		else
			options.headers = this.addAuthHeader(headers);

		return this.http.get<T>(url, options);
	}
	
	post<T>(url: string, body: Object, options?: AuthHttpOptions): Observable<T> {
		var headers: HttpHeaders;
		if (!options || !options.headers)
			headers = new HttpHeaders();
		else
			headers = options.headers;
		if (!options)
			options = { headers: this.addAuthHeader(headers) };
		else
			options.headers = this.addAuthHeader(headers);

		return this.http.post<T>(url, body, options);
	}
	
	put<T>(url: string, body: Object, options?: AuthHttpOptions): Observable<T> {
		var headers: HttpHeaders;
		if (!options || !options.headers)
			headers = new HttpHeaders();
		else
			headers = options.headers;
		if (!options)
			options = { headers: this.addAuthHeader(headers) };
		else
			options.headers = this.addAuthHeader(headers);

		return this.http.put<T>(url, body, options);
	}

	delete<T>(url: string, options?: AuthHttpOptions): Observable<T> {
		var headers: HttpHeaders;
		if (!options || !options.headers)
			headers = new HttpHeaders();
		else
			headers = options.headers;
		if (!options)
			options = { headers: this.addAuthHeader(headers) };
		else
			options.headers = this.addAuthHeader(headers);

		return this.http.delete<T>(url, options);
	}
}
