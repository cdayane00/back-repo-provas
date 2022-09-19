import userDataFactory from "./userDataFactory";
import userFactory from "./userFactory";
import { generateToken } from "../../src/utils/JWT";

const tokenFactory = async ()=>{
    const user = userDataFactory();
    const createdUser = await userFactory(user);
    const token = generateToken(createdUser.id);

    return token;
}

export default tokenFactory;