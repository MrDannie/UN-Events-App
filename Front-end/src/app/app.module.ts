import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  VoterService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  EditEventComponent,
} from "./events/index";

import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";

import { appRoutes } from "./routes";
import {
  JQ_TOKEN,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
  TOASTR_TOKEN,
} from "./common/index";

import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DurationPipe } from "./events/shared/duration-pipe.component";
import { HttpClientModule } from "@angular/common/http";

let jQuery = window["$"];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    EventService,
    VoterService,
    EventRouteActivator,
    { provide: JQ_TOKEN, useValue: jQuery },
    {
      provide: "canDeactivateCreateEvent",
      useValue: checkDirtyState,
    },
    EventListResolver,
    AuthService,
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    EditEventComponent,
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      "You have not saved your form, do you really want to cancel?"
    );
  return true;
}
