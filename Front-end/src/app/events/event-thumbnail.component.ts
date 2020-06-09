import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IEvent } from "./shared/event.model";

@Component({
  selector: "event-thumb",
  template: `
    <div class="hoverwell well thumbnail">
    <div class=" event-details"  [routerLink]="['/events', event._id]">
     <h2 style="font-size: 15px; font-weight: bold; margin-right: 10px;" >
        {{ event.name | uppercase }}
      </h2>

     
      <div>Date: {{ event.date | date: "shortDate" }}</div>
      <div [ngSwitch]="event?.time">
        Time: {{ event.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Budget: {{ event.budget | currency: "USD" }}</div>
      <div [hidden]="!event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left"
          >{{ event?.location?.city }}, {{ event?.location?.country }}</span
        >
      </div>
    </div>

  <div class="details-action">
   <div [routerLink]="['/events/edit/', event._id]">
   <a  class="action-icons"
                ><i
                
                  title="Edit Event"
                  class="glyphicon glyphicon-edit edit-icon white"
                ></i
              ></a></div>


  <div (click)="sendEventId(event._id)">
  <a class="action-icons" 
                ><i
                
                  title="Delete Event"
                  class="glyphicon glyphicon-trash trash-icon white"
                ></i
              ></a></div>
  </div>
    
    </div>
  `,
  styles: [
    `
      .green {
        color: #003300 !important;
      }
      .bold {
        font-weight: bold;
      }
      .pad-left {
        margin-left: 10px;
      }
      .thumbnail {
        min-height: 210px;
        border-radius: 30px;
        outline: none;
      }
      .well div {
        color: #bbb;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event: IEvent;
  @Output() toBeDeleted: EventEmitter<any> = new EventEmitter();

  getStartTimeClass() {
    const isEarlyStart = this.event && this.event.time === "8:00 am";
    return { green: isEarlyStart, bold: isEarlyStart };
  }

  sendEventId(eventId) {
    this.toBeDeleted.emit(eventId);
  }
}
