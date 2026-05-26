import { Routes } from '@angular/router';
import { AlunoListaComponent } from './components/aluno-lista/aluno-lista.component';
import { AlunoDetalheComponent } from './components/aluno-detalhe/aluno-detalhe.component';
import { AlunoDisciplinasComponent } from './components/aluno-disciplinas/aluno-disciplinas.component';
import { AlunoEditarComponent } from './components/aluno-editar/aluno-editar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunoListaComponent },
  { path: 'alunos/:ra/disciplinas', component: AlunoDisciplinasComponent },
  { path: 'alunos/:ra/editar', component: AlunoEditarComponent },
  { path: 'alunos/:ra', component: AlunoDetalheComponent },
  { path: '**', redirectTo: '/alunos' }
];
