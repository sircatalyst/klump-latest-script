var styles = `
.klump__div {
	padding: 0.5rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
	border-width: 1px;
	border-radius: 0.5rem;
	border-opacity: 1;
	border-color: rgba(156,163,175,1);
	display: block;
	cursor:pointer;
}
.klump__p {
	font-weight: 800;
	margin: 0;
}
.klump__center {
	text-align: center;
	padding-top: 1rem;
	padding-bottom: 1rem;
}
.klump__span {
	line-height: 1rem;
	font-weight: 400;
	padding-left: 0.5rem;

}
.klump__underline {
	text-decoration: underline;
}
.klump__anchor: {
	cursor: pointer !important;
}
`;
// const base_checkout_url = 'https://checkout-deployed-test.netlify.app';
const base_checkout_url = 'https://lucid-darwin-122d30.netlify.app';
var styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Klump AD
var klumpAd = document.getElementById('klump__ad');

klumpAd.className = 'klump__div';

var klumpP = document.createElement('p');
klumpP.className = 'klump__p';
klumpP.innerHTML = 'KLUMP';

var klumpSpan = document.createElement('span');
klumpSpan.className = 'klump__span';
klumpSpan.innerHTML = '4 interest-free payments of &#8358;10.00. ';

var klumpAnchor = document.createElement('a');
klumpAnchor.setAttribute('href', 'https://www.google.com/');
klumpAnchor.className = 'klump__underline';

var klumpLink = document.createTextNode('Learn More');
klumpLink.className = 'klump__anchor';

klumpAnchor.appendChild(klumpLink);
klumpSpan.appendChild(klumpAnchor);
klumpP.appendChild(klumpSpan);
klumpAd.appendChild(klumpP);

var klumpPayPara = document.createElement('p');
klumpPayPara.className = 'klump__p';
klumpPayPara.innerHTML = 'KLUMP';

var klumpPay = document.createElement('span');
klumpPay.className = 'klump__span pay';
klumpPay.innerHTML = 'Pay in 4';

// Klump Checkout
var klumpCheckout = document.getElementById('klump__checkout');
klumpCheckout.className = 'klump__div klump__center';
klumpCheckout.id = 'iFrame';

klumpPayPara.appendChild(klumpPay);
klumpCheckout.appendChild(klumpPayPara);

document.getElementById('iFrame').addEventListener('click', function () {
    var klumpInstance = new KlumpPopUp('123', result);
    klumpInstance.payWithKlump();
});

// klumpCalc function
function klumpCalculate(params = 0) {
    return params !== 0 ? params / 4 : 0;
}

var klumpValue = klumpCalculate(100);

// Klump Calculate
var klumpCalc = document.getElementById('klump__calc');

klumpCalc.className = 'klump__div';

var klumpP = document.createElement('p');
klumpP.className = 'klump__p';
klumpP.innerHTML = 'KLUMP';

var klumpSpan = document.createElement('span');
klumpSpan.className = 'klump__span';

//to remove later
var result = 1000;
klumpSpan.innerHTML = `4 interest-free payments of &#8358;${1000}. `;
document.getElementById('amount').addEventListener('change', function () {
    result = this.value === 'undefined' ? 0 : this.value / 4;
    klumpSpan.innerHTML = `4 interest-free payments of &#8358;${result}. `;

    var klumpAnchor = document.createElement('a');
    klumpAnchor.setAttribute('href', 'https://www.google.com/');
    klumpAnchor.className = 'klump__underline';

    var klumpLink = document.createTextNode('Learn More');
    klumpLink.className = 'klump__anchor';

    klumpAnchor.appendChild(klumpLink);
    klumpSpan.appendChild(klumpAnchor);
    klumpP.appendChild(klumpSpan);
    klumpCalc.appendChild(klumpP);
});
//body

const body = document.getElementsByTagName('body')[0];

var klumpAnchor = document.createElement('a');
klumpAnchor.setAttribute('href', 'https://www.google.com/');
klumpAnchor.className = 'klump__underline';

var klumpLink = document.createTextNode('Learn More');
klumpLink.className = 'klump__anchor';

klumpAnchor.appendChild(klumpLink);
klumpSpan.appendChild(klumpAnchor);
klumpP.appendChild(klumpSpan);
klumpCalc.appendChild(klumpP);

class KlumpPopUp {
    key = '123';
    static checkout = null;
    static otp_code = '123456';
    static phone_number = null;
    static first_name = null;
    static last_name = null;
    static email = null;
    constructor(public_key, amount) {
        this.flag = this.key === public_key ? true : false;
        this.amount = amount;
    }
    payWithKlump() {
        if (this.flag) {
            /*
             * Pay in 4 Demo
             */
            const background = document.createElement('iframe');
            background.setAttribute('id', 'background');
            background.setAttribute('src', base_checkout_url);
            background.style.cssText =
                '\nborder: 0px none transparent;\nbackground: rgba(0,0,0,0.75);\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';
            body.appendChild(background);
            const iFrame = document.createElement('iframe');
            // iFrame.setAttribute(
            //     'src',
            //     'https://checkout-deployed-test.netlify.app/checkout/pay-in-4/index.html'
            // );
            iFrame.setAttribute(
                'src',
                'https://lucid-darwin-122d30.netlify.app'
            );
            iFrame.setAttribute('id', 'checkout');
            iFrame.style.cssText =
                '\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';
            iFrame.onload = function () {
                iFrame.contentWindow.postMessage(
                    JSON.stringify({
                        data: 'data',
                    }),
                    base_checkout_url
                );
            };
            body.appendChild(iFrame);
        }
    }
    static checkoutUrl(checkOutId) {
        return base_checkout_url + '/checkout/' + checkOutId + '/index.html';
    }
}

