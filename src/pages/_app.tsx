import { Tooltip } from "react-tooltip";
import Home from ".";
import "../styles/globals.css"
import Header from "@/components/Header";

const App = () => {

    return (
        <>
            <Header />
            <Home />
            <Tooltip id="my-tooltip" place="right-start" />
        </>
    )
}

export default App;