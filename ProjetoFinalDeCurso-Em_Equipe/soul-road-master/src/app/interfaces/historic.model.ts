import { formatDate } from "@angular/common"

export class Historic {
    public date: number = Date.now()
    public points: number
    constructor(points: number) {
        this.points = points
    }
}