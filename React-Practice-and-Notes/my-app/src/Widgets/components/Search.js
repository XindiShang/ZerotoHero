import React, { useState, useEffect } from "react";
import axios from "axios";

// let timer;

const Search = () => {
  const [term, setTerm] = useState("Evan You");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 这里首次渲染时，给debouncedTerm赋值相同的值，所以不会触发debouncedTerm的重新渲染
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         origin: "*",
  //         format: "json",
  //         srsearch: term,
  //       },
  //     });
  //     setResults(data.query.search);
  //   };

  //   if (term && results.length === 0) {
  //     search();
  //   } else {
  //     let timer = setTimeout(() => {
  //       search();
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }

  // }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="blank"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
