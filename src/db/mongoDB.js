import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ppqita:santri@ppqitadb.9ybiiar.mongodb.net/mynotes",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};
