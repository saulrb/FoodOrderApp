import { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import useHttp from '../../hooks/use-http'

const Cart = props => {
  const { isLoading, error, sendRequest: sendOrderRequest } = useHttp()
  const cartCtx = useContext(CartContext)
  const [isCheckout, setIsCheckout] = useState(false)
  const [userData, setUserData] = useState({ name: '', street: '', city: '', postalCode: '' })

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({ item, amount: 1 })
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const orderHandler = () => {
    setIsCheckout(true)
    console.log('order to true')
  }

  const modalActions = () => {
    return (
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button onClick={orderHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    )
  }

  useEffect(() => {
    console.log('sending request')
    sendOrderRequest(
      {
        url: 'https://react-http-f6a65-default-rtdb.firebaseio.com/orders.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { order: { user: userData, orderedItems: cartCtx.items } }
      },
      data => {
        console.log(data)
      }
    )
  }, [sendOrderRequest, cartCtx.items, userData])

  const submitOrderHandler = userData => {
    setUserData(userData)

    if (isLoading) {
      return <p>Sending order data...</p>
    }
    if (error) {
      return <p>{error}</p>
    }
  }

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions()}
    </Modal>
  )
}

export default Cart
