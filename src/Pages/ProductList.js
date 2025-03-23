import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
 const API_URL = 'https://fakestoreapi.com/products';
  useEffect(() => {
    const fetchItem = async () =>{
        try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error ("Data not received")
        const listItems = await response.json();
        console.log(listItems);
    setProducts(listItems);
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
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
         <div className='products'>
            <img src={`${product.image}`} alt={`${product.title}`} width= {200} height={300} />
            <h3>{product.title}</h3><br></br>      
              <h5> ₹{product.price}</h5>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
