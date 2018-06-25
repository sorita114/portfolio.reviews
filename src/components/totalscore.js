import React, {Component} from 'react';
import Circle from './svg/circle';
import {
    GRADE_BEST,
    GRADE_ETC,
    GRADE_EXCELLENT,
    GRADE_GOOD,
    GRADE_RECOMMENDATION,
    GRADE_USUALLY,
    GRADE_VERY_EXCELLENT,
    GRADE_VERY_GOOD, TITLE_SELLER_RECOMMEND,
    TOTAL_SCORE_DESC
} from '../i18n/i18n-ko';
import setComma from '../cores/set-comma';
import BtnRegistrationReviews from "./buttons/btn-registration-reviews";
import BtnRegistrationExperience from "./buttons/btn-registration-experience";

class TotalScore extends Component {
    constructor (props) {
        super(props);

        this.state = Object.assign({}, props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.reviewsCount !== nextProps.reviewsCount) {
            this.setState({
                reviewsCount: nextProps.reviewsCount
            });
        }
        if(this.state.reviewAvreageGrade !== nextProps.reviewAvreageGrade) {
            this.setState({
                reviewAvreageGrade: nextProps.reviewAvreageGrade
            });
        }

        if(this.state.isBelowGrade !== nextProps.isBelowGrade) {
            this.setState({
                isBelowGrade: nextProps.isBelowGrade
            });
        }
    }

    renderTotalScoreDesc = () => {
        let grade = '';
        const REVIEW_AVREAGE_GRADE = this.state.reviewAvreageGrade;

        if( REVIEW_AVREAGE_GRADE >= 9.6 ) {
            grade = GRADE_RECOMMENDATION;
        } else if(REVIEW_AVREAGE_GRADE <=9.5 && REVIEW_AVREAGE_GRADE >= 9.1) {
            grade = GRADE_BEST;
        } else if(REVIEW_AVREAGE_GRADE <=9.0 && REVIEW_AVREAGE_GRADE >= 8.6) {
            grade = GRADE_VERY_EXCELLENT;
        } else if(REVIEW_AVREAGE_GRADE <= 8.5 && REVIEW_AVREAGE_GRADE >= 8.1) {
            grade = GRADE_EXCELLENT;
        } else if(REVIEW_AVREAGE_GRADE <= 8.0 && REVIEW_AVREAGE_GRADE >= 7.6) {
            grade = GRADE_VERY_GOOD;
        } else if(REVIEW_AVREAGE_GRADE <= 7.5 && REVIEW_AVREAGE_GRADE >= 7.1) {
            grade = GRADE_GOOD;
        } else if(REVIEW_AVREAGE_GRADE <= 7.0 && REVIEW_AVREAGE_GRADE >= 5.0) {
            grade = GRADE_USUALLY;
        } else {
            grade = GRADE_ETC;
        }

        return (
            <p className="total-score-desc">
                <strong className="total-recommend">
                    {grade}
                </strong>
                <br/>
                <span className="total-recommend-desc">
                    {TOTAL_SCORE_DESC(setComma(this.state.reviewsCount))}
                </span>
            </p>
        )
    };

    renderMdRecommend = () => {
        if (this.state.SELLER_RECOMM !== ''
            && this.state.SELLER_RECOMM !== null) {
            return (
                <div className="wrap-md-comment">
                    <h3 className="title">{TITLE_SELLER_RECOMMEND}</h3>
                    <p className="md-comment">
                        {this.state.SELLER_RECOMM}
                    </p>
                </div>
            );
        } else {
            return null;
        }
    };

    renderButtons = () => {
        return (
            <div className="wrap-button">
                <BtnRegistrationReviews receivedlink={this.state.receivedlink}
                                        categoryId={this.state.CategoryID}
                                        productCd={this.state.ProductCD}/>
                <BtnRegistrationExperience receivedlink={this.state.receivedlink}
                                            productCd={this.state.ProductCD}/>
            </div>
        )
    };

    renderTotalScore = () => {
        return (
            <div className="total-score">
                <Circle reviewAvreageGrade={this.state.reviewAvreageGrade}/>
                {this.renderTotalScoreDesc()}
            </div>
        )
    };

    render() {
        if(this.state.reviewsCount > 0 && !this.state.isBelowGrade) {
            return (
                <div className="wrap-total-score">
                    {this.renderTotalScore()}
                    {this.renderMdRecommend()}
                    {this.renderButtons()}
                </div>
            )
        } else {
            return (
                <div className="wrap-total-score">
                    {this.renderMdRecommend()}
                    {this.renderButtons()}
                </div>
            )
        }
    }
}

export default TotalScore;