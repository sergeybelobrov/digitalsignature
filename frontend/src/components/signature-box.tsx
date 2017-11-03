import * as React from 'react';
import {observer} from 'mobx-react';
import Resizable from 're-resizable';

let styles = require('./signature-box.scss');

declare type CallbackFunction = () => void;

interface SignatureBoxProps {
    onChangePartyCallback: CallbackFunction,
    onRemoveSignatureCallback: CallbackFunction,
}

@observer
export class SignatureBox extends React.Component<SignatureBoxProps, any> {
    render() {
        return <table>
            <tr>
                <td onClick={this.props.onChangePartyCallback}>
                    <Resizable defaultSize={{width: 200, height: 32}}>
                        <div className={styles.signature}></div>
                    </Resizable>
                </td>
                <td onClick={this.props.onRemoveSignatureCallback}>
                    <i style={{color: "#c62828"}}
                            className={"fa fa-times-circle"}></i>
                </td>
            </tr>
        </table>
    }

}