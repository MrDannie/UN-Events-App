import { Injectable, EventEmitter } from "@angular/core";
import { Subject, throwError, Observable } from "rxjs";
import {
  IEvent,
  ISession,
  EventTrackerError,
  IEventResponse,
  IApiResponse,
} from "./event.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:5000/'

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`${this.baseUrl}` + "api/events/")
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http
      .get<IEvent>(`${this.baseUrl}` + "api/events/" + `${id}`)
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  saveEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEventResponse>(`${this.baseUrl}` + "api/events/", event).pipe(
      map((response) => response.event),
      catchError((err) => this.handleHttpError(err))
    );
  }

  updateEvent(updatedEvent: IEvent): Observable<IEvent> {
    console.log(updatedEvent);
    return this.http
      .put<IEventResponse>(`${this.baseUrl}` + "api/events/" + `${updatedEvent._id}`, updatedEvent)
      .pipe(
        map((response) => response.event),
        catchError((err) => this.handleHttpError(err))
      );
  }
  
  deleteEvent(id: number): Observable<boolean> {
    return this.http.delete<IApiResponse>(`${this.baseUrl}` + "api/events/" + `${id}`).
    pipe(
      map((res) => res.status),
      catchError((err) => this.handleHttpError(err))
    )
  }

  private handleHttpError(error: HttpErrorResponse) {
    let dataError = new EventTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error occurred retrieving data.";
    return throwError(dataError);
  }

  searchSessions(searchTerm: string) {
    var term = searchTerm.toLocaleLowerCase();
    var results: ISession[] = [];

    EVENTS.forEach((event) => {
      var matchingSessions = event.sessions.filter(
        (session) => session.name.toLocaleLowerCase().indexOf(term) > -1
      );
      matchingSessions = matchingSessions.map((session: any) => {
        session.eventId = event._id;
        return session;
      });
      results = results.concat(matchingSessions);
    });

    var emitter = new EventEmitter(true);
    setTimeout(() => {
      emitter.emit(results);
    }, 100); 
    return emitter;
  }
}

