import React, { useState, useContext } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { TodoContext } from "../contexts/AuthContext";

const ApplyForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="row" alignItems="center" justify="center">
        <TextField
          label="inputs"
          defaultValue="Hello World"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          追加
        </Button>
      </Grid>
    </form>
  );
};

export default ApplyForm;
