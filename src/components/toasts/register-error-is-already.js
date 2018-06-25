import $ from 'jquery';
import React, {Component} from 'react';
import Pubsub from "pubsub-js";
import {TOAST_REGISTER_IS_ALREADY} from "../../i18n/i18n-ko";

class ToastRegisterErrorIsAlready extends Component {
    constructor() {
        super();

        this.state = {
            active: false
        };
    }

    componentDidMount () {
        let _this = this;
        Pubsub.subscribe('activeToastRegisterIsAlready', () => {
            this.setState({
                active: true
            });
        });

        $('.pop-toast-comment-error').on('animationend webkitAnimationEnd', function() {
            _this.setState({
                active: false
            });
        });
    }

    render () {
        let toastClass = `pop-toast-comment-error ${this.state.active ? 'active' : ''}`;
        return (
            <p className={toastClass}>
                {TOAST_REGISTER_IS_ALREADY}
            </p>
        )
    }
}

export default ToastRegisterErrorIsAlready;