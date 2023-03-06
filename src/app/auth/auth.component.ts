import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  title = 'docPatient-client';
  hide = true;
  errorMessage = false;
  authForm = new FormGroup({
    email: new FormControl('j.bleu@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('jeanbleu', [Validators.required])
  });

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  signIn() {
    // @ts-ignore
    this.authService.getUIDByEmailPassword(this.authForm.value.email.toString(), this.authForm.value.password).then(r => {
        if (r.user) {
          this.userService.getUserByUid(r.user.uid).subscribe(
            r => {
              this.errorMessage = false;
              r.forEach(doc => {
                // @ts-ignore
                this.userService.currentUser = new User(doc.data().uid, doc.data().name, doc.data().role);
                // @ts-ignore
                console.log('Current User: ', this.userService.currentUser);
                this.router.navigateByUrl('/homepage');
              });
            }
          );
        }
      },
      (error) => {
        this.errorMessage = true;
        window.navigator.vibrate(200);
        console.log('Error:', error.message);
      });
  }
}
