import {action, observable} from 'mobx';
import {AbstractPartyApi, AbstractSignatureApi, PageApi, PdfApi, TemplateApi} from "../api/api";
import {Signature} from './signature';

const Templates: TemplateApi = new TemplateApi();
const AbstractParties: AbstractPartyApi = new AbstractPartyApi();
const AbstractSignatures: AbstractSignatureApi = new AbstractSignatureApi();
const Pdfs: PdfApi = new PdfApi();
const Pages: PageApi = new PageApi();

type ID = number;

function catchError(obj: { error: string }) {
    return (response: Response) => {
        response.json().then((value: { detail: string }) => {
            if (!response.json) {
                console.log(response)
            } else {
                console.log(value.detail)
                // response.json().then((value: { detail: string }) => {
                //     obj.error = value.detail
                // })
            }
        })
    }
}

export class PageObservable {
    @observable number: number;
    @observable id: ID;
    @observable datafile: string;
    @observable parentPdf: ID;
    @observable signs: Signature[];

    constructor(number: number, id: ID, datafile: string, parentPdf: ID) {
        this.number = number;
        this.id = id;
        this.datafile = datafile;
        this.parentPdf = parentPdf;
        this.signs = [];
    }
}

class PFDObservable {
    @observable id: ID;
    @observable error: string;
    @observable pageWidth: number;
    @observable pageHeight: number;
    @observable pages: PageObservable[];

    constructor() {
        this.id = 0;
        this.pageWidth = 1200;
        this.pageHeight = 1600;
        this.error = "";
        this.pages = observable([])
    }


    @action
    setPDF(id: number) {
        Pdfs.pdfRead({id: id}).then((pdf) => {
            console.log(pdf, "this is the pdf")
            this.pageWidth = pdf.pageWidth;
            this.pageHeight = pdf.pageHeight;
            //load all the pages
            this.pages = observable([]);
            Pages.pageList({parentPdf: id.toString()}).then((pages) => {
                    let truePages: any = pages || pages.results;
                    truePages.map((page: any) => {
                        this.pages.push(new PageObservable(page.number, page.id, page.datafile, parseInt(page.parentPdf)))
                    })
                }
            ).catch(catchError(this))
        }).catch(catchError(this))
    }

}

export class AbstractPartyObservable {
    @observable id: string;
    @observable email: string;
    @observable document: string;
    @observable user: string;
    constructor(obj:AbstractPartyObservable){
        this.id= obj.id;
        this.email= obj.email;
        this.document= obj.document;
        this.user= obj.user;
    }
}


export class EditTemplateObservable {
    @observable id: ID;
    @observable ownerId: ID;
    @observable createdAt: string;
    @observable error: string;
    @observable pdf: PFDObservable;
    @observable name: string;
    @observable abstractParty: AbstractPartyObservable[];


    constructor() {
        this.id = 0;
        this.ownerId = 0;
        this.createdAt = "";
        this.pdf = new PFDObservable();
        this.name = "";
        this.abstractParty = observable([])
    }

    @action
    addAbstractParty() {
        AbstractParties.abstractPartyCreate({data: {number: 0, template: this.id.toString()}}).then(()=>{

        }).catch(catchError(this))
    }

    @action
    setTemplate(id: number) {
        Templates.templateRead({id: id})
        .then((template) => {
            this.createdAt = template.createdAt;
            this.ownerId = parseInt(template.owner);
            this.pdf.setPDF(parseInt(template.pdf));
            this.name = template.name;

        }).catch(catchError(this))
    }
    @action
    sendSigns(){
        let allsigns: Signature[]= [];
        this.pdf.pages.map((page) => {
            allsigns = allsigns.concat(page.signs);
        });
        allsigns.forEach((element:Signature)=>{

        });
    }

}


export let EditTemplateStore = new EditTemplateObservable();