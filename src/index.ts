import './reset.css';
import './style.css';
import gsap from "gsap";
import Icon from './images/icon-complete.svg';

class PaymentInfo {
    name: string = "";
    ccn: string = "";
    expMo: string = "";
    expYr: string = "";
    cvc: string = "";

    updateVal = (e: any): void => {
        e.preventDefault();
        let inType: string = e.target.id;
        let inVal: string = e.target.value;
        
        switch(inType) {
            case "name-in":
                //set variable
                this.name = inVal;
                //Update display element
                if (inVal.length < 1) {
                    document.getElementById("card-name").innerText = "JANE APPLESEED";
                } else {
                    document.getElementById("card-name").innerText = inVal.toUpperCase();
                }
              break;
            case "ccn-in":
                let ccnNew = inVal.replace(/\s/g, '');
                this.ccn = this.formatNum(ccnNew);
                if (ccnNew.length < 1) {
                    document.getElementById("card-num").innerText = "0000 0000 0000 0000";
                } else if (ccnNew.length < 20)  {
                    document.getElementById("card-num").innerText = this.ccn;
                    (<HTMLInputElement>document.getElementById("ccn-in")).value = this.ccn;
                }
              break;
            case "month-in":
                this.expMo = inVal;
                if (inVal.length < 1) {
                    document.getElementById("card-month").innerText = "00";
                } else {
                    document.getElementById("card-month").innerText = inVal;
                }
            break;
            case "year-in":
                this.expYr = inVal;
                if (inVal.length < 1) {
                    document.getElementById("card-year").innerText = "00";
                } else {
                    document.getElementById("card-year").innerText = inVal;
                }
                break;
            case "cvc-in":
                this.cvc = inVal;
                if (inVal.length < 1) { 
                    document.getElementById("card-cvc").innerText = "000";
                } else {
                    document.getElementById("card-cvc").innerText = inVal;
                }
                break;
            default:
        }
    }

    formatNum = (inputNum: any): any => {
        if (inputNum.length < 1) return "";
        let outSegments = inputNum.match(/.{1,4}/g);
        let outNum = outSegments.join(" ");
        return outNum;
    }

    submitInfo = (e: any): void => {
        e.preventDefault();
        let nameValid = this.validateName(this.name);
        let numValid = this.validateNum(this.ccn);
        let monthValid = this.validateMonth(this.expMo);
        let dateValid = this.validateYear(this.expYr);
        let cvcValid = this.validateCvc(this.cvc);
        if (nameValid && numValid && monthValid && dateValid && cvcValid) {
            this.updateDom();
        } 
    }

    validateName = (name: string): boolean => {
        if (name.length > 0) {
            document.getElementById("name-err").innerText = "";
            document.getElementById("name-in").classList.remove("invalid");
            return true;
        } else {
            document.getElementById("name-err").innerText = "Can't be blank";
            document.getElementById("name-in").classList.add("invalid");
            return false
        }
    }

    validateNum = (num: string): boolean => {
        let testNum = num.replace(/\s/g, '');
        if (testNum.length > 0) {
            if (testNum.match(/^[0-9]*$/)) {
                document.getElementById("num-err").innerText = "";
                document.getElementById("ccn-in").classList.remove("invalid");
                return true;
            } else {
                document.getElementById("num-err").innerText = "Wrong format, numbers only";
                document.getElementById("ccn-in").classList.add("invalid");
                return false
            }
        } else {
            document.getElementById("num-err").innerText = "Can't be blank";
            document.getElementById("ccn-in").classList.add("invalid");
            return false
        }
    }

    validateMonth = (month: string,): boolean => {
        if (month.length > 0) {
            if (month.match(/^[0-9]*$/)) {
                document.getElementById("exp-err").innerText = "";
                document.getElementById("month-in").classList.remove("invalid");
                return true;
            } else {
                document.getElementById("exp-err").innerText = "Wrong format, numbers only";
                document.getElementById("month-in").classList.add("invalid");
                return false
            }
        } else {
            document.getElementById("exp-err").innerText = "Can't be blank";
            document.getElementById("month-in").classList.add("invalid");
            return false
        }
    }

    validateYear = (year: string,): boolean => {
        if (year.length > 0) {
            if (year.match(/^[0-9]*$/)) {
                document.getElementById("year-in").classList.remove("invalid");
                return true;
            } else {
                document.getElementById("exp-err").innerText = "Wrong format, numbers only";
                document.getElementById("year-in").classList.add("invalid");
                return false
            }
        } else {
            document.getElementById("exp-err").innerText = "Can't be blank";
            document.getElementById("year-in").classList.add("invalid");
            return false
        }
    }

    validateCvc = (cvc: string): boolean => {
        if (cvc.length > 0) {
            if (cvc.match(/^[0-9]*$/)) {
                document.getElementById("cvc-err").innerText = "";
                document.getElementById("cvc-in").classList.remove("invalid");
                return true;
            } else {
                document.getElementById("cvc-err").innerText = "Wrong format, numbers only";
                document.getElementById("cvc-in").classList.add("invalid");
                return false
            }
        } else {
            document.getElementById("cvc-err").innerText = "Can't be blank";
            document.getElementById("cvc-in").classList.add("invalid");
            return false
        }
    }

    updateDom = (): void => {
        //remove form
        document.getElementById("card-form").remove();
        //get container b
        let containerEl = document.querySelector(".container-b");
        //create new container
        const containerElNew = document.createElement("div");
        containerElNew.className = "container-complete";
        //create Svg
        const svgEl = document.createElement("img");
        svgEl.src = Icon;
        //create h1
        const titleEl = document.createElement("h1");
        titleEl.innerText = "THANK YOU!"
        titleEl.className = "complete-title";
        //create p
        const subTitleEl = document.createElement("p");
        subTitleEl.innerText = "We've added your card details"
        subTitleEl.className = "complete-title-sub";
        //create button
        const btnBg = document.createElement("div");
        btnBg.className = "btn-bg-reset"
        const btnEl = document.createElement("button");
        btnEl.innerText = "Continue"
        btnEl.className = "btn-reset";
        //append all to container and container to container b
        containerElNew.appendChild(svgEl);
        containerElNew.appendChild(titleEl);
        containerElNew.appendChild(subTitleEl);
        btnBg.appendChild(btnEl);
        containerElNew.appendChild(btnBg);
        containerEl.appendChild(containerElNew);
        //animate added elements & add btn functionality
        this.fadeIn();
        btnEl.addEventListener("click",this.resetPage);
    }

    fadeIn = (): void => {
        gsap.to(".container-complete", {
            y: 0, 
            opacity: 1,
            duration: 1,
            delay: 0,
        });
        gsap.to(".btn-bg-reset", {
            opacity: 1,
            duration: 0.5,
            delay: 1,

        });
    }

    resetPage = (): void => {
        window.location.reload();
    }
}

//Initialize Card Object
const paymentNew = new PaymentInfo;

//Button Event Listener
const submit = document.getElementById("submit")
submit.addEventListener("click",paymentNew.submitInfo);

//Input Event Listeners
const nameIn = document.getElementById("name-in");
nameIn.addEventListener("input",paymentNew.updateVal);

const ccnIn = document.getElementById("ccn-in");
ccnIn.addEventListener("input",paymentNew.updateVal);

const monthIn = document.getElementById("month-in");
monthIn.addEventListener("input",paymentNew.updateVal);

const yearIn = document.getElementById("year-in");
yearIn.addEventListener("input",paymentNew.updateVal);

const cvcIn = document.getElementById("cvc-in");
cvcIn.addEventListener("input",paymentNew.updateVal);