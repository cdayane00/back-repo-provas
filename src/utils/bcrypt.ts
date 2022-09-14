import bcrypt from 'bcrypt';

const bcryptEncryptData = (data: string) => {
    return bcrypt.hashSync(data, 10);
};

const bcryptCompareEncryptedData = (data: string, encryptData: string) => {
    return bcrypt.compareSync(data, encryptData);
}

export { bcryptEncryptData, bcryptCompareEncryptedData};