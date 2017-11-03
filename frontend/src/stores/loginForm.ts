import {action, observable} from 'mobx';
import {ApitokenauthApi} from "../api/api";
import RouterStore from "./router"
import {views} from "./views";
const ApiTokenAuth: ApitokenauthApi = new ApitokenauthApi();

class loginFormObservable {
    @observable Error: string;

    constructor() {

    }


    @action
    login(username: any, password: any) {
        console.log(username.value);
        console.log(password.value);
        ApiTokenAuth.apiTokenAuthCreate({
            "data": { 
                "username":username,
                 "password":password
                }
        }).then((response: Response) => {

            response.json().then(((value: {token:string}) => {
                //go to the home after login
                localStorage.setItem("usertoken", value.token);
                RouterStore.goTo(views.home);
            }))

        }).catch((response: Response) => {
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


export let loginFormStore = new loginFormObservable();