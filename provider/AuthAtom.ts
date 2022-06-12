import { IAthResponse } from './../models/IAth';
import { atom } from "recoil";

export enum AlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    NONE = 'none'
}

export const AuthAtom = atom<IAthResponse | null>({
    key: '_AuthAtom_', 
    default: null,
});

export const showErrorAtom =  atom<AlertProps>({
    key: '_showErrorAtom_',
    default: {
        message: '',
        type: AlertType.NONE,
    },
})

export type AlertProps = {
    type : AlertType,
    message : string
}

