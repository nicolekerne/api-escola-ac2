import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Disciplina } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-disciplinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno-disciplinas.component.html',
  styleUrl: './aluno-disciplinas.component.css'
})
export class AlunoDisciplinasComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  ra = '';
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ra = this.route.snapshot.paramMap.get('ra')!;
    this.alunoService.obterDisciplinas(this.ra).subscribe({
      next: (dados) => {
        this.disciplinas = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar disciplinas.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/alunos', this.ra]);
  }
}
