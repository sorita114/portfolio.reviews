import React, {Component} from 'react';
import {
    BTN_REGISTRATION_EXPERIENCE
} from '../../i18n/i18n-ko';
import isMember from '../../cores/is-member';
import getIsWrote from "../../cores/get-is-wrote";

class BtnRegistrationExperience extends Component {
    constructor (props) {
        super(props);

        this.state = {
            url: `/mobile/popup/scan/products/${props.productCd}/reviews/save.do`,
            isWrote : props.isWrote,
            receivedlink : props.receivedlink
        };
    }

    componentDidMount () {
    }
    
    onClick = (event) => {
        event.preventDefault();

        if(this.state.receivedlink) {
            window.openLoginLayer();
            return;
        }
        let flag = window.global.isLogin(window.location.href);

        if(flag) {
            getIsWrote(this.props.productCd)
                .then((data) => {
                    new Promise((resolve) => {
                        this.setState(data);

                        resolve();
                    }).then(() => {
                        isMember(this.state);
                    });
                });
        }
    };
    
    render () {
        let link = this.state.receivedlink ? this.state.receivedlink : '#';
        return (
            <a href={link}
               onClick={this.onClick}
               className="btn-prod-color8">
                <i className="icon-prod-pencil2"></i>
                {BTN_REGISTRATION_EXPERIENCE}
            </a>
        );
    }
}

export default BtnRegistrationExperience;