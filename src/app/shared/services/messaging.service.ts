import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {

  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log('Token', token);
      });
  }

  receiveMessaging() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("New message received", payload);
        this.currentMessage.next(payload);
      }
    );
  }
}