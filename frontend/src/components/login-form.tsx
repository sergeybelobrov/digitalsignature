import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from 'reactstrap';
import {observer} from 'mobx-react';
import {loginFormStore} from "../stores/loginForm";

let styles = require('./login-form.scss');

@observer
export class LoginForm extends React.Component<{}, {}> {
    form: any;
    username: any;
    password: any;
    render(){
        return (
            <form className="form" ref={(form:any)=>{this.form = form}}>
                <FormGroup className={styles.wellStyles}>
                    <Label>Sign In</Label>
                    <Input type="text" bsSize = 'large' name="username" onChange={(e : any)=>{this.username = e.target.value;}} placeholder="enter your username"/>
                    <Input type="password" bsSize = 'large' name="password" onChange={(e : any)=>{this.password = e.target.value;}} placeholder="enter your password"/>
                    <Button color="primary" onClick={()=>{loginFormStore.login(this.username, this.password)}}>{"Login"}</Button>{' '}
                </FormGroup>
            </form>
        )
    }
}