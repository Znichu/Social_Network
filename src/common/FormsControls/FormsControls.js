import React from "react";

export const Textarea = ({input, meta, ...props}) => {

    let classMane = meta.touched && meta.error ? "form-control is-invalid" : "form-control";

    return (
        <div>
            {
                meta.touched && meta.error &&
                <div className="alert alert-danger" role="alert">
                    {meta.error}
                </div>
            }
            <textarea {...input} {...props} className={classMane}/>
        </div>
    )
};

export const InputLogin = ({input, meta, ...props}) => {

    let classMane = meta.touched && meta.error ? "form-control is-invalid" : "form-control";

    return (
        <div>
            {
                meta.touched && meta.error &&
                <div className="alert alert-danger" role="alert">
                    {meta.error}
                </div>
            }
            <input {...input} {...props} data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." className={classMane}/>
        </div>
    )
};
