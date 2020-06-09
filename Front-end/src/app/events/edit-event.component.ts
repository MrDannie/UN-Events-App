import { Component } from "@angular/core";
import { Router, Params } from "@angular/router";
import { EventService } from "./shared/event.service";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from "./shared/event.model";

@Component({
  templateUrl: "./edit-event.component.html",
})
export class EditEventComponent {
  event: IEvent;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let eventId = +params["id"];
      this.eventService.getEvent(eventId).subscribe((event) => {
        this.event = event;
      });
      console.log(this.event);
    });
  }

  updateEvent(formValues) {
    formValues.imageUrl = "/assets/images/512px-UN_emblem_blue.svg.png";
    formValues._id = this.event._id;
    console.log(formValues);
    this.eventService.updateEvent(formValues).subscribe((event: IEvent) => {
      if (event) {
        // Pop-up Message

        this.router.navigate(["/events"]);
      } else {
        // Error Pop Msg
      }
    });
  }

  cancel () {
    this.router.navigate(["/events"]);
  }
}
