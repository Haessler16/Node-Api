import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/companydb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db=> console.log("DB is connnected"))
.catch(error => console.log("error conection with db:", error.message))