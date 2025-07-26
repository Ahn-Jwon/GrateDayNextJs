import CartTable from "./cart-table";

export const metadata = {
    title: 'Shopping Cart'
}

const CartPage = () => {
    // 이쪽 리턴 하단부분에 View가 들어간다고 생각하면됨 
    return ( 
        <>
        <CartTable />
        </>
    );
}
 
export default CartPage;