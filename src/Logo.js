import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    container: {
        padding: "50px 0",
        boxSizing: "border-box",
        textAlign: "center"
    },
    img: {
        width: "82px",
        height: "89px"
    }
}))

function Logo() {
    const styles = useStyles()
    return (
        <div className={styles.container}>
            <img className={styles.img} src="img/Logo.svg" alt="Logo" />
        </div>
    )
}

export default Logo