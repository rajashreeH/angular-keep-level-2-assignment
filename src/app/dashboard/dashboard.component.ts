import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMessage: string;
  public note: Note;
  public notes: Note[];

  constructor(private notesService: NotesService) {
    this.note = new Note();
    this.notes = [];
    this.errMessage = '';
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
    );
  }

  addNote() {
    if (!!this.note.text && !!this.note.title) {
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => { }, err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
