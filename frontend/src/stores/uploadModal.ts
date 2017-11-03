import {action, observable} from 'mobx';
import {UploadpdfApi} from "../api/api";
import RouterStore from "./router"
import {views} from "./views";
const UploadPDF: UploadpdfApi = new UploadpdfApi();

export  enum ModalState {
    Filling = 1,
    Uploading,
    Error,
}

class UploadModalObservable {
    @observable isOpen: boolean;
    @observable uploadFor: "Document" | "Template";
    @observable State: ModalState;
    @observable Error: string;


    constructor() {
        this.isOpen = false;
        this.uploadFor = "Document";
        this.State = ModalState.Filling;
        this.Error = "";
    }

    @action
    activate(uploadFor: "Document" | "Template") {
        this.State = ModalState.Filling;
        this.isOpen = true;
        this.uploadFor = uploadFor;
    }

    @action
    close() {
        this.State = ModalState.Filling;
        this.isOpen = false;
    }

    @action
    upload(form: any) {
        this.State = ModalState.Uploading;
        let formData: any = new FormData(form);
        let userToken: string = localStorage.getItem("usertoken");
        UploadPDF.uploadPdfCreate({body: formData.fd}).then((response: Response) => {
            this.State = ModalState.Filling;
            response.json().then(((value: { document_id: string, template_id: string }) => {
                if (this.uploadFor == "Document") {

                } else {
                    //go to the template view
                    console.log("goto EditTemplate");
                    RouterStore.goTo(views.editTemplate, {template_id: value.template_id});
                }
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


export let UploadModalStore = new UploadModalObservable();