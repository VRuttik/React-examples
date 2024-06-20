
import React from 'react'

function Product(props) {
    return (
      <div>
{/*it uses the value of props by defining the parameter as props objects8 */}
        <img src={props.img} alt="products" />
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <h4>{props.price}</h4>
      </div>
    );
}


export default Product;