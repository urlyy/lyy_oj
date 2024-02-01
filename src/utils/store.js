import { makeAutoObservable } from "mobx"

class ChangePageTimer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const changePageTimerStore = new ChangePageTimer()

export { changePageTimerStore }