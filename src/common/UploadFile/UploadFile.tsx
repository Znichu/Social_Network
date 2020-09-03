import React, {ChangeEvent} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
          color: '#ffffff'
        },
        input: {
            display: 'none',
        },
    }),
);

type PropsType = {
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const UploadFile: React.FC<PropsType>  = (props) => {
    const classes = useStyles();

    return (
        <div >
            <input onChange={props.onFileChange} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton classes={{root: classes.root}} aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    );
}