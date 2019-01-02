import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit, OnDestroy {

  position: Coordinates;

  private subscription: Subscription;

  constructor(private geolocation: Geolocation) {}

  ngOnInit(): void {
    this.geolocation.getCurrentPosition().then(position => this.position = position.coords);
    this.subscription = this.geolocation.watchPosition().subscribe(position => {
      console.log('old position:', this.position);
      this.position = position.coords;
      console.log('new position:', this.position);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
