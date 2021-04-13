import React from "react";
import { Link } from "react-router-dom";

class Page404 extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="text-center my-5">Page not found.</h3>
        <div className="text-center">
          <Link to="/dashboard">トップページへ</Link>
        </div>
      </div>
    );
  }
}

export default Page404;
