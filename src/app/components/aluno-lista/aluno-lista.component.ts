import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno-lista.component.html',
  styleUrl: './aluno-lista.component.css'
})
export class AlunoListaComponent implements OnInit {
  alunos: Aluno[] = [];
  carregando = true;
  erro = '';

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.alunoService.obterTodos().subscribe({
      next: (dados) => {
        this.alunos = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar alunos. Verifique se a API está rodando.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  verDetalhes(ra: string): void {
    this.router.navigate(['/alunos', ra]);
  }

  editar(ra: string): void {
    this.router.navigate(['/alunos', ra, 'editar']);
  }
}
