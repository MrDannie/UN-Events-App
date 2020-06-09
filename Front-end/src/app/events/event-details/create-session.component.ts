import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import { ISession } from "../shared/index";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "create-session",
  templateUrl: "./create-session.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input,
      .error select,
      .error textarea {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();
  @Output() updateSession = new EventEmitter();
  @Input() recievedSessionToEdit;
  @Input() editState;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    console.log(this.recievedSessionToEdit);
    console.log(this.editState);
  }

  saveSession(formValues) {
    if (this.editState) {
      let session: ISession = {
        _id: this.recievedSessionToEdit._id,
        name: formValues.name,
        presenter: formValues.presenter,
        duration: +formValues.duration,
        level: formValues.level,
        abstract: formValues.abstract,
        voters: [],
      };
      console.log(session);
      this.updateSession.emit(session);
    } else {
      let session: ISession = {
        _id: undefined,
        name: formValues.name,
        presenter: formValues.presenter,
        duration: +formValues.duration,
        level: formValues.level,
        abstract: formValues.abstract,
        voters: [],
      };
      console.log(session);

      this.saveNewSession.emit(session);
    }
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
