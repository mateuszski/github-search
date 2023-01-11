import React from "react";
import { searchDataResponse } from "../services/apiService";
import { TableRow } from "./tableRow";

interface ResultsTableProps {
  searchResult: searchDataResponse;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ searchResult }) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <td>File</td>
            <td>Repo description</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {searchResult.data.items.map((item, index) => {
            return (
              <TableRow
                key={index}
                name={item.name}
                description={item.repository.description}
                ownerName={item.repository.owner.login}
                fileHtml={item.html_url}
                avatar={item.repository.owner.avatar_url}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
