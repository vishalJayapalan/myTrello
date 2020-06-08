import React from 'react'

export default function CardEdit() {
    return (
        <div>
            <div>
                <textarea 
                defaultValue={cardName}
                onKeyUp={editCardName}
                >
            </div>
            <div></div>
        </div>
    )
}
