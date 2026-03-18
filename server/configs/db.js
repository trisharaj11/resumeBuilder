import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{console.log("DB connected successfully!")})

        let mongodbURI=process.env.MONGODB_URI
        const projectName='resumeBuild'

        if(!mongodbURI){
           throw new Error("MONGODB_URL env not set") 
}    if(mongodbURI.endsWith('/')){
    mongodbURI=mongodbURI.slice(0,-1)
} await mongoose.connect(`${mongodbURI}/${projectName}`,{family:4})
} catch (error) {
        console.log("Error connecting to mongodb:",error)
    }
}

export default connectDB;