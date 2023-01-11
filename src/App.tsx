import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Form } from "./Components/form";
import {
  apiSearch,
  searchParamteres,
  searchDataParameters,
  searchDataResponse,
} from "./services/apiService";
import { ResultsTable } from "./Components/table";
import { PaginationBar } from "./Components/pagination";
import { ItemsNumberChanger } from "./Components/rowsPerSite";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isData, setIsData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchResult, setSearchResult] = useState<
    searchDataResponse | undefined
  >(undefined);
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");
  const [searchedUser, setSearchedUser] = useState<string>("");
  const [searchedLanguage, setSearchedLanguage] = useState<string>("");
  const [maxPage, setMaxPage] = useState<number>(0);
  const searchParams = useRef<searchDataParameters>({ q: "" });
  const maxNumberOfData = 1000;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      searchParams.current = searchParamteres(
        searchedPhrase,
        searchedUser,
        searchedLanguage,
        currentPage,
        itemsPerPage
      );
      if (searchedPhrase !== "" && searchedUser !== "") {
        const res = await apiSearch(searchParams.current);
        if (res?.status === 200 && res.data.total_count > 0) {
          setIsData(true);
          setSearchResult(res);
          if (res.data.total_count > maxNumberOfData) {
            res.data.total_count = maxNumberOfData;
          }
          const maxPageValue = Math.ceil(res.data.total_count / itemsPerPage);
          if (currentPage > maxPageValue) {
            setCurrentPage(maxPageValue - 1);
          }
          setMaxPage(maxPageValue);
        } else if (res?.status === 200) {
          setIsData(false);
        } else {
        }
      }
      setIsLoading(false);
    };
    getData();
  }, [
    currentPage,
    searchedPhrase,
    searchedUser,
    searchedLanguage,
    itemsPerPage,
  ]);

  useEffect(() => {
    const filtersData = window.localStorage.getItem("filters");
    if (filtersData) {
      const filtersValues = JSON.parse(filtersData);
      setSearchedPhrase(filtersValues.searchedPhrase);
      setSearchedUser(filtersValues.searchedUser);
      setSearchedLanguage(filtersValues.searchedLanguage);
      setItemsPerPage(filtersValues.itemsPerPage);
    }
  }, []);

  useEffect(() => {
    const valuesToSave = {
      searchedPhrase,
      searchedUser,
      searchedLanguage,
      itemsPerPage,
    };
    window.localStorage.setItem("filters", JSON.stringify(valuesToSave));
  }, [searchedPhrase, searchedUser, searchedLanguage, itemsPerPage]);

  return (
    <div className="App">
      <Form
        onSubmit={({ phrase, owner, language }) => {
          setCurrentPage(0);
          setSearchedLanguage(language);
          setSearchedUser(owner);
          setSearchedPhrase(phrase);
        }}
        phrase={searchedPhrase}
        owner={searchedUser}
        language={searchedLanguage}
      />

      {isData && searchResult && !isLoading && (
        <ResultsTable searchResult={searchResult} />
      )}
      {isLoading && <p>Loading....</p>}
      {!isData && <p>There is no data for this search</p>}
      {!isLoading && (
        <ItemsNumberChanger
          itemsPerPage={itemsPerPage}
          changeNumberOfItems={({ itemsPerPage }) => {
            setItemsPerPage(itemsPerPage);
          }}
        />
      )}
      {searchResult && isData && (
        <PaginationBar
          maxPage={maxPage}
          changeCurrentPage={(selectedItem: { selected: number }) =>
            setCurrentPage(selectedItem.selected)
          }
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default App;
