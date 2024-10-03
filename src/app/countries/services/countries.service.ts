import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string):Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([])),  // catchError is an operator that intercepts an Observable that failed
        delay(2000)//tardara 2 segundos en cargar el contenido, mas no la consulta http
      );

  }

  searchCountryByAlphaCode( code: string):Observable<Country|null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( err => {
          console.log(err);

          return of(null)
        })  // catchError is an operator that intercepts an Observable that failed
      );


  }
  searchCapital( term: string):Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
    // return this.http.get<Country[]>(url)
    //   .pipe(
    //     catchError( err => {
    //       console.log(err);

    //       return of([])
    //     })  // catchError is an operator that intercepts an Observable that failed
    //   );
  }
  searchCountry( term: string):Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
  }
  searchRegion( region: string):Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url);

  }
}
