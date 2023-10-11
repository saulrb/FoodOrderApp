import { Fragment, useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmoundNumber = +enteredAmount
    if (enteredAmount.trim().length === 0 || enteredAmoundNumber < 1 || enteredAmoundNumber > 5) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(enteredAmoundNumber)
  }

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount between 1 and 5 </p>}
      </form>
    </Fragment>
  )
}

export default MealItemForm
