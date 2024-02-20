export class Quiz {
    public id?: number
    public question: string
    public options: Option[]

    constructor(id: number, question: string, options?: Option[]) {

        this.id = id
        this.question = question
        this.options = options
    }


}

export class Option {

    public text: string
    public isAnswer: boolean

    constructor(text: string, isAnswer: boolean) {
        this.text = text;
        this.isAnswer = isAnswer;
    }
}