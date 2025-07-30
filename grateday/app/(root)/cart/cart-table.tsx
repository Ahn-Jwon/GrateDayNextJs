'use client';
import { useRouter } from "next/navigation"; // 라우터
import { useToast } from "@/hooks/use-toast"; // 후크
import { useTransition } from "react";  // 전환
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Cart } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {Table, TableBody, TableHead, TableHeader, TableRow, TableCell} from '@/components/ui/table'


const CartTable = ({ cart }: {cart?: Cart}) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();


// Cart is empty. <Link href='/'>Go Shopping</Link>  카드가 비어있을 경우
    return ( <> 
        <h1 className="py-4 h2-bold">Shopping Cart</h1>
        { !cart || cart.items.length === 0 ? (
            <div>
                Cart is empty. <Link href='/'>Go Shopping</Link> 
            </div>
        ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { cart.items.map((item) => (
                                <TableRow key={ item.slug}>
                                    <TableCell>
                                        <Link href={`/product/${item.slug}`} className="flext items-center">
                                        <Image src={item.image} alt={item.name} width={50} height={50} />
                                        <span className="px-2">{item.name}</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        ) }
    </> );
}
 
export default CartTable;