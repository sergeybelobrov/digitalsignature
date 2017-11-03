import * as React from 'react';
import {MobxRouter, startRouter} from 'mobx-router';
import routerStore from './stores/router'
import {Provider} from 'mobx-react';
import {DocumentEditor, TemplateEditor} from "./components/editor";
import {LoginForm} from "./components/login-form";
import {Home} from "./components/home";
import {views} from "./stores/views";
import {WindowStore} from "./stores/window-store";

const store = {
    app: {
        title: 'Digital Signature',
    },
    //here's how we can plug the routerStore into our store
    router: routerStore
}; 

views.editTemplate.component = <TemplateEditor/>;
views.home.component = <Home/>;
views.documentEditor.component = <DocumentEditor/>;
views.loginForm.component = <LoginForm/>;


startRouter(views, store);

export const routes = (
    <Provider store={store}>
      <MobxRouter/>
    </Provider>
)

window.addEventListener("resize", ()=>{
    WindowStore.calculateSize();
});