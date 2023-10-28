import { UserController} from "../controllers/users_controller";
import { ResponseController } from "../controllers/response_controller";

const userController = new UserController();
const responseController = new ResponseController();


module.exports.login = async function (req, res) {
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
            res.status(400).json(responseController.NotFound('User with guven credentials not found.'));
        }else {
            res.status(200).json(responseController.LoginSuccess('Login successful.', {token: response}));
        }
    } catch(err){
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};
