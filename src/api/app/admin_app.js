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
                res.status(201).json(responseController.UserCreated('Admin with listed details has been created.', { id: user.hashid, name: `${user.firstName} ${user.lastName}`, email: user.email}));
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }
    } catch (err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};

module.exports.addUser = async function (req, res) {
    const { firstName, lastName, email, expiryDate } = req.body;
    if (!(firstName && lastName && email && expiryDate)){
        res.status(400).json(responseController.BadRequest('Some data has not been provided.'));
        return;
    }

    try{
        const ans = await userController.validateAccessToken(req.headers);

        if (ans.isfound && ans.userType == 'ADMIN'){
            const user = await adminController.createUser(firstName, lastName, email, expiryDate);
            if (user == 0){
                res.status(400).json(responseController.BadRequest('Data provided for new user is invalid.', { firstName: firstName, lastName: lastName, email:email, expiryDate: expiryDate}));
            } else if (user === 1){
                res.status(409).json(responseController.CausingDuplicate('User with listed email already exists.', { email: email }))
            } else {
                res.status(201).json(responseController.UserCreated('User with listed details has been created.', { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, expiryDate: user.expiryDate}));
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }
    } catch (err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};

module.exports.getAllAdmins = async function (req, res) {
    try {
        const ans = await userController.validateAccessToken(req.headers);

        if (ans.isfound && ans.userType == 'ADMIN'){
            const admins = await adminController.listAdmins();

            if (admins == 1){
                res.status(500).json(responseController.CouldNotCompleteRequest('Could not complete request to get all admins.', {admins: {}}))
            } else {
                res.status(200).json(responseController.SuccessfulDataFetch('List of admins retrieved.', {admins: admins, count: admins.length}))
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }

    } catch (err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};

module.exports.getAllUsers = async function (req, res) {
    try {
        const ans = await userController.validateAccessToken(req.headers);

        if (ans.isfound && ans.userType == 'ADMIN'){
            const users = await adminController.listGeneralUsers();

            if (users == 1){
                res.status(500).json(responseController.CouldNotCompleteRequest('Could not complete request to get all general users.', {users: {}}))
            } else {
                res.status(200).json(responseController.SuccessfulDataFetch('List of general users retrieved.', {users: users, count: users.length}))
            }
        } else {
            res.status(401).json(responseController.Unauthorized('Unauthorized.'))
        }

    } catch (err) {
        res.status(500).json(new Error("Oops...", { cause: err}));
        return;
    }
};