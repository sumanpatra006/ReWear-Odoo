class Errorhandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";
    res.status(500).json({
        success:false,
        message:err.message
    })
}

export default Errorhandler;