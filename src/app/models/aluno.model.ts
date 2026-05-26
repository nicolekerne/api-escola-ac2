export interface Disciplina {
  codigo: string;
  nome: string;
  professor: string;
}

export interface Aluno {
  _id?: string;
  ra: string;
  nome: string;
  disciplinas: Disciplina[];
}
