import { Component, OnInit } from "@angular/core";
import { EventService } from "./shared/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IEvent } from "./shared/event.model";
@Component({
  template: `<div>
    <h1>United Nations Future Events</h1>
    <hr />
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumb (toBeDeleted)="deleteEvent($event)" [event]="event">
        </event-thumb>
      </div>
    </div>
  </div> `,
})
export class EventsListComponent implements OnInit {
  events: IEvent[];
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.events = this.route.snapshot.data["events"];
  }

  deleteEvent(eventId) {
    // here We will make a call to delete event
    console.log(eventId);
    this.eventService.deleteEvent(eventId).subscribe((status: boolean) => {
      if (status) {
        // Pop up Event
        console.log(status, "Event has been deleted");
        this.eventService.getEvents().subscribe((events) => {
          this.events = events;
        });
      } else {
        //Pop up
      }
    });
  }
}
