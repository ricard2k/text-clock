import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextClockService {

  private data: any|undefined;

  constructor(private http: HttpClient) { }

  private loadLanguage(): Observable<any> {
    return this.http.get('assets/ru-RU.json').pipe(
      tap( // Log the result or error
        data => {
          console.debug(" data", JSON.stringify(data) );
          this.data = data;
        },
        error => console.error("Reading language file.", error),
      ),
     );
  } 

  private getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public getTextFromTime<String>(time: String) {
    if (!this.data) {
      this.loadLanguage().subscribe();
      return [""];
    }
    return this.data[time][this.getRandomArbitrary(0, this.data[time].length -1)];
  }
}
