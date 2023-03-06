import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user.model";
import {RendezVous} from "../shared/models/rendezVous.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  doctorForm = new FormGroup({
    doctor: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              public userService: UserService,) {
  }

  ngOnInit(): void {
    if (this.userService.currentUser === null) {
      this.router.navigateByUrl('');
    } else {
      this.userService.getUserRendezVous().subscribe(
        (r) => {
          r.forEach(rdv=> {
            // @ts-ignore
            this.userService.getUserByUid(rdv.data().uidDoctor).subscribe(
              r => {
                r.forEach(doc => {
                  // @ts-ignore
                  const newRdv = new RendezVous(rdv.data().id,rdv.data().uidClient,doc.data().name,rdv.data().description,rdv.data().date);
                  this.userService.listRendezVous.push(newRdv);
                  console.log('Rendez-vous', doc.data());
                });
              }
            );

          });
        }
      );
      this.userService.getUserByRole('pro').subscribe(
        r => {
          r.forEach(user=> {
            this.userService.listDoctor = [];
            // @ts-ignore
            const doctor = new User(user.data().uid, user.data().name, user.data().role);
            this.userService.listDoctor.push(doctor);
          });
        }
      );
    }
  }


}
