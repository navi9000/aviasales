import Result from "./Result"
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
    container: {
        gridRow: "2 / 3",
        gridColumn: "2 / 3",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    }
}))

function ResultWrapper(props) {
    const styles = useStyles()
    const maxResults = useSelector(state => state.params.maxResults)
    return (
        <div className={styles.container}>
            {props.tickets.slice(0, maxResults).map(res =>
                (<Result key={res.carrier + '_' + res.segments[0].origin + '-' + res.segments[0].destination + '_' + res.price} data={res} />)
            )}
        </div>
    )
}

export default ResultWrapper