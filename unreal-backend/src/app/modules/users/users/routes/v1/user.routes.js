import { userSignup,loginUser ,updateUser, emailVerification} from "../../controllers/userController";
import { upload } from "../../helpers/multer"; 
const checkAuth = require('../../../users/helpers/check-auth');



//User Routes
export const routes = (app, version) => {
    app.post(
        version + '/signup-user',upload.single('profileImage'),
        userSignup,
    );
    app.patch(
        version + '/update-user/:Id',upload.single('profileImage'),
        updateUser,
    );
    app.post(
        version + '/verify-user-by-mail/:Id',upload.single('profileImage'),
        emailVerification,
    );

    app.post(
        version + '/login-user',
        loginUser,
    );
};