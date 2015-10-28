/**
 * @Auther : Moustafa Ahmed
 * @Project : Simple Encoding Data Algorithm
 * @Project Date :
 * @framework : just pure js (no framework used)
 * @design pattern : prototype
 */
(function () {
    /**
     * Global Variables used to pass data between functions
     */
    var encr, decr, final = '',
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}<>,:;.?-=+/\|*_^&$%#@!~'";
    /**
     * The Main ENC Method
     */
    var ENC = function () {
        this.ele();
        this.init();
    };
    /**
     * Element Selector
     * Description : a function takes element id or class name and return the element
     * @param element : the calss or the id attr
     * Return : the element with the passed attr
     */
    ENC.prototype.ele = function (element) {
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
    };
    /**
     * Initialize
     * Description : run at the first time
     */
    ENC.prototype.init = function () {
        this.events();
    };
    /**
     * Adding Events Listent
     * Description : add event listner to handel click events
     */
    ENC.prototype.events = function () {
        this.ele('#enc').addEventListener("click", this.enc.bind(this), false);
        this.ele('#dec').addEventListener("click", this.dec.bind(this), false);
    };
    /**
     * Encryption Method
     * Description :
     *   a function takes the input of the form and pass it into layers
     *   to clutters the data and converting it to binary encoded and store in in the local storage
     * Return : encoded data in binary formate
     */
    ENC.prototype.enc = function () {
        var password = document.getElementById('password').value,
            text = "",
            encr = "",
            final = "";
        // generate random string, it's length equal the input length
        for (var i = 0; i < password.length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        // merge the generated string with the input
        for (var x = 0; x < password.length; x++) {
            encr += password[x] + text[x];
        }
        // convert decimal data to binary
        for (var y = 0; y < encr.length; y++) {
            final += (possible.indexOf(encr[y]) + Math.pow(y, 2)).toString(2) + ' ';
        }

        localStorage.setItem('password', final.slice(0, -1));
        document.getElementById('encResult').innerHTML = "Encrypted Data : " + final.slice(0, -1);
    };
    /**
     * Decreption Method
     * Description :
     *   a function takes the encoded data from the local storage
     *   and decode it to get the real encrypted data
     * Return : dencoded data
     */
    ENC.prototype.dec = function () {
        encr = localStorage.getItem('password');
        decr = "";
        final = "";
        // convert binary data to decimal
        for (var i = 0; i < encr.length; i++) {
            if (encr.split(' ')[i] != undefined) {
                decr += possible[parseInt(encr.split(' ')[i], 2) - Math.pow(i, 2)];
            }
        }
        // pick the characters
        for (x = 0; x < decr.length; x += 2) {
            final += decr[x];
        }
        document.getElementById('decResult').innerHTML = "Decrypted Data : " + final.replace(/udfnd/g, ' ');
    }
    new ENC();
})();