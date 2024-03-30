"use strict";
var core;
(function (core) {
    class User {
        _displayName;
        _emailAddress;
        _username;
        _password;
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
        get displayName() {
            return this._displayName;
        }
        set displayName(value) {
            this._displayName = value;
        }
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        get username() {
            return this._username;
        }
        set username(value) {
            this._username = value;
        }
        get password() {
            return this._password;
        }
        toString() {
            return `DisplayName: ${this._displayName}\nEmailAddress: ${this._emailAddress}\nUsername: ${this._username}`;
        }
        serialize() {
            return JSON.stringify({
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            });
        }
        deserialize(data) {
            let obj = JSON.parse(data);
            this._displayName = obj.DisplayName;
            this._emailAddress = obj.EmailAddress;
            this._username = obj.Username;
            this._password = obj.Password;
        }
        fromJSON(data) {
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map