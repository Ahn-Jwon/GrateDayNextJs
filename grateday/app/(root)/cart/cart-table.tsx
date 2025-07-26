'use client';
import { useRouter } from "next/navigation"; // 라우터
import { useToast } from "@/hooks/use-toast"; // 후크
import { useTransition } from "react";  // 전환
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Cart } from "@/types";
import Link from "next/link";
import Image from "next/image";


const CartTable = ({ cart }: {cart?: Cart}) => {
    return ( <>
        <h1 className="py-4 h2-bold">Shopping Cart</h1>
    </> );
}
 
export default CartTable;