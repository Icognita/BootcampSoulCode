export interface Resposta{  
    texto: string,
    arquivoResposta: string,
    nome: string,
    uid: string,
    turma: string,
    imageUri: string, 
    dataHora: number, 
    desafioKey: string, 
    pontuacao: number,
    nota: number,  
    key?: string
}