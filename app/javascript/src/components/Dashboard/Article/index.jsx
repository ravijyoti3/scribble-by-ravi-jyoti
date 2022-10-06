import React from "react";

import { Button, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import ColumnsDropDown from "./ColumnsDropDown";
import LeftMenuBar from "./LeftMenuBar";
import Table from "./Table";

const index = () => (
  <div className="flex items-start">
    <LeftMenuBar showMenu />
    <Container>
      <Header
        actionBlock={
          <div className="flex items-center justify-between">
            <ColumnsDropDown />
            <Button
              className="ml-3"
              icon="ri-add-line"
              label="Add New Article"
              onClick={() => {}}
            />
          </div>
        }
        searchProps={{
          placeholder: "Search article title",
        }}
      />
      <Typography className="mb-5" style="h3">
        67 Articles
      </Typography>
      <Table />
    </Container>
  </div>
);

export default index;
