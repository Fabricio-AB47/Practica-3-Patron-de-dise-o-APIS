import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Departamento {
  _id?: string;
  nombre: string;
  slogan?: string;
}

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  selected: Departamento = { nombre: '', slogan: '' };
  loading = false;
  saving = false;
  message: string | null = null;
  error: string | null = null;

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.loading = true;
    this.error = null;
    try {
      const endpoint = '/graphql';
      const q = '{ departamentos { _id nombre slogan } }';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const j = await res.json();
      this.departamentos = j.data?.departamentos || [];
    } catch (e: any) {
      this.error = 'Error al cargar departamentos';
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async submit(f: NgForm) {
    if (f.invalid) return;
    this.saving = true;
    this.error = null;
    this.message = null;
    try {
      const endpoint = '/graphql';
      const m = `mutation { createDepartamento(input:{nombre:\"${this.selected.nombre}\", slogan:\"${this.selected.slogan || ''}\"}){ _id nombre slogan } }`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: m })
      });
      const j = await res.json();
      const created = j.data?.createDepartamento;
      if (created) {
        this.message = 'Departamento creado';
        this.selected = { nombre: '', slogan: '' };
        this.load();
        f.resetForm();
      } else {
        this.error = 'No se pudo crear departamento';
        console.error(j);
      }
    } catch (e: any) {
      this.error = 'Error al crear departamento';
      console.error(e);
    } finally {
      this.saving = false;
    }
  }
}
