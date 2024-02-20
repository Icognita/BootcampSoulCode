export interface Post{  
    texto: string,
    imagePost: string,
    nome: string,
    uid: string,
    turma: string,
    imageUri: string,
    curtidas: string[],
    dataHora: number,
    tempo: number,
    key?: string
}