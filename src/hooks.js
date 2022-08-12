import { useState, useEffect } from "react";

export function useFetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://jsonplaceholder.typicode.com/posts", { signal })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Canceled!!");
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { data };
}

export function usePaginatedData() {
  const { data } = useFetchData();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerpage] = useState(10);

  const numberOfTotalPages = Math.ceil(data.length / perPage);
  const pages = Array.from(
    { length: numberOfTotalPages + 1 },
    (v, i) => i
  ).slice(1);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const paginatedData = data.slice(indexOfFirst, indexOfLast);

  return {
    pages,
    numberOfTotalPages,
    paginatedData,
    setCurrentPage,
    setPerpage,
    currentPage,
  };
}
