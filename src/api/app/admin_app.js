import { UserController} from "../controllers/users_controller";
import { ResponseController } from "../controllers/response_controller";
import { AdminController } from "../controllers/admin_contoller";

const userController = new UserController();
const responseController = new ResponseController();
const adminController = new AdminController();

module.exports.addAdmin = async function (req, res) {
    const { firstName, lastName, email } = req.body;
    if (!(firstName && lastName && email)){
        res.status(400).json(responseController.BadRequest('Some data has not been provided.'));
        return;
    }

    try{
        const ans = await userController.validateAccessToken(req.headers);

        if (ans.isfound && ans.userType == 'ADMIN'){
            const user = await adminController.createAdmin(firstName, lastName, email);
            if (user == 0){
                res.status(400).json(responseController.BadRequest('Data provided for new admin is invalid.', { firstName: firstName, lastName: lastName, email:email}));
            } else if (user === 1){
                res.status(409).json(responseController.CausingDuplicate('User with listed email already exists.', { email: email }))
            } else {
                res.status(201).json(responseController.UserCreated(`User with listed details has been created.`, { id: user.hashid, name: `${user.firstName} ${user.lastName}`, email: user.email}));
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }
    } catch (err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};