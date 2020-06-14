import React from "react";
import CopyrightYear from 'react-copyright-year';
import style from './Footer.module.css'


const Footer = () => {
    return (
        <footer>
            <div className={style.mainFooter}>
                <div className={style.copyright}>
                    <CopyrightYear suffix={"React Social Network"} />
                </div>
            </div>
        </footer>
    )
};

export default Footer;