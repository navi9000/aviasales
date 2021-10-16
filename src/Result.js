import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    container: {
        background: "#FFFFFF",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        width: "502px",
        minHeight: "184px",
        padding: "20px",
        boxSizing: "border-box"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    price: {
        fontFamily: "Open Sans",
        fontWeight: "600",
        fontSize: "24px",
        color: "#2196F3",
        margin: 0,
        lineHeight: "36px"
    },
    img: {
        display: "block"
    },
    segmentWrapper: {
        display: "flex",
        gap: "20px",
        marginTop: "10px"
    },
    flexElement: {
        width: "141px"
    },
    sectorLineOne: {
        fontFamily: "Open Sans",
        fontWeight: 600,
        fontSize: "12px",
        lineHeight: "18px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        color: "#A0B0B9",
        margin: 0
    },
    sectorLineTwo: {
        fontFamily: "Open Sans",
        fontWeight: 600,
        fontSize: "14px",
        color: "#4A4A4A",
        margin: 0
    }
}))

function zeroPad(num) {
    var zero = 2 - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function stopsTextBuilder(num) {
    switch (num) {
        case 3:
        case 2:
            return num + ' пересадки'
        case 1:
            return '1 пересадка'
        case 0:
            return 'Без пересадок'
        default:
            throw new Error('Invalid number of stops')
    }
}

function Segment(props) {

    const date = new Date(props.date)
    const departureHours = date.getHours()
    const departureMinutes = date.getMinutes()
    const flightHours = Math.floor(props.duration / 60)
    const flightMinutes = props.duration % 60
    let arrivalHours = 0
    let arrivalMinutes = departureMinutes + flightMinutes
    if (arrivalMinutes >= 60) {
        arrivalMinutes = arrivalMinutes % 60
        arrivalHours += 1
    }
    arrivalHours = (arrivalHours + departureHours + flightHours) % 24

    return (
        <div className={props.styles.segmentWrapper}>
            <div className={props.styles.flexElement}>
                <p className={props.styles.sectorLineOne}>{props.origin} – {props.destination}</p>
                <p className={props.styles.sectorLineTwo}>
                    {`${zeroPad(departureHours)}:${zeroPad(departureMinutes)}`} – {`${zeroPad(arrivalHours)}:${zeroPad(arrivalMinutes)}`}
                </p>
            </div>
            <div className={props.styles.flexElement}>
                <p className={props.styles.sectorLineOne}>В пути</p>
                <p className={props.styles.sectorLineTwo}>{flightHours}ч {zeroPad(flightMinutes)}м</p>
            </div>
            <div className={props.styles.flexElement}>
                <p className={props.styles.sectorLineOne}>
                    {stopsTextBuilder(props.stopsNumber)}
                </p>
                <p className={props.styles.sectorLineTwo}>{props.stops}</p>
            </div>
        </div>
    )
}

function Result(props) {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            {props.data &&
                (
                    <div>
                        <div className={styles.header}>
                            <p className={styles.price}>{props.data.price} Р</p>
                            <img className={styles.img} src={`//pics.avs.io/99/36/${props.data.carrier}.png`} alt={props.data.carrier} />
                        </div>
                        {props.data.segments.map(segment =>
                        (<Segment
                            key={segment.origin + '-' + segment.destination + '_' + segment.duration}
                            styles={styles}
                            origin={segment.origin}
                            destination={segment.destination}
                            duration={segment.duration}
                            stops={segment.stops.join(', ')}
                            stopsNumber={segment.stops.length}
                            date={segment.date}
                        />))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Result