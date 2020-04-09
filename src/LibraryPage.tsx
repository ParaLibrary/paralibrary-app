import React from "react";
import { useParams } from "react-router-dom";

const LibraryPage: React.FC = () => {
  const { id } = useParams();
  return <span>User ID: {id}</span>;
};

export default LibraryPage;
