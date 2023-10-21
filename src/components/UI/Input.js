import React, { Fragment } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, reference) => {
  return (
    <Fragment>
      <div className={classes.input}></div>
      <label htmlFor={props.input.id}> {props.label} </label>
      <input ref={reference} {...props.input} />
    </Fragment>
  )
})

export default Input
