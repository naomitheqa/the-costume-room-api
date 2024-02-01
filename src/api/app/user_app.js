import { UserController } from "../controllers/users_controller.js";
import { ResponseController } from "../controllers/response_controller.js";

const userController = new UserController();
const responseController = new ResponseController();


export const login = async function (req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).json(responseController.BadRequest('User email or password not provided.'));
        return;
    }
    
    try{
        const response = await userController.authenticate(email, password);
        if (response === 0){
            res.status(400).json(responseController.BadRequest('User email or password invalid.'));
        } if (response === 1){
            res.status(400).json(responseController.NotFound('User with given credentials not found.'));
        }else {
            res.status(200).json(responseController.LoginSuccess('Login successful.', {token: `JWT ${response.token}`, userId: response.id}));
        }
    } catch(err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};

export const updatePassword = async function (req, res) {
    const { userId, cpassword, npassword} = req.body;
    if (!(userId && cpassword && npassword)){
        res.status(400).json(responseController.BadRequest('Some data has not been provided.'));
        return;
    }

    try{
        const ans = await userController.validateAccessToken(req.headers);
        
        if (ans.isfound){
            const response = await userController.updatePassword(userId, cpassword, npassword);
            if (response === 0){
                res.status(400).json(responseController.BadRequest('Current and new passwords could be invalid.'));
            } if (response === -1){
                res.status(400).json(responseController.BadRequest('Current password is incorrect for provided user.'));
                return;
            } if (response === 1){
                res.status(400).json(responseController.NotFound('User with given credentials not found.'));
            } else {
                res.status(204).json(responseController.SuccessfulNoContent());
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }
    } catch(err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};