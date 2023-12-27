
//判断属性是不是uuid
function isUUID(value) {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    return uuidRegex.test(value);
}
const isObject = (value) => {
    return typeof value === "object" && value !== null;
};
export const filterEmptyFields = (obj) => {
    const filteredObj = {};
    for (const key in obj) {
        if (
            obj[key] !== null &&
            obj[key] !== undefined &&
            obj[key] !== "" &&
            obj[key] !== "{}" &&
            obj[key] !== "[]" &&
            !isUUID(obj[key]) &&
            key !== "rowid" &&
            key !== "keywords" &&
            key !== "score" &&
            key !== "uuid"
        ) {
            // filteredObj[key] = obj[key];
            if (isObject(obj[key])) {
                const filteredSubObj = filterEmptyFields(obj[key]);
                if (Object.keys(filteredSubObj).length > 0) {
                    filteredObj[key] = JSON.stringify(filteredSubObj);
                }
            } else {
                try {
                    const parsedValue = JSON.parse(obj[key]);
                    if (isObject(parsedValue)) {
                        const filteredSubObj = filterEmptyFields(parsedValue);
                        if (Object.keys(filteredSubObj).length > 0) {
                            filteredObj[key] = JSON.stringify(filteredSubObj);
                        }
                    } else {
                        filteredObj[key] = obj[key];
                    }
                } catch (error) {
                    filteredObj[key] = obj[key];
                }
            }
        }
    }
    const jsonString = JSON.stringify(filteredObj, (key, value) => {
        if (
            value === "" ||
            value === "[]" ||
            value === "{}" ||
            (typeof value === "object" && Object.keys(value).length === 0)
        ) {
            return undefined;
        }
        return value;
    });
    return jsonString.replace(/[{}"]/g, "").replace(/\\/g, "").slice(0, 1800);
};