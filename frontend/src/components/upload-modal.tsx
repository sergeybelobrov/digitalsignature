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
import {ModalState, UploadModalStore} from "../stores/uploadModal";

@observer
export  class UploadModal extends React.Component<{},{}>{
    form: any;
    render(){
        let warning = null;

        if(UploadModalStore.State == ModalState.Error) {
            warning =  <Alert color="danger">{UploadModalStore.Error}</Alert>;
        }
        return (
            <div>
                <Modal isOpen={UploadModalStore.isOpen}
                       toggle={()=>{UploadModalStore.close()}}>
                    <ModalHeader
                        toggle={()=>{UploadModalStore.close()}}>Upload PDF</ModalHeader>
                    <ModalBody>
                        {warning}
                        <form className="form" ref={(form:any)=>{this.form = form; }} encType="multipart/form-data">
                            <FormGroup>
                                <Label for="pdfFile">File</Label>
                                <Input type="file" name="datafile" id="pdfFile"/>
                                <FormText color="muted">
                                    Maximum size 10 MB
                                </FormText>
                                <Input type="hidden"  name="upload_for" value={UploadModalStore.uploadFor}/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>{UploadModalStore.upload(this.form)}}>{UploadModalStore.State==ModalState.Error?"Try Again":"Upload"}</Button>{' '}
                        <Button color="danger" onClick={()=>{UploadModalStore.close()}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}
