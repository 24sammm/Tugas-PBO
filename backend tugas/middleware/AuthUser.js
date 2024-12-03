import User from "../models/UserModel.js"

export const verifyUser = async(req, res, next) => {
    if (!req.session.userId){
        return res.status(401).json({msg: "mohon login ke akun anda"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.user.id = user.id;
    req.role = user.role;
    next();
}