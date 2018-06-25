import $ from 'jquery';
import getMobilePath from '../cores/get-mobile-path';

const getIsWrote = (productCd) =>
    new Promise((resolve) => {
        $.api.get({
            url: getMobilePath({url: `/mobile/scan/products/${productCd}/reviews/check.do`}),
            successCallback: function (data) {
                resolve(data);
            }
        });
    });

export default getIsWrote;