import React from "react"
import "/src/styles/Digit.css"


export default function Digit(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="Digit" style={styles} onClick={props.onClick}>
            <h1>{props.digit}</h1>
        </div>
    )
}