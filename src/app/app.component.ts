import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'secretline_client';

  selectedMenu: string = 'home'; // Default selected menu
  detailsView: boolean = false; // To toggle the details view
  detailsContent: { title: string; description: string } = {
    title: '',
    description: '',
  }; // Details content

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
    this.detailsView = false; // Hide details when menu changes
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
