import React from 'react'
// import Delete from './logo192.png'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div> 
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }
const handleCheckOut = async()=>{
  let userEmail =localStorage.getItem("userEmail");
  //console.log("This is users email :",userEmail);
  let response = await fetch ("http://localhost:5000/api/orderData", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json"
    },
    body: JSON.stringify({ // we are not using axios here we used fetch keyword so we use json.stringify if we use axios then by axios ,they dirctly implement json.stringify.
      order_data: data,//order_data is must same with the order_data in a cart
      email: userEmail,
      order_date: new Date().toDateString()
    })
  });
  //console.log("Order Response:", response.status);
if (response.status===200)
{
  dispatch({type: "DROP"});
}
}


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {/* {console.log(data)} */}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className='  fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr> 
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"> <i class="fa fa-trash" aria-hidden="true" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i>   </button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 '>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-light mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}