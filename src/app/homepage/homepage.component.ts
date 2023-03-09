import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user.model";
import {RendezVous} from "../shared/models/rendezVous.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessagingService} from "../shared/services/messaging.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  today = new Date();
  // @ts-ignore
  message;
  // @ts-ignore
  deferredPrompt;
  doctorForm = new FormGroup({
    doctor: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              public userService: UserService,
              private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    if (this.userService.currentUser === null) {
      this.router.navigateByUrl('').then();
    } else {
      this.messagingService.requestPermission();
      this.messagingService.receiveMessaging();
      this.message = this.messagingService.currentMessage
      window.addEventListener('beforeinstallprompt', (e) => {
        this.deferredPrompt = e;
      });
      this.userService.getUserRendezVous().subscribe(
        (r) => {
          this.userService.listRendezVous = [];
          r.forEach(rdv => {
            // @ts-ignore
            this.userService.getUserByUid(rdv.data().uidDoctor).subscribe(
              r => {
                r.forEach(doc => {
                  // @ts-ignore
                  const newRdv = new RendezVous(rdv.data().id, rdv.data().uidClient, doc.data().name, rdv.data().description, rdv.data().date);
                  this.userService.listRendezVous.push(newRdv);
                });
              }
            );

          });
        }
      );
      this.userService.getUserByRole('pro').subscribe(
        r => {
          this.userService.listDoctor = [];
          r.forEach(user => {
            // @ts-ignore
            const doctor = new User(user.data().uid, user.data().name, user.data().role);
            this.userService.listDoctor.push(doctor);
          });
        }
      );
    }
  }

  createRendezVous() {
    if (this.doctorForm.valid) {
      this.userService.createNewRendezVous(
        this.userService.currentUser.uid,
        this.doctorForm.value.doctor,
        this.doctorForm.value.description,
        this.doctorForm.value.date,
      ).then(() => {
        this.messagingService.postMessage(this.userService.currentUser.name).subscribe(
          () => {
            console.log('Message done');
          },
          error => console.log('error',error)
        );
      }).catch(
        error => console.error(error.message)
      );
    }
  }

  async installApp() {
    if (this.deferredPrompt !== undefined) {
      console.log('Deferrend not null');
      this.deferredPrompt.prompt();
      const {outcome} = await this.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        this.deferredPrompt = null;
      }
    } else {
      console.log("deferred prompt is null [Website cannot be installed]")
    }
  }


}
