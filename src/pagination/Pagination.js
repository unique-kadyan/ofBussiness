import React from "react";
import "./Pagination.css";

export default function Pagination({
  page,
  maxPage,
  loading,
  onPrev,
  onNext,
  onPage
}) {
  const getClasses = (shouldDisable, className) => {
    if (loading || shouldDisable) {
      className = className + " disabled";
    }

    return className;
  };

  const getInnerClasses = p => {
    let className = "inner";
    if (p === page) {
      className = className + " selected";
    }
    if (p === "...") {
      className = className + " disabled";
    }
    if (loading) {
      className = className + " disabled";
    }
    return className;
  };

  const generateBasicpages = () => {
    const innerPages = [];
    if (maxPage > 5) {
      for (let i = 1, j = maxPage - 1; innerPages.length < 5; i++) {
        if (innerPages.length < 2) {
          innerPages.push(i);
        } else if (innerPages.length === 2) {
          innerPages.push("...");
        } else {
          innerPages.push(j++);
        }
      }
    } else if (maxPage <= 5) {
      for (let i = 1; i <= maxPage; i++) {
        innerPages.push(i);
      }
    }

    return innerPages;
  };

  const addAdditionalPages = innerPages => {
    if (innerPages.includes(page) || innerPages.length < 5) {
      return innerPages;
    }

    const pages = [...innerPages];
    const middle = [];
    const start = 2;
    const replaceCount = pages.length === 5 ? 1 : 5;
    if (page <= 7) {
      for (let i = pages[1] + 1; i <= 8; i++) {
        if (i !== innerPages[3] && i !== innerPages[4]) {
          middle.push(i);
        }
      }
      if (middle[middle.length - 1] + 1 !== innerPages[3]) {
        middle[middle.length - 1] = "...";
      }
    } else if (page >= maxPage - 7) {
      middle.push("...");
      const pLength = pages.length;
      for (let i = pages[pLength - 2] - 6; i < pages[pLength - 2]; i++) {
        middle.push(i);
      }
    } else {
      middle.push(...["...", page - 1, page, page + 1, "..."]);
    }

    pages.splice(start, replaceCount, ...middle);
    return pages;
  };

  const getInnerPages = () => {
    let basicPages = generateBasicpages();
    const innerPages = addAdditionalPages(basicPages);

    if (innerPages && innerPages.length > 0) {
      
      return innerPages.map(p => (
        <a
          key={p === "..." ? Math.random() : p}
          href="#"
          className={getInnerClasses(p)}
          onClick={() => p !== "..." && onPage(p)}
        >
          {p}
        </a>
      ));
      
    } else {
      return null;
    }
  };

  
  return (
    <div className="pagination-container">
      <a
        href="#"
        role="button"
        onClick={onPrev}
        className={getClasses(page === 1, "prev")}
      >
        Prev
      </a>
      {getInnerPages()}
      <a
        href="#"
        role="button"
        onClick={onNext}
        className={getClasses(maxPage === page, "next")}
      >
        Next
      </a>
    </div>
  );
  
}
