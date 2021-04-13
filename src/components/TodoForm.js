import React, { useState, useContext } from "react";

import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { TodoContext } from "../contexts/AuthContext";

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button type="submit" color="primary">
            add
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

export default TodoForm;
