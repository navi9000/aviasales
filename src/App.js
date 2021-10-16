import './App.css'
import Logo from './Logo'
import CheapOrFastBar from './CheapOrFastBar'
import ResultWrapper from './ResultWrapper'
import Button from './Button'
import { makeStyles } from '@material-ui/core/styles'
import SettingsBar from './SettingsBar'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  container: {
    width: "754px",
    margin: "0 auto"
  },
  gridContainer: {
    display: "grid",
    gridGap: "20px"
  }
}))

async function requestHandler(url) {
  let result
  try {
    const response = await fetch(url)
    if (response.ok) {
      result = await response.json()
    } else result = { error: 'Error! Response status: ' + response.status }
  } catch (e) {
    result = { error: e }
  } finally {
    return result
  }
}

async function recursiveRequestsHandler(arr, searchId) {
  const result = await requestHandler(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
  if (result.error) return recursiveRequestsHandler(arr, searchId)
  return result.stop ? [...arr, ...result.tickets] : recursiveRequestsHandler([...arr, ...result.tickets], searchId)
}

async function fetchResult() {
  const initialResponse = await requestHandler('https://front-test.beta.aviasales.ru/search')
  const tickets = await recursiveRequestsHandler([], initialResponse.searchId)
  return tickets
}

function App() {
  const styles = useStyles()
  const [tickets, populateTickets] = useState([])
  const [filteredTickets, changeFilteredTickets] = useState(tickets)
  useEffect(() => {
    fetchResult().then(result => populateTickets(result))
  }, [])

  const allStatus = useSelector(state => state.params.all)
  const noStatus = useSelector(state => state.params.no)
  const oneStatus = useSelector(state => state.params.one)
  const twoStatus = useSelector(state => state.params.two)
  const threeStatus = useSelector(state => state.params.three)
  const cheapStatus = useSelector(state => state.params.cheap)
  const fastStatus = useSelector(state => state.params.fast)

  useEffect(() => {
    if (tickets.length !== 0) {

      let filteredArr = tickets.map(ticket => {
        return {
          ...ticket, segments: ticket.segments.filter(segment =>
            (noStatus && segment.stops.length === 0) ||
            (oneStatus && segment.stops.length === 1) ||
            (twoStatus && segment.stops.length === 2) ||
            (threeStatus && segment.stops.length === 3)
          )
        }
      }).filter(ticket => ticket.segments.length !== 0)

      if (cheapStatus) {
        filteredArr.sort((a, b) => a.price - b.price)
      } else {
        filteredArr.sort((a, b) => Math.min(...a.segments.map(el => el.duration)) - Math.min(...b.segments.map(el => el.duration)))
      }
      changeFilteredTickets(filteredArr)
    }

  }, [tickets, noStatus, oneStatus, twoStatus, threeStatus, cheapStatus, fastStatus])

  return (
    <div className="App">
      <div className={styles.container}>
        <Logo />
        <div className={styles.gridContainer}>
          <CheapOrFastBar cheap={cheapStatus} fast={fastStatus} />
          <SettingsBar all={allStatus} no={noStatus} one={oneStatus} two={twoStatus} three={threeStatus} />
          <ResultWrapper tickets={filteredTickets} />
          <Button />
        </div>
      </div>
    </div>
  )
}

export default App
