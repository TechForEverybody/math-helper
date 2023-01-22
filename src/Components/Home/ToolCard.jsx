import React from 'react'

function ToolCard(object) {
    return (
        <div className='ToolCard' onClick={()=>object.render()}>
            <h2>{object.text}</h2>
            <div className="pin pin1"></div>
            <div className="pin pin2"></div>
            <div className="pin pin3"></div>
            <div className="pin pin4"></div>
        </div>
    )
}

export default ToolCard