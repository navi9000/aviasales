import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { setNewState, toggleAllStatus } from './app/searchParams'

const useStyles = makeStyles(() => ({
    gridContainer: {
        gridRow: "1 / 3",
        gridColumn: "1 / 2"
    },
    container: {
        padding: "20px 0 10px",
        width: "232px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
    },
    h2: {
        margin: "0 20px 10px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "12px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        color: "#4A4A4A"
    },
    checkboxGroup: {
        display: "block",
        boxSizing: "border-box",
        padding: "10px 20px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "10px",
        color: "#4A4A4A",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#F1FCFF"
        }
    },
    fakeCheckbox: {
        position: "relative",
        "&::before": {
            position: "absolute",
            content: "''",
            display: "inline-block",
            width: "20px",
            height: "20px",
            border: "1px solid #9ABBCE",
            boxSizing: "border-box",
            borderRadius: "2px"
        }
    },
    label: {
        lineHeight: "20px",
        marginLeft: "30px",
        cursor: "inherit"
    },
    fakeCheckboxChecked: {
        "&::before": {
            border: "1px solid #2196F3",
            backgroundImage: "url('img/checked.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "3px 5px"
        }
    },
    checkbox: {
        display: "none"
    }
}))

function SettingsBar(props) {
    const styles = useStyles()
    const dispatch = useDispatch()

    function changeHandler(e) {
        dispatch(setNewState({ param: e.target.id }))
    }

    function changeAllHandler() {
        dispatch(toggleAllStatus())
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.container}>
                <h2 className={styles.h2}>Количество пересадок</h2>
                <label htmlFor="all" className={styles.checkboxGroup}>
                    <input id="all" type="checkbox" className={styles.checkbox} value={props.all} onChange={changeAllHandler} />
                    <span className={clsx([styles.fakeCheckbox, props.all && styles.fakeCheckboxChecked])}></span>
                    <span className={styles.label}>Все</span>
                </label>
                <label htmlFor="no" className={styles.checkboxGroup}>
                    <input id="no" type="checkbox" className={styles.checkbox} value={props.no} onChange={changeHandler} />
                    <span className={clsx([styles.fakeCheckbox, props.no && styles.fakeCheckboxChecked])}></span>
                    <span className={styles.label}>Без пересадок</span>
                </label>
                <label htmlFor="one" className={styles.checkboxGroup}>
                    <input id="one" type="checkbox" className={styles.checkbox} value={props.one} onChange={changeHandler} />
                    <span className={clsx([styles.fakeCheckbox, props.one && styles.fakeCheckboxChecked])}></span>
                    <span className={styles.label}>1 пересадка</span>
                </label>
                <label htmlFor="two" className={styles.checkboxGroup}>
                    <input id="two" type="checkbox" className={styles.checkbox} value={props.two} onChange={changeHandler} />
                    <span className={clsx([styles.fakeCheckbox, props.two && styles.fakeCheckboxChecked])}></span>
                    <span className={styles.label}>2 пересадки</span>
                </label>
                <label htmlFor="three" className={styles.checkboxGroup}>
                    <input id="three" type="checkbox" className={styles.checkbox} value={props.three} onChange={changeHandler} />
                    <span className={clsx([styles.fakeCheckbox, props.three && styles.fakeCheckboxChecked])}></span>
                    <span className={styles.label}>3 пересадки</span>
                </label>
            </div>
        </div>
    )
}

export default SettingsBar