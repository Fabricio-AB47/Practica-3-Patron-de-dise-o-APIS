import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  // Usa proxy (frontend/proxy.conf.json) para evitar CORS en dev
  private URL_API = '/api/empleados';

  empleados: Empleado[] = [];
  selectedEmpleado: Empleado = { nombre: '', cargo: '', departamento: '', sueldo: 0 };

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API).pipe(
      tap(res => console.debug('[EmpleadoService] getEmpleados response', res)),
      catchError(err => {
        console.error('[EmpleadoService] getEmpleados error', err);
        return throwError(() => err);
      })
    );
  }
  createEmpleado(e: Empleado) {
    return this.http.post(this.URL_API, e);
  }
  updateEmpleado(id: string, e: Partial<Empleado>) {
    return this.http.put(`${this.URL_API}/${id}`, e);
  }
  deleteEmpleado(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
