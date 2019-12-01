import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyPoll';
  public tonen = false;

  constructor(private router: Router) {
    /*if(localStorage.getItem('token') != null){
        this.tonen = true;
    }*/
  }

  onLogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
