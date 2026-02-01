import mongoose from "mongoose";
import type { CredentialModel } from "../../types/credentials";
import env from "../../config/env";
import bcrypt from "bcryptjs";
import type { ReceiptTurkishLiraIcon } from "lucide-react";

export const credentialSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

credentialSchema.pre('save', async function(){
    if(this.isModified('password')){
         this.password = await bcrypt.hash(this.password + env.PEPPER, env.SALT);
    }
})

credentialSchema.methods.isPasswordCorrect = async function(pass: string){
 const passwordWithPepper = pass + env.PEPPER;
    return await bcrypt.compare(passwordWithPepper, this.password);
}

const Credential = mongoose.model<CredentialModel>('Credential', credentialSchema);
export default Credential;