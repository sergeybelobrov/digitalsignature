import * as React from 'react';
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
import {ModalState, AddPartyModalStore} from "../stores/addpartyModal";

@observer
export  class AddPartyModal extends React.Component<{},{}>{
    email: any;
    render(){
        let warning = null;

        if(AddPartyModalStore.State == ModalState.Error) {
            warning =  <Alert color="danger">{AddPartyModalStore.Error}</Alert>;
        }
        return (
            <div>
                <Modal isOpen={AddPartyModalStore.isOpen}
                       toggle={()=>{AddPartyModalStore.close()}}>
                    <ModalHeader
                        toggle={()=>{AddPartyModalStore.close()}}>Add Party</ModalHeader>
                    <ModalBody>
                        {warning}
                        <form className="form">
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email" onChange={(e : any)=>{this.email = e.target.value;}}/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>{AddPartyModalStore.add(this.email)}}>{"Add"}</Button>{' '}
                        <Button color="danger" onClick={()=>{AddPartyModalStore.close()}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}
