import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";

const octokit = new Octokit({});

export type searchDataParameters = Endpoints["GET /search/code"]["parameters"];
export type searchDataResponse = Endpoints["GET /search/code"]["response"];

export const searchParamteres = (
  phrase: string,
  owner: string,
  language: string,
  currentPage: number,
  itemsPerPage: number
): searchDataParameters => {
  let queryString = `q=${phrase}+user:${owner}`;
  if (language !== "null") {
    queryString += `+language:${language}`;
  }
  return { q: queryString, per_page: itemsPerPage, page: currentPage };
};

export const apiSearch = async (params: searchDataParameters) => {
  try {
    const result = await octokit.request("GET /search/code", {
      q: params.q,
      page: params.page,
      per_page: params.per_page,
    });
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
