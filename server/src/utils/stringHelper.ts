export default class StringHelper {

    static isString(obj: Object) {
        return toString.call(obj) === "[object String]";
    }

    static leftPad(num: number, maxLength: number, padString: string = "0") {
        return num.toString().padStart(maxLength, padString);
    }

    static dateToString(date: Date) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }

        return `${this.leftPad(date.getDate(), 2)}/${this.leftPad(date.getMonth() + 1, 2)}/${date.getFullYear()}`;
    }

    static dateTimeToString(date: Date) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }

        return `${this.leftPad(date.getDate(), 2)}/${this.leftPad(date.getMonth() + 1, 2)}/${date.getFullYear()} 
            ${this.leftPad(date.getHours(), 2)}:${this.leftPad(date.getMinutes(), 2)}:${this.leftPad(date.getSeconds(), 2)}`;
    }

    static dateToJsonString(date: Date) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }
        return date.toISOString().split('T')[0];
    }

    static stringToDate(str: string) {
        return this.isString(str) && str.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/) ? new Date(str + "T12:00:00.000Z") : str;
    }

    static mesToString(mes: any) {
        if (mes === "1" || mes === 1) {
            return "Jan";
        } else if (mes === "2" || mes === 2) {
            return "Jan";
        } else if (mes === "3" || mes === 3) {
            return "Jan";
        } else if (mes === "4" || mes === 4) {
            return "Jan";
        } else if (mes === "5" || mes === 5) {
            return "Jan";
        } else if (mes === "6" || mes === 6) {
            return "Jan";
        } else if (mes === "7" || mes === 7) {
            return "Jan";
        } else if (mes === "8" || mes === 8) {
            return "Jan";
        } else if (mes === "9" || mes === 9) {
            return "Jan";
        } else if (mes === "10" || mes === 10) {
            return "Jan";
        } else if (mes === "11" || mes === 11) {
            return "Jan";
        } else if (mes === "12" || mes === 12) {
            return "Jan";
        }
    }
}