import { Component, OnInit } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { EventService, ISession, IEvent } from "../events/index";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  searchTerm: string = "";
  events: IEvent[];
  foundSessions: ISession[];
  menu;
  close;
  hamburger;
  open: boolean = false;
  constructor(public auth: AuthService, private eventService: EventService) {}

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }
  ngOnInit() {
    this.eventService.getEvents().subscribe((eventsList) => {
      this.events = eventsList;
    });
  }

  openMenu() {
    if (this.open === false) {
      this.open = true;
      this.getStyling();
    } else {
      this.open = false;
      this.getStyling();
    }
  }

  closeMenu(event){
    if(event){
      event.preventDefault();
    }
    this.open = false;
  }

  getStyling() {
    const toggleNav = this.open === true;
    return { open: toggleNav };
  }
}
