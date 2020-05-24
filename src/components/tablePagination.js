import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { COMMON_CONSTANT } from './../constant/constant'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const pagination = (props) => {
    const classes = useStyles();
    const isPreviewDisable = props.currentPage === 0 ? true : false;
    const isNextDisable = props.currentPage === props.totalPage ? true : false;
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className="pagination-sec"
            >
                <Grid item xs={12} className='preview-next-btn' >
                    <ul className="ul-action-bt">
                        <li><Button color="secondary" disabled={isPreviewDisable} onClick={() => props.handlePagination(COMMON_CONSTANT.PREVIEW)}> {COMMON_CONSTANT.PREVIEW}</Button></li>
                        <li>|</li>
                        <li><Button color="secondary" disabled={isNextDisable} onClick={() => props.handlePagination(COMMON_CONSTANT.NEXT)}>{COMMON_CONSTANT.NEXT}</Button></li>
                    </ul>
                </Grid>



            </Grid>
        </div>
    );
}

export default pagination