import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private angularFireStore: AngularFirestore) {
  }

  getUIDByEmailPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

}
