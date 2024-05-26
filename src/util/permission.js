const RoleTable = require("../config/config")

module.exports = (resource, allowed) =>{
    const isAllowed = function (roleData){
        return(
            roleData
            ?.find((r)=>r.resource === resource)
            ?.permissions?.some((p)=> allowed?.indexOf(p)>-1) ?? false
        )
    }
    return function ( req, res, next){
        const userRole = req?.user?.role ?? null;
        if(userRole){
            const roleData = RoleTable[userRole] || []
            if(isAllowed(roleData)){
                return next()
            }else{
                return res.status(405).json("permission is not allowed!")
            }
        }else {
            return res.status(405).json("permission is not allowed!")
        }
    }
}