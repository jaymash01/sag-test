import React, { useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Alert, MenuItem, Select, Stack, TextField } from "@mui/material";
import Page from "../components/Page";
import { useFetch } from "../hooks";

const DataTableReport = () => {

  const { data: countries } = useFetch("api/countries", null, true, [], (response) => response.data.data);

  const [params, setParams] = useState({
    page: 1,
    per_page: 50,
    country_code: "",
    year: ""
  });

  const columns = useMemo(() => [
    {
      field: "index",
      headerName: "S/N",
      width: 100,
      valueGetter: (params1) => ((params.per_page * (params.page - 1)) + params1.api.getRowIndex(params1.row.id) + 1)
    },
    {
      field: "country_name",
      headerName: "Country Name",
      flex: 1,
    },
    {
      field: "country_code",
      headerName: "Country Code",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
    },
    {
      field: "life_expectancy",
      headerName: "Life Expectancy",
      flex: 1,
    }
  ], [params]);

  const { data, loading, error, handleFetch } = useFetch("api/index", params, true, {
    data: [],
    total: 0,
    page: 1
  }, (response) => response.data.data);

  return (
    <Page
      title="Life Expectancy at Birth"
      toolbar={(
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Select
            variant="outlined"
            size="small"
            sx={{ width: 180 }}
            displayEmpty
            value={params.country_code}
            onChange={(event) => setParams({ ...params, country_code: event.target.value })}
          >
            <MenuItem
              disabled
              value=""
            >
              Country
            </MenuItem>
            {countries.map(e => (
              <MenuItem
                key={e.country_code}
                value={e.country_code}
              >
                {e.country_name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            placeholder="Year"
            variant="outlined"
            size="small"
            sx={{ width: 180 }}
            onChange={(event) => setParams({ ...params, year: event.target.value })}
          />
        </Stack>
      )}
    >
      {error ?
        <Alert
          sx={{ mb: 2 }}
          severity="error"
        >
          An error occurred.
        </Alert>
        : null
      }

      <DataGrid
        autoHeight
        loading={loading}
        columns={columns}
        rows={data.data}
        rowCount={data.total}
        page={params.page - 1}
        pageSize={params.per_page}
        paginationMode="server"
        onPageChange={(page) => setParams({ ...params, page: page + 1 })}
        onPageSizeChange={(pageSize) => setParams({ ...params, page: 1, per_page: pageSize })}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        disableSelectionOnClick
        initialState={{
          pagination: {
            page: params.page - 1,
            pageSize: params.per_page,
          },
        }}
      />
    </Page>
  );
};

export default DataTableReport;
