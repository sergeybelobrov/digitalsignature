import {action, observable} from 'mobx';

class WindowObservable {
    @observable width: number;
    @observable height: number;

    constructor() {
        this.calculateSize()
    }

    @action
    calculateSize() {
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
}

export  let WindowStore = new WindowObservable();