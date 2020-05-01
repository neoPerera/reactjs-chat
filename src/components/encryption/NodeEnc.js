import React,
{
    Component

} from 'react'
import NodeRSA from 'node-rsa';






class NodeEnc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: new NodeRSA({ b: 512 }),
            privateKey: null,
            publicKey: null,
            priK: null,
            pucK: null,
            plainT: '',
            decT: '',
            encT: '',

        };



    }
    componentDidMount() {

        this.setState({
            priK: this.state.key.exportKey('private'),
            pucK: this.state.key.exportKey('public'),
            privateKey: new NodeRSA(this.state.key.exportKey('private')),
            publicKey: new NodeRSA(this.state.key.exportKey('public')),

        });
        // this.setState({
        //     privateKey: this.state.privateKey.importKey(this.state.priK, 'private'),
        //     // publicKey: new NodeRSA(this.state.pucK),
        // });

    }
    textChanged = (e) => {
        this.setState({
            plainT: e.target.value,

        });

        // this.setState({

        // });
    }
    enc = () => {
        this.setState({
            encT: this.state.publicKey.encrypt(this.state.plainT, 'base64'),


        })
        // this.setState({
        //     decT: this.state.publicKey.decrypt(this.state.encT)
        // });
    }

    dec = () => {
        // this.setState({
        //     encT: this.state.privateKey.encrypt(this.state.plainT),


        // })
        this.setState({
            decT: this.state.privateKey.decrypt(this.state.encT, 'utf8')
        });
    }
    render() {


        return (
            <div>

                <p>
                    <input type='text' onChange={this.textChanged} />
                    <button onClick={this.enc}>enc</button>
                    <button onClick={this.dec}>dec</button>
                    <bt />
                    <p>plain:: {this.state.decT}</p>
                    <p>cypher::  {this.state.encT}</p>

                    <p>
                        {this.state.priK}
                    </p>
                    <p>
                        {this.state.pucK}
                    </p>
                </p>

            </div>);
    }
}
export default NodeEnc;