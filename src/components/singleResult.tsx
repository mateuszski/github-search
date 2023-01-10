

interface Props {
    file: string;
    description: string | null;
    user: string;
    fileUrl: string;
    userUrl: string;
}


export const SingleResult: React.FC<Props> = ({file, description, user, fileUrl, userUrl}) => {
    return <tr>
        <td>{file}<a href={fileUrl} >Go to github</a></td>
        <td>{description}</td>
        <td>{user}<button>Check user</button></td>
    </tr>

    
}