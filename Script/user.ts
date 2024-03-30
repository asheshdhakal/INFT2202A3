namespace core {
    export class User {
        private _displayName: string;
        private _emailAddress: string;
        private _username: string;
        private _password: string;

        constructor(displayName: string = "", emailAddress: string = "", username: string = "", password: string = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        get displayName(): string {
            return this._displayName;
        }

        set displayName(value: string) {
            this._displayName = value;
        }

        get emailAddress(): string {
            return this._emailAddress;
        }

        set emailAddress(value: string) {
            this._emailAddress = value;
        }

        get username(): string {
            return this._username;
        }

        set username(value: string) {
            this._username = value;
        }

        get password(): string {
            return this._password;
        }

        // toString method to return a string representation of the user
        toString(): string {
            return `DisplayName: ${this._displayName}\nEmailAddress: ${this._emailAddress}\nUsername: ${this._username}`;
        }

        /**
         * Serializes the user object for storage or transmission.
         * @returns {string} A JSON string representation of the user object.
         */
        serialize(): string {
            return JSON.stringify({
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            });
        }

        /**
         * Deserializes the user data from a string.
         * @param {string} data - The serialized user data.
         */
        deserialize(data: string): void {
            let obj = JSON.parse(data);
            this._displayName = obj.DisplayName;
            this._emailAddress = obj.EmailAddress;
            this._username = obj.Username;
            this._password = obj.Password;
        }

        /**
         * Populates the user instance's properties from a JSON object.
         * @param {Object} data - The JSON object containing user data.
         */
        fromJSON(data: any): void {
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        }
    }}

/**
 * Converts the user instance to a JSON object.
 * @returns {Object} The JSON representation of the user.
 */
