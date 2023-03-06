import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RendezVous} from "../models/rendezVous.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // @ts-ignore
  currentUser:User;
  // @ts-ignore
  listRendezVous: Array<RendezVous> = [];
  listDoctor: Array<User> = [];
  constructor(private angularFireStore: AngularFirestore) { }

  getUserRendezVous(){
    return this.angularFireStore.collection('rendezVous', ref => ref.where("uidClient", "==", this.currentUser.uid)).get()
  }
  getUserByUid(uid: string) {
    return this.angularFireStore.collection('users', ref => ref.where("uid", "==", uid)).get()
  }
  getUserByRole(role: string){
    return this.angularFireStore.collection('users', ref => ref.where("role", "==", role)).get()

  }
}
