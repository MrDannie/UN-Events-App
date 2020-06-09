import { Component } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ISession, IEvent } from "../shared";

@Component({
  templateUrl: "./event-details.component.html",
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent {
  event: IEvent;
  filterBy: string = "all";
  sortBy: string = "votes";
  imageUrl: string = "/assets/images/512px-UN_emblem_blue.svg.png";
  addMode: boolean;
  imageWidth = 700;
  sessionToEdit: ISession;
  editState: boolean;
  pile: string = 'haha'

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const eventId = +params["id"];
      this.eventService.getEvent(eventId).subscribe((event) => {
        this.event = event;
        console.log(this.event.sessions);
      });

      this.addMode = false;
    });
  }

  addSession() {
    this.sessionToEdit = {
      _id: 0,
      name: "",
      presenter: "",
      duration: 0,
      level: "",
      abstract: "",
      voters: []

    }
    this.editState = false;
    this.addMode = true;
  }
 
  saveNewSession(session: ISession) {
    console.log("herer")
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((s) => s._id)
    );
    session._id = nextId + 1;

    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event).subscribe((event) => {
      if (event) {
        this.addMode = false;
        // pop message
      } else {
        // pop mesage
      }
    });
  }


  deleteSession(sessionId) {
    console.log(sessionId);
    this.event.sessions = this.event.sessions.filter(
      (session) => session._id !== sessionId
    );
    this.eventService.updateEvent(this.event).subscribe((event) => {
      if (event) {
        console.log("session deleted");
      }
    });
  }

  editSession(sessionId) {
    let arraySessionToEdit = this.event.sessions.filter(
      (session) => session._id === sessionId

      // Pop up
    );
    this.sessionToEdit = arraySessionToEdit[0];
    this.editState = true;

    this.addMode = true;
  }

  updateModifiedSession(sessionToModify){
    console.log(sessionToModify)

    this.eventService.updateEvent(this.event).subscribe((event) => {
      if (event) {
        this.addMode = false;
        console.log("updated")
        console.log(event)
        // pop message
      } else {
        // pop mesage
      }
    });
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
