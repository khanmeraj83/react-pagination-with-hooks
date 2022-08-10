import "./App.css";

import { usePaginatedData } from "./hooks";
export default function App() {
  const {
    pages,
    numberOfTotalPages,
    paginatedData,
    setCurrentPage,
    setPerpage,
    currentPage,
  } = usePaginatedData();

  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage !== numberOfTotalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="App">
      <h1>Customize react pagination</h1>
      <h2>All posts</h2>
      <select
        onChange={(e) => {
          setPerpage(e.target.value);
        }}
      >
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>

      {paginatedData.map(({ title, id }) => (
        <div key={id}>{title}</div>
      ))}

      {
        <div style={{ display: "flex" }}>
          <span onClick={handlePrev}>Prev</span>
          {pages.map((page) => (
            <div key={page} onClick={() => setCurrentPage(page)}>
              <div className={page === currentPage ? "PageHighlight" : ""}>
                {page}|
              </div>
            </div>
          ))}
          <span onClick={handleNext}>Next</span>
        </div>
      }
    </div>
  );
}
