import './App.css';
import {DiceTable} from "./dice/DiceTable";
import {useEffect, useState} from "react";
import {createBrowserHistory} from 'history';
import {Container} from "react-bootstrap";

export const history = createBrowserHistory();

function App() {

    let queryParams = useQueryParams();

    return (
        <Container fluid="md" className="App">
            <DiceTable/>
        </Container>
    );
}


export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useState(getQueryParamsObject(history.location.search));
    console.log("QueryParams:", queryParams);

    useEffect(() => {
        function listener({location}) {
            setQueryParams(getQueryParamsObject(location.search));
            console.log("QueryParams:", queryParams);
        }

        let unlisten = history.listen(listener);

        return () => unlisten();
    });
    return queryParams;
}

export const getQueryParamsObject = (searchString) => {
    let pairs = searchString.substring(1).split("&");
    let obj = {};
    let pair;

    function getValue(valueString) {
        if (valueString.includes('[')) {
            valueString = valueString.replace('[', '');
            valueString = valueString.replace(']', '');
            return valueString.split(',').map(value => {
                function isNumeric(num) {
                    return !isNaN(num)
                }

                if (isNumeric(value)) return +value;
                return value;
            });
        }
        return pair[1];
    }

    for (let i in pairs) {
        if (pairs[i] === "") continue;

        pair = pairs[i].split("=");
        let value = getValue(decodeURIComponent(pair[1]));
        obj[decodeURIComponent(pair[0])] = value;
    }

    return obj;
}

export const setQueryParam = (key, value) => {
    history.push({search: `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`, pathname: ''})
}


export default App;
