import {observable, computed} from 'mobx';
import {Signature} from './signature';

export class Page {
    @observable signs : Signature[];
}
