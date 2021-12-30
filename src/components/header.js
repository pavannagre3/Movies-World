import '../App.css';
import { useState, useEffect } from "react";
import Movies from './movies'


function Header({ getData }) {
    const [input, setInput] = useState("");
    const [movie, setMovie] = useState("");
    const [bool, setBool] = useState(false);

    const [sortedData, setSortedData] = useState(getData);
    const [searchArr, setSearchArr] = useState([]);

    function searchFunction() {
        let result = getData.filter((el) => { if (el.Title.toUpperCase().includes(`${movie.toUpperCase()}`) && (movie !== "")) { return el } else { return ""; } });
        setSearchArr(result);
    }

    function byIMDb() {
        const resImdb = getData.sort(function (a, b) { return b.imdbRating - a.imdbRating; });
        setSortedData([...resImdb]);
    }

    function byBoxOffice() {
        const resMetaScore = getData.sort(function (a, b) { return b.Metascore - a.Metascore; });
        setSortedData([...resMetaScore]);
    }

    function byYear() {
        const resYear = getData.sort(function (a, b) { return b.Year - a.Year; });
        setSortedData([...resYear]);
    }

    function boolfn() {
        if (movie !== "") {
            setBool(true);
        }
        else {
            setBool(false);
        }
    }

    useEffect(() => {
        console.log("in useeffect")
        searchFunction();
        boolfn();
    }, [movie])

    return (
        <>

            <div className='navbar'>
                <div><h1>Movies World</h1></div>
                <div>
                    <input type="text" placeholder="Search movie by name" value={input} onChange={(event) => { setInput(event.target.value) }} />
                    <button onClick={() => {
                        setMovie(input);
                        setInput("");
                    }}>Search</button>
                </div>
                <div>
                    <button onClick={() => { byIMDb() }} >Sort By IMDb Rating</button>
                    <button onClick={() => { byBoxOffice() }} >Sort By Metascore</button>
                    <button onClick={() => { byYear() }} >Sort By Year</button>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {bool
                    ?
                    <>{searchArr.length ? <Movies getData={searchArr} /> : <h1>Sorry ! No movie found. 😐</h1>} </>

                    : <Movies getData={sortedData} />}
            </div>
        </>
    );
}

export default Header;
