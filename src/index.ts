import './style.css';


console.log("Typescript is neat");

const domInteract = {}



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
                if (inVal.length < 1) { //reset display value
                    document.getElementById("card-name").innerText = "JANE APPLESEED";
                } else {
                    //set name variable
                    this.name = inVal;
                    //Update display element
                    document.getElementById("card-name").innerText = inVal.toUpperCase();
                }
              break;
            case "ccn-in":
                if (inVal.length < 1) {
                    document.getElementById("card-num").innerText = "0000 0000 0000 0000";
                } else if (inVal.length < 17)  {
                    this.ccn = inVal;
                    let numOut = this.formatNum(this.ccn);
                    document.getElementById("card-num").innerText = numOut;
                }
              break;
            case "month-in":
                if (inVal.length < 1) {
                    document.getElementById("card-month").innerText = "00";
                } else {
                    this.expMo = inVal;
                    document.getElementById("card-month").innerText = inVal;
                }
            break;
            case "year-in":
                if (inVal.length < 1) {
                    document.getElementById("card-year").innerText = "00";
                } else {
                    this.expYr = inVal;
                    document.getElementById("card-year").innerText = inVal;
                }
                break;
            case "cvc-in":
                if (inVal.length < 1) { 
                    document.getElementById("card-cvc").innerText = "000";
                } else {
                    this.cvc = inVal;
                    document.getElementById("card-cvc").innerText = inVal;
                }
                break;
            default:
        }
    }

    formatNum = (inputNum: any): any => {
        let outSegments = inputNum.match(/.{1,4}/g);
        let outNum = outSegments.join(" ");
        return outNum;
    }

    submitInfo = (e: any): void => {
        e.preventDefault();
        console.log(e);

        let nameValid = this.validateName(this.name);
        let numValid = this.validateNum(this.ccn);
        let dateValid = this.validateExp(this.expMo, this.expYr);
        let cvcValid = this.validateCvc(this.cvc);

        if (nameValid && numValid && dateValid && cvcValid) {
            console.log("ALL VALID UPDATE DOM");
        } else {
            console.log("INVALID INPUTS");
        }
    }

    validateName = (name: string): boolean => {
        if (name.length >0) {
            document.getElementById("name-err").innerText = "";
            return true;
        } else {
            document.getElementById("name-err").innerText = "Can't be blank";
            return false
        }
    }

    validateNum = (num: string): boolean => {
        return true;
    }

    validateExp = (month: string, year: string): boolean => {
        return true;
    }

    validateCvc = (cvc: string): boolean => {
        return true;
    }

}


//Initialize Card Object
const paymentNew = new PaymentInfo;

//Button Event Listener
const submit = document.getElementById("submit")
submit.addEventListener("click",paymentNew.submitInfo);

//Input Event Listener
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

