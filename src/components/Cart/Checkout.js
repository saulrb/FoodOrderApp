import Input from '../UI/Input'
import classes from './Checkout.module.css'
import { useRef, useState } from 'react'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    zip: true,
    city: true
  })

  const nameRef = useRef()
  const streetRef = useRef()
  const zipRef = useRef()
  const cityRef = useRef()

  const isValidField = (field, isValid) => {
    const warning = `${field} is not valid`
    if (!isValid) {
      return <p>{warning} </p>
    }
  }
  const formSubmitHandler = event => {
    event.preventDefault()
    const name = nameRef.current.value
    const street = streetRef.current.value
    const zip = zipRef.current.value
    const city = cityRef.current.value

    const nameIsValid = !isEmpty(name)
    const streetIsValid = !isEmpty(street)
    const zipIsValid = isFiveChars(zip)
    const cityIsValid = !isEmpty(city)

    setFormIsValid({ name: nameIsValid, street: streetIsValid, zip: zipIsValid, city: cityIsValid })

    const formIsValidity = nameIsValid && streetIsValid && zipIsValid && cityIsValid

    if (!formIsValidity) {
      return <p>Please enter valid data</p>
    }
    // submit cart data
    props.onConfirm({
      name,
      street,
      zip,
      city
    })
  }
  return (
    <>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={`${classes.control} ${!formIsValid.name ? classes.invalid : ''}`}>
          <Input
            ref={nameRef}
            label="Your Name"
            input={{
              type: 'text',
              id: 'name'
            }}
          />
          {isValidField('Name', formIsValid.name)}
        </div>
        <div className={`${classes.control} ${!formIsValid.street ? classes.invalid : ''}`}>
          <Input
            ref={streetRef}
            label="Street "
            input={{
              type: 'text',
              id: 'street'
            }}
          />
          {isValidField('Street', formIsValid.street)}
        </div>
        <div className={`${classes.control} ${!formIsValid.zip ? classes.invalid : ''}`}>
          <Input
            ref={zipRef}
            label="Postal Code"
            input={{
              type: 'text',
              id: 'zipcode'
            }}
          />
          {isValidField('Postal Code', formIsValid.zip)}
        </div>
        <div className={`${classes.control} ${!formIsValid.city ? classes.invalid : ''}`}>
          <Input
            ref={cityRef}
            label="City"
            input={{
              type: 'text',
              id: 'city'
            }}
          />
          {isValidField('City', formIsValid.city)}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  )
}

export default Checkout
