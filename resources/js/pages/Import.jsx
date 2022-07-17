import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, LinearProgress } from "@mui/material";
import Page from "../components/Page";

import { usePost } from "../hooks";

const Import = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const formData = useMemo(() => new FormData(), []);

  const { data, loading, error, handlePost } = usePost("api/import", formData);

  const handleSubmit = () => {
    if (file) {
      formData.append("file", file);
      handlePost();
    }
  };

  useEffect(() => handleSubmit(), [file]);

  useEffect(() => {
    if (data) {
      window.setTimeout(() => {
        navigate("/data-table");
      }, 1500);
    }
  }, [data]);

  const handleResponse = () => {
    if (data || error) {
      return (
        <Alert
          sx={{ mb: 2 }}
          severity={error ? "error" : "success"}
        >
          {error ? "An error occurred." : data ? data.message : null}
        </Alert>
      );
    }

    return null;
  };

  return (
    <Page title="Import">
      {loading ? <LinearProgress sx={{ mb: 2 }} /> : null}
      {handleResponse()}

      <Button
        disabled={loading}
        color="primary"
        variant="contained"
        component="label"
        disableElevation
      >
        {file ? <>{file.name}</> : <>Upload File</>}
        <input
          disabled={loading}
          type="file"
          hidden
          accept="application/csv"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </Button>
    </Page>
  );
};

export default Import;