const EVENTS: IEvent[] = [
  {
    _id: 1,
    name: "Big challenges in a small Country",
    date: new Date("9/26/2036"),
    time: "10:00 am - 1.00 p.m",
    budget: 599.99,
    imageUrl: "/assets/images/512px-UN_emblem_blue.svg.png",
    location: {
      address: "1057 DT",
      city: "Kigali",
      country: "Rwanda",
    },
    sessions: [
      {
        _id: 1,
        name: "Sustainable Development Goal",
        presenter: "Civil Society Organisations",
        duration: 1,
        level: "Intermediate",
        abstract: ` Illustration and sharing of best practices
        on intellectual disability and of the functional intervention
         strategies provided by the Republic of San Marino, in particular
          the new guidelines for autism spectrum disorder`,
        voters: ["bradgreen", "igorminar", "martinfowler"],
      },
      {
        _id: 2,
        name: "Getting the most of you Disability ",
        presenter: "President of the General Assembly",
        duration: 1,
        level: "Intermediate",
        abstract: `Value for money is a growing concern for
        governments and Civil Society organizations when assessing,
         demonstrating and improving inclusion of persons with
          disabilities in policies, programs, development initiatives.`,
        voters: ["johnpapa", "bradgreen", "igorminar", "martinfowler"],
      },
      {
        _id: 3,
        name: " International Disability Alliance,",
        presenter: "International Disability Alliance",
        duration: 2,
        level: "Advanced",
        abstract: `The side event will look at the role
        that national level indicators and disaggregated
         data collection will play in ensuring that the Global
          Goals will reach all children and adults with disabilities.`,
        voters: [],
      },
      {
        _id: 4,
        name: " Our Voice Matters",
        presenter: "Canadian Working Group on HIV and Rehabilitation (CWGHR",
        duration: 2,
        level: "Advanced",
        abstract: `The aim of this Side Event is to explore
        the link between disabilities and the Sustainable
         Development Goals (SDGs) as well as enhancing concerted action,`,
        voters: [],
      },
      {
        _id: 5,
        name: "A Global Self-Advocacy Strategy",
        presenter: "Imamia Medics International",
        duration: 2,
        level: "Beginner",
        abstract: `Make a normative and analytical cross which
        will enable us to identify between the CRPD and CMW,
         priority areas of intersectionality;`,
        voters: ["bradgreen", "igorminar"],
      },
    ],
  },
  {
    _id: 2,
    name: "Neurodisabilities in Iraqi children",
    date: new Date("9/26/2037"),
    time: "11:00 am",
    budget: 950.0,
    imageUrl: "/assets/images/512px-UN_emblem_blue.svg.png",
    location: {
      address: "1057 DT",
      city: "mumbabwe",
      country: "Ghana",
    },
    sessions: [
      {
        _id: 1,
        name: "Neurodevelopmental impairment ",
        presenter: "Permanent Mission of Denmark to the United Nations",
        duration: 4,
        level: "Beginner",
        abstract: `Once considered the best health system
        in the region, Iraq is dealing with the consequences
        of three major wars resulting in adult and children
        disabilities that continue to suffer from the lack of
        medical care and rehabilitation services.`,
        voters: ["bradgreen", "igorminar"],
      },
      {
        _id: 2,
        name: "Psycological State of the Disable",
        presenter:
          "Permanent Mission of the United Kingdom to the United Nations",
        duration: 3,
        level: "Intermediate",
        abstract: `This session will examine the significant
        increase in the number of congenital neurodisabilities
         in Iraqi children following maternal exposure to
          radioactive contamination from three major wars. `,
        voters: ["bradgreen", "igorminar", "johnpapa"],
      },
      {
        _id: 3,
        name: "Disability Rights Fund, Inc.",
        presenter: "UN Committee on the Rights of Persons with Disabilities",
        duration: 2,
        level: "Intermediate",
        abstract: `Speakers will discuss community-based assessments,
        best practices and recommendations for improving 
        health systems globally for persons with disabilities
         through the word done in Iraq.`,
        voters: ["martinfowler"],
      },
      {
        _id: 4,
        name: "Challenges faced by persons with disabilities",
        presenter: "DESA/DSPD",
        duration: 1,
        level: "Beginner",
        abstract: ` A demonstration of the work of NHRIs
        and the rights of persons with disabilities 
        and the value of NHRI participation in the UN
         Conference of State Parties`,
        voters: ["bradgreen"],
      },
    ],
  },
  {
    _id: 3,
    name: "ICT supporting education for all",
    date: new Date("9/26/2037"),
    time: "9:00 am",
    budget: 759.0,
    imageUrl: "/assets/images/512px-UN_emblem_blue.svg.png",
    location: {
      address: "The Palatial Hotel,",
      city: "Salt Lake City",
      country: "Chile",
    },
    sessions: [
      {
        _id: 1,
        name: "What is Information Technology",
        presenter:
          "Permanent Mission of the Republic of Korea to the United Nations",
        duration: 2,
        level: "Intermediate",
        abstract: `Information and Communication Technologies
        are powerful instruments to support education for all
         children in all countries.`,
        voters: ["bradgreen", "martinfowler", "igorminar"],
      },
      {
        _id: 2,
        name: "What Encompases the term 'ICT' ",
        presenter: "International Disability Alliance",
        duration: 2,
        level: "Intermediate",
        abstract: `Thus ICT is also supporting the SDGs and
        the UN CRPD when it comes to the availability and
         accessibility of quality education and training that is affordable even in remote areas and in low-income countries.`,
        voters: ["bradgreen", "martinfowler"],
      },
      {
        _id: 3,
        name: "Information Tecnology in next ten years",
        presenter: "Young Adult Institute Inc",
        duration: 1,
        level: "Intermediate",
        abstract: `In this side-event, experts in this 
       field present and discuss existing technologies and
        their potential for the future, like internet access,
         online tools, manuals and training, smartphone applications, 
       digital databases and a lot more.`,
        voters: ["bradgreen", "martinfowler", "johnpapa"],
      },
      {
        _id: 4,
        name: "Various ICT devices",
        presenter: " European Union",
        duration: 1,
        level: "Beginner",
        abstract: `Let's take a look at some of the stranger pieces of Angular 4,
       including neural net nets, Android in Androids, and using pipes with actual pipes.`,
        voters: ["bradgreen", "martinfowler", "igorminar", "johnpapa"],
      },
      {
        _id: 5,
        name: "Different fields in ICT",
        presenter: "International Foundation for Electoral Systems",
        duration: 2,
        level: "Beginner",
        abstract: `Being a developer in 2037 is about more than just writing bug-free code. 
       You also have to look the part. In this amazing expose, Ward will talk you through
       how to pick out the right clothes to make your coworkers and boss not only
       respect you, but also want to be your buddy.`,
        voters: ["bradgreen", "martinfowler"],
      },
      {
        _id: 6,
        name: "Advantages of ICT in our World Today",
        presenter: "University of Tokyo KOMEX, IPA",
        duration: 2,
        level: "Intermediate",
        abstract: `Coinciding with the release of Star Wars Episode 18, this talk will show how
       to use directives in your Angular 4 development while drawing lessons from the new movie,
       featuring all your favorite characters like Han Solo's ghost and Darth Jar Jar.`,
        voters: ["bradgreen", "martinfowler"],
      },
    ],
  },
  {
    _id: 4,
    name: "Persons with Disabilities and SDGs",
    date: new Date("9/26/2037"),
    time: "8:00 am",
    budget: 800.0,
    imageUrl: "/assets/images/512px-UN_emblem_blue.svg.png",
    location: {
      address: "The Central Square,",
      city: "Capital",
      country: "Malawi",
    },
    sessions: [
      {
        _id: 1,
        name: "Foreign Aid and inclusion of People with Disabilities",
        presenter: "International Foundation for Electoral Systems",
        duration: 2,
        level: "Beginner",
        abstract: ` The event will include a workshop with the
        participation of two Persons with disabilities beneficiaries
         with their families, to share their own experience.`,
        voters: ["bradgreen", "igorminar"],
      },
      {
        _id: 2,
        name: "The indefinite detention of people with disability ",
        presenter: "Inclusion International",
        duration: 2,
        level: "Beginner",
        abstract: ` The event will include a workshop with the participation of two Persons with disabilities beneficiaries with their families, to share their own experience.`,
        voters: ["bradgreen", "igorminar", "johnpapa"],
      },
      {
        _id: 3,
        name: "Addressing Shackling of People with Disabilities Globally",
        presenter:
          "Institute on Disability and Public Policy, American University",
        duration: 3,
        level: "Advanced",
        abstract: `Shafallah Center will share their experience
        and achievements in the field of employment of persons
         with disabilities. This session will show you how.`,
        voters: ["igorminar", "johnpapa"],
      },
    ],
  },
  {
    _id: 5,
    name: "Empowering Young Women and Girls",
    date: new Date("9/26/2037"),
    time: "9:00 am",
    budget: 400.0,
    imageUrl: "/assets/images/512px-UN_emblem_blue.svg.png",
    location: {
      address: "1057 DT",
      city: "Montabi",
      country: "Zimbabwe",
    },
    sessions: [
      {
        _id: 1,
        name: "Empowering Women with small scale bussineses",
        presenter: "Permanent Mission of Sweden to the United Nations",
        duration: 1,
        level: "Intermediate",
        abstract: `Young women and girls with disabilities
        face multiple and unique forms of discrimination.
          This event will convene a panel of experts to
           discuss main these challenges`,
        voters: ["bradgreen", "igorminar"],
      },
      {
        _id: 2,
        name: "Gender Equality Between Men and Women",
        presenter: "The World Bank’s Inspection Panel",
        duration: 2,
        level: "Beginner",
        abstract: `Share successful examples to overcoming 
       barriers and empowering young women and girls with
        disabilities. in 60ish minutes, 
       guaranteed!`,
        voters: ["bradgreen", "igorminar", "johnpapa"],
      },
    ],
  },
];
