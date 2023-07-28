import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stat } from "../models/stat.model";
import { HttpClient } from "@angular/common/http";

@Injectable ({
	providedIn: 'root'
})
export class StatsService {

	constructor (private http: HttpClient) {}

	private apiUrl : string = 'http://localhost:3000/stats';

	getAllStats() : Observable<Stat[]> {
		return this.http.get<Stat[]>(`${this.apiUrl}`);
	}

	getStatById(id: number) : Observable<Stat> {
		return this.http.get<Stat>(`${this.apiUrl}/${id}`);
	}
}
