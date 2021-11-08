import preloader from "../assets/images/preloader.gif";
import s from '../common/Preloader.module.css'
import React from "react";

export const Preloader = () => {
    return (
        <img className={s.preloader} src={preloader} alt="Loading" />
    )
}