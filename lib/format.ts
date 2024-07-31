export const formatPrice =(price:number)=>{
return new Intl.NumberFormat("eng-Us",{
    style:"currency",
    currency:"USD"
}).format(price)
}