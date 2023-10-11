import React, { Fragment } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <div className={classes.input}></div>
      <label htmlFor={props.input.id}> {props.label} </label>
      <input ref={ref} {...props.input} />
    </Fragment>
  )
})

export default Input
