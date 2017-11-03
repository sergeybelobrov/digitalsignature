import {action, observable} from 'mobx';
import {PartyApi} from "../api/api";
import RouterStore from "./router"
import {views} from "./views";
import {EditTemplateStore, AbstractPartyObservable} from "./edit-template-store";

const AddParty: PartyApi = new PartyApi();

export  enum ModalState {
    Filling = 1,
    Adding,
    Error,
}

class AddPartyModalObservable {
    @observable isOpen: boolean;
    @observable State: ModalState;
    @observable Error: string;


    constructor() {
        this.isOpen = false;
        this.State = ModalState.Filling;
        this.Error = "";
    }

    @action
    activate() {
        this.State = ModalState.Filling;
        this.isOpen = true;
    }

    @action
    close() {
        this.State = ModalState.Filling;
        this.isOpen = false;
    }

    @action
    add(email:any) {
        this.State = ModalState.Adding;
        
        AddParty.partyCreate({  
            "data": { 
                 "email":email,
                 "document":  "1",
                 "user": "1"
            }
        }).then((response: Response) => {
            this.State = ModalState.Filling;
            response.json().then(((value: AbstractPartyObservable) => {
                    //close Modal
                    console.log(value);
                    console.log("close Modal");
                    EditTemplateStore.abstractParty.push(new AbstractPartyObservable(value));
                    
                    this.close();
            }))

        }).catch((response: Response) => {
            this.State = ModalState.Error;
            response.json().then((value: { detail: any }) => {
                if ((!value) || (!value.detail)) {
                    return
                }
                if (typeof value.detail === 'string') {
                    this.Error = value.detail
                } else {
                    this.Error = value.detail.datafile;
                }
            })
        })
    }
}


export let AddPartyModalStore = new AddPartyModalObservable();