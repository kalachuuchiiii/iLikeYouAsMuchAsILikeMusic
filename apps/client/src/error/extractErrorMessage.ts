import { isAxiosError } from "axios"


export const extractErrorMessage = (err: unknown) => {
    if(isAxiosError(err)){
        return err.response?.data.message ?? err.message;
    }
    if(err instanceof Error){
        return err.message;
    }

    if(typeof err === 'string'){
        return err;
    } 

    return String(err);
}