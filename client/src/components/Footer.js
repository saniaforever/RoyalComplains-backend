import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1">
          Connect with Sania on LinkedIn{" "}
          <a
            href="https://www.linkedin.com/in/sania-mukadam-181814265"
            target="_blank"
          >
            LinkedIn
          </a>
          ! ⭐
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
