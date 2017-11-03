import * as React from 'react';
import {
    Button,
    Card,
    CardTitle,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    CardText,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavDropdown
} from 'reactstrap';

import classnames = require("classnames");
import {UploadModal} from "./upload-modal";
import {UploadModalStore} from "../stores/uploadModal";
import {observer} from 'mobx-react';

@observer
export class Home extends React.Component<{}, { activeTab: string }> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab: string) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return ( <div>
            <UploadModal/>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: this.state.activeTab === '1'})}
                        onClick={() => {
                            this.toggle('1');
                        }}>
                        Templates
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: this.state.activeTab === '2'})}
                        onClick={() => {
                            this.toggle('2');
                        }}>
                        Documents
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Nav pills>
                            <NavItem>
                                <NavLink href="#" onClick={()=>{UploadModalStore.activate("Template")}}>Upload file</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="#">Link</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Another Link</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink disabled href="#">Disabled Link</NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Nav pills>
                            <NavItem>
                                <NavLink href="#" onClick={()=>{UploadModalStore.activate("Document")}}>Upload file</NavLink>
                            </NavItem>
    
                            <NavItem>
                                <NavLink href="#">Link</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Another Link</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink disabled href="#">Disabled Link</NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                </TabPane>
            </TabContent>
        </div>)
    }
}