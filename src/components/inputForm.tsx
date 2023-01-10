import React from "react";
import {useForm} from "react-hook-form";
import { FormUserInputs } from "../services/apiGithubService";

interface Props {
    formUserInputs: FormUserInputs;
    setFormUserInputs: React.Dispatch<React.SetStateAction<FormUserInputs>>;
}

export const InputForm: React.FC<Props> = ({formUserInputs, setFormUserInputs}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormUserInputs>();
    const formSubmit = handleSubmit((data) => {
        setFormUserInputs(data);
        data.searchResultsPerPage = formUserInputs.searchResultsPerPage;
        data.currentPage = 1;
    })

    return <div className="form-container">
        <form className="form" onSubmit={formSubmit}>
            <label className="search-phrase">
                <input className="text-input" {...register('searchPhrase', {required: true})} defaultValue={formUserInputs.searchPhrase} type="text"></input>
            </label>
            <label className="search-phrase">
                <input className="text-input" {...register('user', {required: true})} defaultValue={formUserInputs.searchPhrase} type="text"></input>
            </label>
            <label className="search-phrase">
                <select {...register('language')}>
                    <option value="">All</option>
                    <option value="go">Go</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </label>
            <button type="submit">Search</button>
        </form>
    </div>
};