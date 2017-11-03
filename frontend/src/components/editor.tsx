import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Col, Container, Nav, Navbar, NavbarBrand, Row, ListGroup, ListGroupItem,Dropdown,DropdownToggle,DropdownMenu, DropdownItem} from 'reactstrap';
import {ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragDropContext, DragLayerMonitor, DragSource, DropTarget} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {EditTemplateStore,PageObservable, AbstractPartyObservable} from "../stores/edit-template-store";
import {Signature} from '../stores/signature';
import {WindowStore} from "../stores/window-store";
import {SignatureBox} from "./signature-box";
import * as ReactDOM from 'react-dom';

import {AddPartyModal} from "./addparty-modal";
import {AddPartyModalStore} from "../stores/addpartyModal";

let styles = require('./editor.scss');


const Types = {
    PDF: 'pdf'
};

let activeSignature:Signature = new Signature(0,0);

const  pageTarget: any = {};
pageTarget.drop = function (props: any, monitor: any, component: any) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const delta2 = monitor.getInitialSourceClientOffset();
    const boundingrect = ReactDOM.findDOMNode(component).getBoundingClientRect();
  
    const left = Math.round(delta.x - boundingrect.left + delta2.x);
    const top = Math.round(delta.y - boundingrect.top + delta2.y);
    component.props.page.signs.push(new Signature(left,top));
};

declare type CallbackFunction = (sign:Signature) => void;
interface IPageComponentProps {
    connectDropTarget?: ConnectDropTarget;
    imgSrc?: string;
    page?: PageObservable;
    parent?:any;
}


@observer
class PageComponent extends React.Component<IPageComponentProps, any> {
    constructor(){
        super();
    }
    render() {
        const {connectDropTarget,parent} = this.props;
        return connectDropTarget(<div className={styles.imgWrap}>
            <img src={this.props.imgSrc}/>
            <div>
                {this.props.page.signs.map((sign:Signature) => {
                    return (
                        <div style={{ left: sign.left, top:sign.top, position:'absolute'}}>
                           <SignatureBox 
                                onChangePartyCallback = {
                                        ()=>{
                                            activeSignature = sign;
                                            parent.forceUpdate();
                                        }
                                    } 
                                onRemoveSignatureCallback = { () =>{}}/>
                        </div>
                    )
                })}
            </div>
        </div>)
    }
}

let Page = DropTarget<IPageComponentProps>(Types.PDF, pageTarget, connect => ({connectDropTarget: connect.dropTarget(),}))(PageComponent);

const boxSource = {
    beginDrag(props: any) {
        const {id, title, left, top} = props;
        return {id, title, left, top}
    },

    endDrag(props: any, monitor: any) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
    },
}

interface IToolBoxButtonProps {
    isDragging: boolean,
    connectDragSource: ConnectDragSource,
}


class ToolBoxButtonComponent extends React.Component<IToolBoxButtonProps, {}> {

    render() {
        const {connectDragSource} = this.props;

        return <div>
            {connectDragSource(
                <li style={{position: "absolute"}} className={"list-group-item"}>{this.props.children}</li>
            )}
        </div>
    }
}

let ToolBoxButton = DragSource(Types.PDF, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(ToolBoxButtonComponent);

@observer
class DocumentEditorComponent extends React.Component<{}, {}> {
    render() {
        return (<Container>
            <Row>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <strong>Toolbox</strong>
                    </Row>
                    <Row>
                            <ToolBoxButton>Signature Field</ToolBoxButton>
                    </Row>
                </Col>
                <Col>

                </Col>
                <Col>.col</Col>
            </Row>
        </Container>)
    }
}


export let DocumentEditor = DragDropContext(HTML5Backend)(DocumentEditorComponent);


interface MainState {
    toSelectSign?: Signature;
}

@observer
class TemplateEditorComponent extends React.Component<{}, MainState> {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <AddPartyModal/>
                <Navbar color="faded" dark>
                    <Nav className="justify-content-between">
                        <NavbarBrand>{EditTemplateStore.name}</NavbarBrand>
                        <form className="form-inline">
                            <Button className="mr-sm-2" color="success" outline style={{cursor: "pointer"}}><i className="fa fa-home"></i></Button>{' '}
                            <Button color="success" onClick={()=>{EditTemplateStore.sendSigns()}} outline style={{cursor: "pointer"}}>Send</Button>{' '}
                        </form>
                    </Nav>
                </Navbar>
                <Container fluid={true}>


                    <Row className={styles.editBody}>
                        <Col xs="2">
                            <Row>
                                <strong>Toolbox</strong>
                            </Row>
                            <Row>
                                <li className="list-group">
                                    <ToolBoxButton>Signature Field</ToolBoxButton>
                                </li>
                            </Row>
                        </Col>
                        <Col xs="8">
                            <div className={styles.pages} style={{maxHeight: WindowStore.height - 54}}>
                                {EditTemplateStore.pdf.pages.map((page) => {
                                    return <Page 
                                        key={page.id} 
                                        imgSrc={page.datafile} 
                                        parent={this} 
                                        page={page}></Page>
                                })}
                            </div>
                        </Col>
                        <Col xs="2">
                            <Row><Button onClick={()=>{AddPartyModalStore.activate()}}>Add Party</Button></Row>
                            <Row>
                                <ListGroup>
                                {EditTemplateStore.pdf.pages.map((page) => {
                                    return (
                                        <div>
                                            {
                                                page.signs.map((sign:Signature) => {
                                                    return (
                                                        <select 
                                                            style = { {display: activeSignature != sign?"none" : "block"}}
                                                            defaultValue={sign.partyemail||"None"} 
                                                            onChange={(e:any)=>{sign.partyemail = e.target.value;}}>
                                                               <option value="None">None</option>
                                                               {
                                                                EditTemplateStore.abstractParty.map((party:AbstractPartyObservable) => {
                                                                    return (
                                                                        <option value={party.email} >
                                                                            {party.email}
                                                                        </option>
                                                                    )
                                                                })
                                                              }
                                                        </select>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })}
                                </ListGroup>
                            </Row>
                        </Col>

                    </Row>
                </Container>
            </div>)
    }
}


export let TemplateEditor = DragDropContext(HTML5Backend)(TemplateEditorComponent);

