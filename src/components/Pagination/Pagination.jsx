import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange, isModalOpen }) => {
  const [inputValue, setInputValue] = React.useState(currentPage + 1);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleInputChange = (evt) => {
    if (Number(evt.target.value) > totalPages + 1) {
      setInputValue(Math.min(Number(evt.target.value), totalPages + 1));
    } else {
      setInputValue(evt.target.value);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handlePageChange(Number(inputValue) - 1);
    inputRef.current.blur();
  };

  const renderPageButton = (page, label) => (
    <button
      key={page + 1}
      className="pagination__button pagination__button_selection"
      onClick={() => handlePageChange(page)}
      disabled={page === currentPage}
    >
      {label || page + 1}
    </button>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 3) pageNumbers.push(renderPageButton(0, "First"));

    for (
      let i = Math.max(0, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(renderPageButton(i));
    }

    if (currentPage < totalPages - 2)
      pageNumbers.push(renderPageButton(totalPages, "Last"));

    return pageNumbers;
  };

  React.useEffect(() => {
    setInputValue(currentPage + 1);
  }, [currentPage]);

  React.useEffect(() => {
    const handleKeyDown = (evt) => {
      if (isInputFocused || evt.repeat || isModalOpen) return;

      if (evt.key === "ArrowLeft" && currentPage > 0) {
        onPageChange(currentPage - 1);
      } else if (evt.key === "ArrowRight" && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages, onPageChange, isInputFocused]);

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        {currentPage !== 0 && (
          <button
            type="button"
            className="pagination__button"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous Page
          </button>
        )}
        <form className="pagination__form" onSubmit={handleFormSubmit}>
          <input
            className="pagination__form_input"
            ref={inputRef}
            type="number"
            value={inputValue}
            placeholder="Page #"
            min={1}
            max={totalPages + 1}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button type="submit" className="pagination__button">
            Go
          </button>
        </form>
        {currentPage !== totalPages && (
          <button
            type="button"
            className="pagination__button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Page
          </button>
        )}
      </div>

      <div className="pagination__page-numbers">{renderPageNumbers()}</div>
    </div>
  );
};

export default Pagination;
