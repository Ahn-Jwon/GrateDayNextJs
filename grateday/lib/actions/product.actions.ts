'use server';
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LOMIT } from "../constants";

// Get latest Products
export async function getLatestProduct() {
    // const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCT_LOMIT ,
        orderBy: { createdAt: 'desc' },
    });

    return convertToPlainObject(data);
}