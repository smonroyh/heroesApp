import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl : string = environments.baseURL;


  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(heroId:string) : Observable<Hero | undefined>{

    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${heroId}`)
    .pipe(catchError(error=> of(undefined)   ))
  }

  getSuggestions(query : string): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }
}
