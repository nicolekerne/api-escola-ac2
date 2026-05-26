import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Aluno, Disciplina } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-editar.component.html',
  styleUrl: './aluno-editar.component.css'
})
export class AlunoEditarComponent implements OnInit {
  ra = '';
  nome = '';
  disciplinas: Disciplina[] = [];
  carregando = true;
  salvando = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ra = this.route.snapshot.paramMap.get('ra')!;
    this.alunoService.obterPorRa(this.ra).subscribe({
      next: (aluno: Aluno) => {
        this.nome = aluno.nome;
        this.disciplinas = aluno.disciplinas.map(d => ({ ...d }));
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar aluno.';
        this.tipoMensagem = 'erro';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  adicionarDisciplina(): void {
    this.disciplinas.push({ codigo: '', nome: '', professor: '' });
  }

  removerDisciplina(index: number): void {
    this.disciplinas.splice(index, 1);
  }

  salvar(): void {
    this.salvando = true;
    this.mensagem = '';

    const dados: Partial<Aluno> = {
      nome: this.nome,
      disciplinas: this.disciplinas
    };

    this.alunoService.atualizar(this.ra, dados).subscribe({
      next: () => {
        this.mensagem = 'Aluno atualizado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.salvando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensagem = err.error?.message || 'Erro ao atualizar aluno.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
        this.cdr.detectChanges();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/alunos', this.ra]);
  }
}
