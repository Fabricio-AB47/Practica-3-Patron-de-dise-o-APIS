import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmpleadoComponent, DepartamentoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  view: 'empleados' | 'departamentos' = 'empleados';
}
