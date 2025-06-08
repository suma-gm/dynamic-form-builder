import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, ToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
