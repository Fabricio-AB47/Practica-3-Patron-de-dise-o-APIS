import { Component } from '@angular/core';
import { EmpleadoComponent } from './components/empleado/empleado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmpleadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
