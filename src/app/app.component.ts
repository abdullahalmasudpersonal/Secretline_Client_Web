import { Component, Inject, PLATFORM_ID } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './features/auth/components/register/register.component';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, MatIconModule, CommonModule, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'secretline_client';

  isUserAvailable: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      this.isUserAvailable = !!token;
    }
  }

  // Child থেকে এই মেথড কল হবে
  updateUserStatus(status: boolean) {
    this.isUserAvailable = status;
  }

  selectedMenu: string = 'home'; // Default selected menu
  detailsView: boolean = false; // To toggle the details view
  detailsContent: { title: string; description: string } = {
    title: '',
    description: '',
  }; // Details content

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
    this.detailsView = true; // Hide details when menu changes
  }

  showDetails(detailType: string): void {
    this.detailsView = true;

    // Set content based on the selected details type
    if (detailType === 'homeDetails') {
      this.detailsContent = {
        title: 'Home Details',
        description: 'This is the detailed view of the Home section.',
      };
    } else if (detailType === 'dashboardDetails') {
      this.detailsContent = {
        title: 'Dashboard Details',
        description: 'This is the detailed view of the Dashboard section.',
      };
    } else if (detailType === 'chatDetails') {
      this.detailsContent = {
        title: 'Chat Details',
        description: 'This is the detailed view of the Chat section.',
      };
    } else if (detailType === 'groupDetails') {
      this.detailsContent = {
        title: 'Group Details',
        description: 'This is the detailed view of the Group section.',
      };
    }
  }
}
