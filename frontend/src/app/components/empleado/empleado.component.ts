import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {
  constructor(public empleadoService: EmpleadoService) {}

  // backend health
  backendConnected = false;


  // UI state
  isLoading = false;
  isSaving = false;
  message: string | null = null;
  error: string | null = null;
  search = '';
  sortField: 'nombre' | 'cargo' | 'departamento' | 'sueldo' | 'createdAt' = 'nombre';
  sortAsc = true;

  ngOnInit(): void {
    this.getEmpleados();
    this.checkBackend();
  }

  checkBackend() {
    fetch('/health/db')
      .then(r => r.json())
      .then(j => {
        this.backendConnected = !!j.connected;
      })
      .catch(() => (this.backendConnected = false));
  }

  getEmpleados() {
    this.isLoading = true;
    this.error = null;
    this.empleadoService.getEmpleados().subscribe({
      next: res => {
        this.empleadoService.empleados = res;
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Error al cargar empleados';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  addEmpleado(form: NgForm) {
    if (form.invalid) return;
    this.isSaving = true;
    this.error = null;
    this.message = null;
    this.empleadoService.createEmpleado(form.value).subscribe({
      next: () => {
        this.message = 'Empleado creado';
        this.getEmpleados();
        form.resetForm();
        this.isSaving = false;
      },
      error: err => {
        this.error = 'Error al crear';
        console.error(err);
        this.isSaving = false;
      }
    });
  }

  edit(e: Empleado) {
    this.empleadoService.selectedEmpleado = { ...e };
  }

  update(form: NgForm) {
    const e = this.empleadoService.selectedEmpleado;
    if (!e._id) return;
    if (form.invalid) return;
    this.isSaving = true;
    this.error = null;
    this.message = null;
    this.empleadoService.updateEmpleado(e._id, form.value).subscribe({
      next: () => {
        this.message = 'Empleado actualizado';
        this.getEmpleados();
        this.resetForm(form);
        this.isSaving = false;
      },
      error: err => {
        this.error = 'Error al actualizar';
        console.error(err);
        this.isSaving = false;
      }
    });
  }

  remove(id?: string) {
    if (!id) return;
    if (!confirm('¿Eliminar este empleado?')) return;
    this.isLoading = true;
    this.error = null;
    this.message = null;
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => {
        this.message = 'Empleado eliminado';
        this.getEmpleados();
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Error al eliminar';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.empleadoService.selectedEmpleado = {
      nombre: '',
      cargo: '',
      departamento: '',
      sueldo: 0
    };
  }

  filteredEmpleados(): Empleado[] {
    const term = this.search.trim().toLowerCase();
    const data = this.empleadoService.empleados.filter(e => {
      if (!term) return true;
      return (
        e.nombre?.toLowerCase().includes(term) ||
        e.cargo?.toLowerCase().includes(term) ||
        e.departamento?.toLowerCase().includes(term)
      );
    });
    const dir = this.sortAsc ? 1 : -1;
    return data.sort((a: any, b: any) => {
      const va = a[this.sortField];
      const vb = b[this.sortField];
      if (va == null && vb == null) return 0;
      if (va == null) return -1 * dir;
      if (vb == null) return 1 * dir;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }

  setSort(field: 'nombre' | 'cargo' | 'departamento' | 'sueldo' | 'createdAt') {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }
}
