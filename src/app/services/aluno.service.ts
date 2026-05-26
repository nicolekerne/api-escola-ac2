import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Aluno, Disciplina } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly apiUrl = '/api/alunos';
  private readonly requestTimeoutMs = 15000;

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl).pipe(timeout(this.requestTimeoutMs));
  }

  obterPorRa(ra: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${ra}`).pipe(timeout(this.requestTimeoutMs));
  }

  obterDisciplinas(ra: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/${ra}/disciplinas`).pipe(timeout(this.requestTimeoutMs));
  }

  atualizar(ra: string, dados: Partial<Aluno>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ra}`, dados).pipe(timeout(this.requestTimeoutMs));
  }
}
