import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno-detalhe.component.html',
  styleUrl: './aluno-detalhe.component.css'
})
export class AlunoDetalheComponent implements OnInit {
  aluno: Aluno | null = null;
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const ra = this.route.snapshot.paramMap.get('ra')!;
    this.alunoService.obterPorRa(ra).subscribe({
      next: (dados) => {
        this.aluno = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Aluno não encontrado.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/alunos']);
  }

  editar(): void {
    this.router.navigate(['/alunos', this.aluno!.ra, 'editar']);
  }

  verDisciplinas(): void {
    this.router.navigate(['/alunos', this.aluno!.ra, 'disciplinas']);
  }
}
