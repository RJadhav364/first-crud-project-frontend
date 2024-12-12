import React from 'react'

const Button = ({btn_title, classes, onclickFn}) => {
  return (
    <div>
      <button onClick={onclickFn}
      className={`${classes}`}
      >{btn_title}</button>
    </div>
  )
}

export default Button
