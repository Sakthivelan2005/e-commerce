import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';

function CartList() {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
 const API_URL = 'https://fakestoreapi.com/carts';
  useEffect(() => {
    const fetchItem = async () =>{
        try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error ("Data not received")
        const listItems = await response.json();
        console.log(listItems);
    setCarts(listItems);
    } catch(err){
       console.log(err.message);
    } finally {
        setIsLoading(false);
    }
   }
   (async () => await fetchItem())()
  }, []);

  return (isLoading === true)? <img src={loading} alt='Loading...' /> : (
    <div>
      <h2>Carts</h2>
      {carts.map((cart) => (
        <div key={cart.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>Cart ID: {cart.id}</h3>
          <p>User ID: {cart.userId}</p>
          <p>Date: {cart.date}</p>
          <strong>Products:</strong>
          <ul>
            {cart.products.map((product, index) => (
              <li key={index}>
                Product ID: {product.productId}, Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CartList;
