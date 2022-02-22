import {useEffect, useState} from "react";
import axios from "axios";

export const useGetRequest = (url, listener) => {
    const [storage, setStorage] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                setStorage(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [listener]);

    return storage;
};
