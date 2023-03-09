import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);
  // @ts-ignore
  currentToken;

  constructor(private angularFireMessaging: AngularFireMessaging,
              private http: HttpClient) {

  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log('Token', token);
        this.currentToken = token;
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

  postMessage(patient:string){
    console.log('Token on post message:',this.currentToken);
    return this.http.post("https://fcm.googleapis.com/fcm/send",{
      "notification": {
        "title": "DocPatient",
        "body": "Nouveau rendez avec "+patient
      },
      "to": this.currentToken
    }, {
      headers: new HttpHeaders({
        'Authorization': 'key=AAAA--3CzGE:APA91bHeWqU3oN-hNL2-FZ_GGUskAb2Jl-VsOqkJgkaLYciDglZn5vZiQdhSxtJvotTpcETovIhumTNYtbFzVjMSe3TgfwKJa_5phbh3vtfGvtXMr5kF0ZwV0MNVK7YmmgxHFzcFf7yl',
        'Content-Type': 'application/json'
      })
    });
  }
}
