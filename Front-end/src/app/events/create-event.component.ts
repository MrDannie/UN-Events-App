import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";

@Component({
  templateUrl: "./create-event.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  newEvent;
  isDirty: boolean = true;
  constructor(private router: Router, private eventService: EventService) {}

  cancel() {
    this.router.navigate(["/events"]);
  }

  saveEvent(formValues) {
    formValues.imageUrl = "/assets/images/512px-UN_emblem_blue.svg.png";
    console.log(formValues);
    this.eventService.saveEvent(formValues).subscribe((event) => {
      if (event) {
        this.isDirty = false;
        this.router.navigate(["/events"]);
      }
    });
  }
}
