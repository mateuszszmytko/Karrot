import { ISettings } from "../interfaces";

export class DataParser {
    public static parse(element: HTMLElement): ISettings {
        const settings: ISettings = {};

        const dataSettings = element.dataset;

        for (const key in dataSettings) {
            if (!key || !dataSettings.hasOwnProperty(key)) {
                continue;
            }

            let value = dataSettings[key];

            if (!value) {
                continue;
            }

            // trying to parse array-line strings
            // like "item1; item2" or "item1: value1; item2: value2"

            if (value.indexOf(';') > 0 && !settings.skipArrayParsing) {
                const valueArr = value.replace(/\;+\s+/g, ';').split(';');
                let newVal = value;
                let isObject = false;

                for (const valueChild of valueArr) {
                    if (valueChild.indexOf(':') > 0) {
                        isObject = true;

                        break;
                    }
                }

                newVal = isObject ? '{' : '[';

                for (const valueChild of valueArr) {
                    if (valueChild === '') {
                        continue;
                    }

                    if (isObject) {
                        const valueChildArr = valueChild.replace(/\:+\s+/g, ':').split(':');

                        newVal += `"${valueChildArr[0]}": `;
                        try {
                            JSON.parse(valueChildArr[1] || valueChildArr[0]);
                            newVal += valueChildArr[1] + ',';

                        } catch (e) {
                            newVal += `"${valueChildArr[1] || valueChildArr[0]}",`;
                        }
                        //
                    } else {
                        try {
                            JSON.parse(valueChild);
                            newVal += valueChild + ',';

                        } catch (e) {
                            newVal += `"${valueChild}",`;
                        }
                    }
                }

                newVal = newVal.substr(0, newVal.length - 1);

                newVal += isObject ? '}' : ']';

                value = newVal;
            }

            try {
                const val = value
                    .replace(/\'/g, `"`);

                if (!val) {
                    throw new Error();
                }

                value = JSON.parse(val);
            } catch (e) {
                //
            }

            settings[key] = value;
        }

        return settings;
    }
}
