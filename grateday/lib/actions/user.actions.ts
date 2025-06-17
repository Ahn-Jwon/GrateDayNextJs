'use server';

import { signInFormSchema, signUpFormSchema } from "../validators";
import {signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import {prisma} from '@/db/prisma';
import { formatError } from "../utils";

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

// Sign Up user //actionState Hook  (상태관리 Hook)
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        })

        const pllainPassword = user.password;

        user.password = hashSync(user.password, 10)

    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        }
    });

    await signIn('credentials', {
        email: user.email,
        password: pllainPassword
    })
    return { success: true, message: 'User registered successfully' }
    } catch (error) {
        if(isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: formatError(error) }
    }
}
