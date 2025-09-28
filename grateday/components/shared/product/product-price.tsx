import { cn  } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number; className?: string; }) => {
    // 소수점 제거하고 천 단위 콤마 추가
    const formatted = Math.round(value).toLocaleString('ko-KR');
  
    return (
      <p className={cn('text-xs', className)}>
        {formatted}
        <span className="text-xs">원</span>
      </p>
    );
  }; 
export default ProductPrice;


// const ProductPrice = ({ value, className }: { value: number; className?:string; }) => {
//     // Ensure two decimal places
//     const stringValue = value.toFixed(2) 
//     //Get the int/float
//     const [intValue, floatValue] = stringValue.split('.')

//     return ( 
//       <p className={ cn('text-2xl', className) }>
//         <span className="text-xs align-super">$</span>
//         {intValue}
//         <span className="text-xs align-super">.{ floatValue }</span>
//       </p> 
//     );
// }

// export default ProductPrice;