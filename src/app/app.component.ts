import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  showHeaderNavFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHeaderVisibility(event.url);
    });
  }

  ngOnInit(): void {
    this.updateHeaderVisibility(this.router.url);
  }

  updateHeaderVisibility(url: string): void {
    this.showHeaderNavFooter = !url.includes('/login');
  }
}
