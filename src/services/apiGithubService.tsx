import React from "react";
import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";

export interface FormUserInputs {
    searchPhrase: string;
    user: string;
    language: string;
    currentPage: number;
    searchResultsPerPage: number;
}

const octokit = new Octokit({});

export type searchParametrs = Endpoints["GET /search/code"]["parameters"];
export type searchResponse = Endpoints["GET /search/code"]["response"];

export const CreateParametersForSearch = (formUserInputs: FormUserInputs): searchParametrs => {
    let query = `q=${formUserInputs.searchPhrase}+user:${formUserInputs.user}`;
    if (formUserInputs.language !== "") {
        query += `+language:${formUserInputs.language}`;
    }
    return {q: query, per_page: formUserInputs.searchResultsPerPage, page: formUserInputs.currentPage};
};

export const apiSearch = async (searchParametrs: searchParametrs ) => {
    try{
        const response = await octokit.request("GET /search/code", searchParametrs);
        if(response.status === 200){
            console.log(response);
            return response;
        }
    }
    catch(error){
        console.log(error);
    }
}
