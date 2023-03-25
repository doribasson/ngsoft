import { formInterface } from "../interfaces/Post";

export const validate = (fields: formInterface) => {
    const { title, subTitle, status } = fields;

    if (!title?.trim()) {
        return "title is Required";
    }
    if (!subTitle?.trim()) {
        return "subTitle is Required";
    }
    if (!status?.trim()) {
        return "status is Required";
    }

    return "";
};
