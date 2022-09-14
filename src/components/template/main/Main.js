import React from "react"
import Header from "../header/Header"
import './Main.css';


const Main = (props) => {
const { children } = props

    return (
        <div className="content">
            <Header {...props}/>
            <main>
                <div className="bg-slate-100">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Main