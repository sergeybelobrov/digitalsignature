import {Route} from 'mobx-router';
import {EditTemplateStore} from "./edit-template-store";
import RouterStore from "./router";

export const views = {
    index: new Route({
        path: '/',
        beforeEnter: (route: any, params: any, store: any, queryParams: any) => {

        }
    }),
    editTemplate: new Route({
        path: '/template/:template_id',
        onEnter: (route: any, params: {template_id: string}, store: any, queryParams: any) => {
            //load edit template store
            let userToken: string = localStorage.getItem("usertoken");
            console.log("saved userToken",userToken);
            if(userToken)
                EditTemplateStore.setTemplate(parseInt(params.template_id));
            else
                RouterStore.goTo(views.loginForm);
        }
    }),
    home: new Route({
        path: '/home',
        onEnter: (route: any, params: any, store: any, queryParams: any) => {

        }
    }),
    documentEditor: new Route({
        path: '/document',
        onEnter: (route: any, params: any, store: any, queryParams: any) => {
            let userToken: string = localStorage.getItem("usertoken");
            console.log(userToken);
            if(!userToken)    RouterStore.goTo(views.loginForm);
        }
    }),
    loginForm: new Route({
        path: '/login',
        onEnter: (route: any, params: any, store: any, queryParams: any) => {

        }
    }),
};
