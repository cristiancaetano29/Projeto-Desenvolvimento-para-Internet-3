import React from "react"
import Header from "../header/Header"
import './Main.css';


const Main = (props) => {
    return (
        <div className="content">
            <Header {...props}/>
            <main>
                <div>
                    {props.children}
                </div>
            </main>
        </div>
    )
}

export default Main