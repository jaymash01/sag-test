import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

const Page = ({ title, subtitle, toolbar, children }) => {

  return (
    <>
    <Paper
      sx={{
        p: 3,
        m: 3,
        boxShadow: "0 3px 24px 0 rgba(208, 208, 208, 0.15)",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        pt={2}
      >
        <Box>
          <Typography
            variant="body1"
            component="div"
          >
            {title}
          </Typography>
          {subtitle ?
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mt: 1 }}
            >
              {subtitle}
            </Typography>
            : null
          }
        </Box>
        <Box flexGrow={1} />
        {toolbar}
      </Stack>
      <Divider sx={{ my: 2 }} />
      {children}
    </Paper>
    </>
  );
};

export default Page;
