import {action, computed, observable, ObservableMap, map} from 'mobx';
import {Party} from "./party";
import {Signature} from "./signature";

export class Page {
    @observable parentDocument: Document;
    @observable ID: string;
    @observable ImageSrc: string;

    @computed
    signatures(): Signature[] {
        let result: Signature[] = [];
        this.parentDocument.Signatures.forEach((signature, id) => {
            if (signature.pageID == this.ID) {
                result.push(signature);
            }
        });
        return result
    }
}

export class Document {
    @observable Pages: ObservableMap<Page>;
    @observable Signatures: ObservableMap<Signature>;
    @observable Parties: ObservableMap<Party>;
    @observable Completed: boolean;
    @observable Draft: boolean;
    @observable Shared: boolean;
    @observable PartiallySigned: boolean;
    @observable Executed: boolean;
    @observable Cancelled: boolean;
    @observable Tags: string[];

    constructor() {
        this.Pages = map({});
        this.Signatures = map({});
        this.Parties = map({});
    }

    @action
    moveSignature(signatureID: string, toPage: string, left: number, top: number) {
        //check if signature exist in other case do nothing
        if (this.Signatures.has(signatureID)) {
            let signature = this.Signatures.get(signatureID);
            //check if destination page exist
            if (this.Pages.has(toPage)) {
                signature.left = left;
                signature.top = top;
                signature.pageID = toPage;
            }
        }
    }

    @action
    deleteSignature(signatureID: string) {
        //check if signature exist in other case do nothing
        if (this.Signatures.has(signatureID)) {
            this.Signatures.delete(signatureID);
        }
    }

    @action
    changeSignatureParty(signatureID: string, partyId: string) {
        if (this.Signatures.has(signatureID)) {
            let signature = this.Signatures.get(signatureID);
            //check if destination page exist
            if (this.Parties.has(partyId)) {
                signature.partyID = partyId;
            }
        }

    }
}
