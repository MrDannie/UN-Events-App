import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { ISession } from "../shared";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSessions: ISession[] = [];
  @Input() sortBy: string;
  @Output() emitId: EventEmitter<number> = new EventEmitter();
  @Output() emitIdForEdit: EventEmitter<number> = new EventEmitter();

  constructor(private auth: AuthService, private voterService: VoterService) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === "name"
        ? this.visibleSessions.sort(sortByName)
        : this.visibleSessions.sort(sortByVotes);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }

    if (this.sortBy === "votes") this.visibleSessions.sort(sortByVotes);
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }

  filterSessions(filter) {
    if (isNaN(filter) === false) {
      this.visibleSessions = this.sessions.filter((session) => {
        return session._id !== filter;
      });
    } else if (filter === "all") {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

  deleteHandler(sessionId) {
    this.emitId.emit(sessionId);
    // this.deleteSession(sessionId);

    // if(sessionId){
    //   this.visibleSessions = this.sessions.filter((session) => session._id !== sessionId)
    // }
  }

  // deleteSession(sessionId) {
  //   console.log(sessionId);
  //   const sessionsLenght = this.sessions.length;
  //   for (let i = sessionsLenght - 1; i >= 0; i--) {
  //     if (this.sessions[i]._id === sessionId) {
  //       this.sessions.splice(i, 1);
  //     }
  //   }
  // }

  onEditSessionClick(sessionId) {
    this.emitIdForEdit.emit(sessionId);
  }
}

function sortByVotes(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByName(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
