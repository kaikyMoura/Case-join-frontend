import { Tooltip } from "react-tooltip";
import Home from ".";
import "../styles/globals.css"

const App = () => {

    return (
        <>
            <Home />
            <Tooltip id="my-tooltip" place="right-start" />
        </>
    )
}

export default App;