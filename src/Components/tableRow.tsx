import React from "react";

interface Props {
  name: string;
  description: string | null;
  ownerName: string;
  fileHtml: string;
  avatar: string;
}

export const TableRow: React.FC<Props> = ({
  name,
  description,
  ownerName,
  fileHtml,
  avatar,
}) => {
  return (
    <tr>
      <td className="td-file">
        {name}
        <a href={fileHtml} target="_blank" rel="noreferrer">
          <i className="fas fa-file"></i>
        </a>
      </td>
      <td className="td-description">{description}</td>
      {/* <td className="td-owner"> */}
      <td className="avatar">
        {ownerName}
        <img src={avatar} alt="avatar" />
      </td>
    </tr>
  );
};
