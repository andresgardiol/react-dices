import './App.css';
import {DiceTable} from "./dice/DiceTable";
import {useEffect, useState} from "react";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

function App() {

    let queryParams = useQueryParams();

    return (
        <div className="App">
            <DiceTable/>
        </div>
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
    let prevSearch = history.location.search? history.location.search + "&" : '?';
    history.push({search: `${prevSearch}${encodeURIComponent(key)}=${encodeURIComponent(value)}`})
}


export default App;
