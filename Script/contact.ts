namespace core {
    export class Contact {
        private _fullName: string;
        private _contactNumber: string;
        private _emailAddress: string;

        constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        get fullName(): string {
            return this._fullName;
        }

        set fullName(value: string) {
            this._fullName = value;
        }

        get contactNumber(): string {
            return this._contactNumber;
        }

        set contactNumber(value: string) {
            this._contactNumber = value;
        }

        get emailAddress(): string {
            return this._emailAddress;
        }

        set emailAddress(value: string) {
            this._emailAddress = value;
        }

        toString(): string {
            return `\nFullName: ${this._fullName}\nContactNumber: ${this._contactNumber}\nEmailAddress: ${this._emailAddress}\n`;
        }

        serialize(): string | null {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
            }
            console.error("One or more properties of the contact are empty or invalid");
            return null;
        }

        deserialize(data: string): void {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0].trim();
            this._contactNumber = propertyArray[1].trim();
            this._emailAddress = propertyArray[2].trim();
        }
    }
}

// Usage Example:
let contact = new core.Contact();
contact.fullName = "John Doe";
contact.contactNumber = "1234567890";
contact.emailAddress = "john@example.com";
console.log(contact.toString());
