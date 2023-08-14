import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, catchError, of } from "rxjs";
import { MatchHistory } from "../models/match-history.model";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class MatchHistoryService {

	matchHistory$!: Observable<MatchHistory[]>

	constructor (private authHttp: AuthHttpClient) {}

	getUserHistory(userId: number): Observable<MatchHistory[]> {
		const endpoint = `${environment.appUrl}:${environment.backendAPIPort}/sessions/history/${userId}`;

		return this.authHttp.get<MatchHistory[]>(endpoint);
	}
}
