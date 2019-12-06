import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {
  bearerToken: string;
  token: any;
  constructor(private httpClient: HttpClient,private authService: AuthenticationService) {

  }

  getNotes(): Observable<Array<Note>> {
    this.token = this.authService.getBearerToken();
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    });
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    });
  }

}
