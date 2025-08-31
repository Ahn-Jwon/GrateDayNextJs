'use server';

import { 
    shippingAddressSchema, 
    signInFormSchema, 
    signUpFormSchema, 
    paymentMethodSchema
 } from "../validators";
import {auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import {prisma} from '@/db/prisma';
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import z from "zod";
import { PAGE_SIZE } from "../constants";


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

// 사용자 등록 //actionState Hook(상태관리 Hook)
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

// Get user by the Id
export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: {id: userId}
    });
    if(!user) throw new Error('User not found');
    return user;
}

// Update the user's address
export async function updateUserAdderss(data: ShippingAddress) { 
    try { 
        const session = await auth(); // 로그인된 사용자 세션 
        const currentUser = await prisma.user.findFirst({
            where: {id: session?.user?.id}
        })

        if (!currentUser) throw new Error('User not found')
        const address = shippingAddressSchema.parse(data);

        await prisma.user.update({
            where: {id: currentUser.id },
            data: {address}
        });

        return {
            success: true,
            message: 'User updated successfully'
        }
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
}

// Update user's payment method (사용자 결제 방법 업데이트)
export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) { // 비동기함수 
    try {
        const session = await auth(); // 로그인된 사용자 세션 
        const currentUser = await prisma.user.findFirst({ // 로그인된 사용자의 id를 기준으로 user 테이블에서 사용자 조회함 
            where: {id: session?.user?.id}
        }); 
        if(!currentUser) throw new Error('User not found'); // 사용자가 없는 경우 예외처리 

        const paymentMethod = paymentMethodSchema.parse(data); // 입력 데이터 검증 (Zod 사용
        // data를 paymentMethodSchema로 파싱하여 유효성을 검사
        console.log('Parsed payment method:', paymentMethod);
        

        // 사용자 정보 업데이트
        await prisma.user.update({
            where: {id: currentUser.id},
            data: {paymentMethod: paymentMethod.type }
        }); // 현재 사용자 ID를 기준으로 user 테이블의 paymentMethod 필드를 type 값으로 업데이트

        return {
            success: true, 
            message: 'User updated successfully',
        } // 여기까지 try 
    } catch (error) {
        return { success: false, message: formatError(error)}
    }
}

// Update the user profile 
export async function updateProfile(user: { name: string; email: string; }) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id
            }
        });

        if(!currentUser) throw new Error('user not found');

        await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data: {
                name: user.name
            }
        });

        return {
            success: true,
            message: 'User updated successfully'
        }
    } catch(error) {
        return { success: false, message: formatError(error)}
    }
}

// Get all the users
export async function getAllUsers({ 
    limit = PAGE_SIZE,
    page
 }: {
    limit?: number;
    page: number;
 }) { 
    const data = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit
    });

    const dataCount = await prisma.user.count();

    return {
        data,
        totalPages: Math.ceil(dataCount / limit)
    };
 }
