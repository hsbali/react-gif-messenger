import axios from "axios";

export const getGifs = async (offset) => {
    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&offset=${offset}`)
        return response.data;
    } catch (err) {
        console.log(err)
        return err.response.data;
    }
}

export const getSearchedGifs = async (offset, query) => {
    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${query}&limit=25&offset=${offset}`)
        return response.data;
    } catch (err) {
        console.log(err)
        return err.response.data;
    }
}