window.addEventListener('message', (event) => {
    const background = document.getElementById('background');
    if (event.origin === base_checkout_url) {
        const checkOutData = JSON.parse(event.data);
        if (
            'closeCheckoutId' in checkOutData &&
            'openCheckoutId' in checkOutData &&
            !('code' in checkOutData) &&
            !('phoneNumber' in checkOutData) &&
            !('email' in checkOutData) &&
            !('userBio' in checkOutData)
        ) {
            /*
             * Verify user Demo
             * User phone number is captured
             * in this process
             */

            const frame = document.getElementById(checkOutData.closeCheckoutId);
            frame.parentNode.removeChild(frame);
            const iFrame = document.createElement('iframe');
            iFrame.setAttribute(
                'src',
                KlumpPopUp.checkoutUrl(checkOutData.openCheckoutId)
            );
            iFrame.setAttribute('id', checkOutData.openCheckoutId);
            iFrame.style.cssText =
                '\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';
            body.appendChild(iFrame);
        }
        if (
            'closeCheckoutId' in checkOutData &&
            'openCheckoutId' in checkOutData &&
            'phoneNumber' in checkOutData &&
            !('code' in checkOutData) &&
            !('email' in checkOutData) &&
            !('userBio' in checkOutData)
        ) {
            /*
             * Enter the code Demo
             * Store user phone number
             * User phone number is verified
             * using the otp
             */
            KlumpPopUp.phone_number = checkOutData.phoneNumber;
            const frame = document.getElementById(checkOutData.closeCheckoutId);
            frame.parentNode.removeChild(frame);
            const iFrame = document.createElement('iframe');
            iFrame.setAttribute(
                'src',
                KlumpPopUp.checkoutUrl(checkOutData.openCheckoutId)
            );
            iFrame.setAttribute('id', checkOutData.openCheckoutId);
            iFrame.style.cssText =
                '\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';

            body.appendChild(iFrame);
            iFrame.onload = () => {
                iFrame.contentWindow.postMessage(
                    JSON.stringify({
                        variable: 'phone_number',
                        phoneNumber: checkOutData.phoneNumber,
                    }),
                    '*'
                );
            };
        }
        if (
            'closeCheckoutId' in checkOutData &&
            'openCheckoutId' in checkOutData &&
            'code' in checkOutData &&
            KlumpPopUp.phone_number != null &&
            !('email' in checkOutData) &&
            !('userBio' in checkOutData)
        ) {
            /*
             * Check if the otp-code is valid
             */
            if (checkOutData.code === KlumpPopUp.otp_code) {
                const frame = document.getElementById(
                    checkOutData.closeCheckoutId
                );
                frame.parentNode.removeChild(frame);
                const iFrame = document.createElement('iframe');
                iFrame.setAttribute(
                    'src',
                    KlumpPopUp.checkoutUrl(checkOutData.openCheckoutId)
                );
                iFrame.setAttribute('id', checkOutData.openCheckoutId);
                iFrame.style.cssText =
                    '\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';

                body.appendChild(iFrame);
            } else {
                console.log('Invalid otp code');
            }
        }
        if (
            'closeCheckoutId' in checkOutData &&
            'openCheckoutId' in checkOutData &&
            KlumpPopUp.phone_number != null &&
            'email' in checkOutData &&
            !('code' in checkOutData) &&
            !('userBio' in checkOutData)
        ) {
            const frame = document.getElementById(checkOutData.closeCheckoutId);
            frame.parentNode.removeChild(frame);
            const iFrame = document.createElement('iframe');
            KlumpPopUp.email = checkOutData.email;
            iFrame.setAttribute(
                'src',
                KlumpPopUp.checkoutUrl(checkOutData.openCheckoutId)
            );
            iFrame.setAttribute('id', checkOutData.openCheckoutId);
            iFrame.style.cssText =
                '\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';

            body.appendChild(iFrame);
        }
        if (
            'closeCheckoutId' in checkOutData &&
            'openCheckoutId' in checkOutData &&
            KlumpPopUp.phone_number != null &&
            !('code' in checkOutData) &&
            !('email' in checkOutData) &&
            'userBio' in checkOutData
        ) {
            const frame = document.getElementById(checkOutData.closeCheckoutId);
            frame.parentNode.removeChild(frame);
            const iFrame = document.createElement('iframe');
            iFrame.setAttribute(
                'src',
                KlumpPopUp.checkoutUrl(checkOutData.openCheckoutId)
            );
            iFrame.setAttribute('id', checkOutData.openCheckoutId);
            iFrame.style.cssText =
                '\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none; position: fixed;\nleft: 0;\ntop: 0;\nwidth: 100%;\nheight: 100%;)';

            body.appendChild(iFrame);
            iFrame.onload = () => {
                iFrame.contentWindow.postMessage(
                    JSON.stringify({
                        user: checkOutData.userBio,
                        email: KlumpPopUp.email,
                    }),
                    '*'
                );
            };
        }
        if (
            'closeCheckoutId' in checkOutData &&
            !('openCheckoutId' in checkOutData) &&
            !('phoneNumber' in checkOutData) &&
            !('email' in checkOutData) &&
            !('userBio' in checkOutData) &&
            !('code' in checkOutData)
        ) {
            /*
             * close checkoutForm
             */
            const frame = document.getElementById(checkOutData.closeCheckoutId);
            frame.parentNode.removeChild(frame);
            background.parentNode.removeChild(background);
        }
    }
});