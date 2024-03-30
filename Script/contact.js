"use strict";
var core;
(function (core) {
    class Contact {
        _fullName;
        _contactNumber;
        _emailAddress;
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }
        get fullName() {
            return this._fullName;
        }
        set fullName(value) {
            this._fullName = value;
        }
        get contactNumber() {
            return this._contactNumber;
        }
        set contactNumber(value) {
            this._contactNumber = value;
        }
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        toString() {
            return `\nFullName: ${this._fullName}\nContactNumber: ${this._contactNumber}\nEmailAddress: ${this._emailAddress}\n`;
        }
        serialize() {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
            }
            console.error("One or more properties of the contact are empty or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0].trim();
            this._contactNumber = propertyArray[1].trim();
            this._emailAddress = propertyArray[2].trim();
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
let contact = new core.Contact();
contact.fullName = "John Doe";
contact.contactNumber = "1234567890";
contact.emailAddress = "john@example.com";
console.log(contact.toString());
//# sourceMappingURL=contact.js.map