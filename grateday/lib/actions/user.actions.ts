'use server';

import { signInFormSchema } from "../validators";
import {signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials 後で구글이나 깃허브로도 가능
// 여기 Hook를 사용한다.
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        await signIn('credentials', user);

        return { success: true, message: 'Signde in successfully' }
    } catch (error) {
        if(isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: 'Invalid email or password' }
    }
} 

// Sign user Out
export async function signOutUser() {
    await signOut();
}
