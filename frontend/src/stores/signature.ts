import {observable} from 'mobx';

export class Signature {
    @observable left: number;
    @observable top: number;
    @observable pageID: string;
    @observable partyID: string;
    @observable partyemail: string;
    constructor(left: number, top: number) {
        this.left = left;
        this.top = top;
        this.pageID = "";
        this.partyID = "";
    }
}