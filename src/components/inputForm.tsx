import React, {useEffect} from "react";
import { FormUserInputs } from "../services/apiGithubService";

interface Props {
    formUserInputs: FormUserInputs;
    setFormUserInputs: React.Dispatch<React.SetStateAction<FormUserInputs>>;
}

export const InputForm: React.FC = () => {
    const formSubmit = () => {
        console.log("formSubmit");
    }

    return <div className="form-container">
        <form className="form" onSubmit={formSubmit}>
            <label className="search-phrase">
                <input></input>
            </label>
            <label className="search-phrase">
                <input></input>
            </label>
            <label className="search-phrase">
                <select>
                    <option value="go">Go</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </label>
            <button type="submit">Search</button>
        </form>
    </div>
};