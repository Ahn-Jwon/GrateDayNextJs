import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.action";

export const metadata = {
    title: 'Shopping Cart'
}

const CartPage = async() =>  {
    const cart = await getMyCart();


    // 이쪽 리턴 하단부분에 View가 들어간다고 생각하면됨 
    return ( 
        <>
        <CartTable cart={cart} />
        </>
    );
};
 
export default CartPage;