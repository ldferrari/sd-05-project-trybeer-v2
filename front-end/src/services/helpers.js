import { addToCart, removeFromCart } from './localStorage';

const zero = 0;

const addProduct = (addData) => {
  const { quantity, setQuantity, total, setTotal, product } = addData;

  if (quantity >= zero) {
    setQuantity(quantity + 1);
    localStorage.setItem('totalPrice', String(total + parseFloat(product.price)));
    setTotal(total + parseFloat(product.price));
    addToCart(product);
  }
};

const removeProduct = (removeData) => {
  const { quantity, setQuantity, total, setTotal, product } = removeData;

  if (quantity > zero) {
    setQuantity(quantity > zero ? quantity - 1 : zero);
    localStorage.setItem(
      'totalPrice',
      String(total > zero ? total - parseFloat(product.price) : zero),
    );
    setTotal(total > zero ? total - parseFloat(product.price) : zero);
    removeFromCart(product);
  }
};

export { addProduct, removeProduct };
