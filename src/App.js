import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get("/api/donation")
      .then(res => {
        this.setState({ donations: res.data });
        console.log(this.state.donations);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              DONATIONS CATALOG &nbsp;
              {localStorage.getItem("jwtToken") && (
                <button class="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              )}
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.donations.map(donation => (
                  <tr>
                    <td>
                      <Link to={`/show/${donation._id}`}>{donation.item}</Link>
                    </td>
                    <td>{donation.category}</td>
                    <td>{donation.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
