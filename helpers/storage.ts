import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage('authentication', {
    stateManagementUse: true,
});