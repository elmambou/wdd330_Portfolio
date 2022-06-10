export default class Comment {
    constructor(name, comment) {
        this._name = name;
        this._date = new Date().toISOString();
        this._comment = comment;
    }

    get name() {
        return this._name;
    }

    get comment() {
        return this._comment;
    }

    get date() {
        return this._date;
    }

    toJSON(key) {
        return { name: this._name, date: this._date, comment: this._comment };
    }
}
