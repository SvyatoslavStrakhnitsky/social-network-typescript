import React from "react";
import styles from "./FormControls.module.css"



export const FormControl: React.FC<any> = ({input, meta, ...props}) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={hasError ? styles.error : ""}>
            {props.children}
            {hasError && <div className={styles.error}>{meta.error}</div>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<any> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}