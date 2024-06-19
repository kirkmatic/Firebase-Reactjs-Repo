import React from 'react'

const AddUserPopUp = (props) => {
  return (
    (props.trigger) ? (
        <div>
        <div>
            <button>Close</button>
            {props.children}
        </div>
    </div>
    ) : ""
  )
}

export default AddUserPopUp
