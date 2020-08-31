import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/auth-reducer";
import style from "./Header.module.css";
import {RootState} from "../../redux/redux-store";
import {Avatar, Button, createStyles, Menu, MenuItem, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            marginRight: '5px',
        },
        label: {
            textTransform: 'capitalize',
            fontWeight: 300,
            fontSize: '13px',
        },
    }),
);

export const Header: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const avatar = useSelector((state: RootState) => state.myProfile.profile?.photos.small)
    const fullName = useSelector((state: RootState) => state.myProfile.profile?.fullName)
    const userName = fullName?.match(/[^ ]+ /)

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout());
        setAnchorEl(null);
    }

    const classes = useStyles();

    return (
        <div className={style.header}>
            <div className={style.logo}>
                <img src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="logo"/>
            </div>
            <div className={style.userName}>
                {isAuth ?
                    <div>
                        <Button classes={{label: classes.label}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <Avatar className={classes.small} src={avatar}/>
                            {userName}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                    :   <Button classes={{label: classes.label}}>
                        <NavLink to="/login">Login</NavLink>
                </Button>}
            </div>
        </div>
    )
};
