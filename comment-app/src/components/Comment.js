import React from 'react'

// functional Stateless

const Comment = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                {   props.comment.user &&
                    <h6 className="card-title">{  props.comment.user.name } said:</h6>
                }
                <p className="card-text">{  props.comment.comment }</p>
            </div>
        </div>
    )
}

export default Comment