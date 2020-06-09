export interface IEvent {
  _id: number;
  name: string;
  date: Date;
  time: string;
  budget: number;
  imageUrl: string;
  location?: {
    address: string;
    city: string;
    country: string;
  };
  onlineUrl?: string;
  sessions: ISession[];
}

export interface ISession {
  _id: number;
  name: string;
  presenter: string;
  duration: number;
  level: string;
  abstract: string;
  voters: string[];
}

export class EventTrackerError {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
}

export interface IEventResponse {
  event: IEvent;
  status: boolean;
}


export interface IApiResponse {
  status: boolean;
  error?: string;
}