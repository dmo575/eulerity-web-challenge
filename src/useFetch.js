import { useState, useEffect } from "react";

/* 
    Given a url to fetch a JSON from, it provides a stateful object that contains information about the request:
    - If the fetch is taking place:
        state value: {status: "loading"}
    - If the fetch failed:
        state value: {status: "error", msg: "the text value of the fetch request"}
    - If the fetch finished sucessfully:
        state value: {status: "done", data: "The JSON of the fetch request as an object"}
 */
function useFetch(url) {
    const [state, setState] = useState({status: "loading"});

    useEffect(() => {

        // request the data
        const requestData = async () => {

            const response = await fetch(url);

            // update state to error if fetch failed
            if (response.status != 200) {

                text = await response.text();

                setState({
                    status: "error",
                    msg: text
                });

                return;
            }

            // get JSON and update state if sucessful
            const data = await response.json();

            setState({
                status: "done",
                data: data
            });
            
        };

        requestData();

    }, []);

    return state;
}

export default useFetch;