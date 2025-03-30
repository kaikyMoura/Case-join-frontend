import { MouseEventHandler, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import styles from "./styles.module.css";

const Alert = ({ Close, title, type, text, action }: {
    type: "error" | "sucess" | "notification" | "warning",
    Close?: MouseEventHandler<HTMLButtonElement>
    title: string,
    text: string | undefined
    action?: () => void
}) => {

    let color
    switch (type) {
        case "error":
            color = "red"
            break;
        case "sucess":
            color = "#2fc52d"
            break;
        case "notification":
            color = "lightblue"
        case "warning":
            color = "gold"
    }

    useEffect(() => {

    }, [color])

    return (
        <>
            <div className={`${styles.modalBlur}`} style={{ borderColor: "" }} onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-4">
                    <div className="flex itemspcenter gap-2">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {type === "warning" && <IoIosWarning fontSize={26} color={color} />}
                    </div>

                    <div className="flex items-center justify-center">
                        <p className="font-normal text-lg">{text}</p>
                    </div>
                    <div className="flex justify-between">
                        {type === "warning" && <button onClick={Close} style={{ backgroundColor: "#808080", color: "white" }}>Cancel</button>}
                        <button onClick={Close} style={{ backgroundColor: "black", color: "white" }}>{type === "warning" ? "Confirm" : "Ok"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert;