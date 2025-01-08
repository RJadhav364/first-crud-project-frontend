import React from 'react'

const Button = ({btn_title, classes, onclickFn,disbaledLogic}) => {
  return (
    <div>
      <button onClick={onclickFn}
      className={`${classes}`} disabled={disbaledLogic}
      >{btn_title}</button>
    </div>
  )
}

export default Button
