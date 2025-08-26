'use server';
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCT_LOMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";

// Get latest Products
export async function getLatestProduct() {
    // const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCT_LOMIT ,
        orderBy: { createdAt: 'desc' },
    });
 
    return convertToPlainObject(data);
}

//Get single product 
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug },
    });
}

// Get all peoducts
export async function getAllProducts({
    query,
    limit = PAGE_SIZE,
    page,
    category
}: {
    query: string;
    limit?: number;
    page: number;
    category?: string
}) {
    const data = await prisma.product.findMany({
        skip: (page -1) * limit,
        take: limit
    });

    const dataCount = await prisma.product.count();

    return {
        data,
        totalPages: Math.ceil(dataCount / limit),
    };
}

// Delete a product 
export async function deleteProduct(id: string) {
    try {
        const productExists = await prisma.product.findFirst({
            where: {id}
        });

        if(!productExists) throw new Error('Product not found');

        await prisma.product.delete({where: { id } });

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product deleted successfull!'
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}