import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { setNewState } from './app/searchParams'

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        width: "502px",
        height: "50px",
        flexGrow: 1,
        gridColumn: "2 / 3",
        gridRow: "1 / 2"
    },
    item: {
        width: "251px",
        background: "#FFFFFF",
        border: "1px solid #DFE5EC",
        boxSizing: "border-box",
        fontFamily: "Open Sans",
        fontWeight: 600,
        fontSize: "12px",
        lineHeight: "50px",
        textAlign: "center",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        color: "#4A4A4A"
    },
    itemLeft: {
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px"
    },
    itemRight: {
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px"
    },
    itemActive: {
        background: "#2196F3",
        color: "#FFFFFF",
        border: "none"
    }
}))

function CheapOrFastBar(props) {
    const styles = useStyles()
    const dispatch = useDispatch()

    function changeHandler(e) {
        if (props.cheap || props.fast) {
            if (props.cheap) {
                dispatch(setNewState({ param: 'cheap' }))
            }
            if (props.fast) {
                dispatch(setNewState({ param: 'fast' }))
            }
        }
        dispatch(setNewState({ param: e.target.id }))
    }

    return (
        <div className={styles.container}>
            <div id="cheap" className={clsx([styles.item, styles.itemLeft, props.cheap && styles.itemActive])} onClick={changeHandler}>Самый дешевый</div>
            <div id="fast" className={clsx([styles.item, styles.itemRight, props.fast && styles.itemActive])} onClick={changeHandler}>Самый быстрый</div>
        </div>
    )
}

export default CheapOrFastBar