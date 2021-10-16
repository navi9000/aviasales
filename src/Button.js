import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { showFiveMore } from './app/searchParams'

const useStyles = makeStyles(() => ({
    button: {
        width: "502px",
        height: "50px",
        background: "#2196F3",
        color: "#FFFFFF",
        borderRadius: "5px",
        border: "none",
        lineHeight: "50px",
        fontFamily: "Open Sans",
        fontWeight: 600,
        fontSize: "12px",
        textAlign: "center",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        gridRow: "3 / 4",
        gridColumn: "2 / 3",
        marginBottom: "50px"
    }
}))

function Button() {
    const styles = useStyles()
    const dispatch = useDispatch()

    function clickHandler() {
        dispatch(showFiveMore())
    }

    return (
        <button className={styles.button} onClick={clickHandler}>Показать еще 5 билетов</button>
    )
}

export default Button