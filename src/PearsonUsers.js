import React, { Component } from "react";

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };

    this.delete = this.delete.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.removeDuplicate = this.removeDuplicate.bind(this);
    
  }
  
  /***** Fetch the users from a HTTP endpoint ******/
  fetchUser() {
    return fetch('https://reqres.in/api/users?page=1&per_page=10',{
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      //console.error(error);
    });
  }

  /***** Functionality to remove duplicated users from the state ******/
  removeDuplicate(arr) {
    var hashTable = {};
    return arr.filter(function (el) {
      var key = JSON.stringify(el);
      var match = Boolean(hashTable[key]);

      return (match ? false : hashTable[key] = true);
    });
  }
 
  /***** Functionality to delete a user from the state ******/
  delete(item) {
    const data = this.state.users.filter((post) => {
        return parseInt(item.target.value,10) !== parseInt(post.id,10);
    });
    this.setState({users: data}); 
  }

  /***** render a list of users from the state ******/
  render() {
    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <div className="pearon-users-section">
            <List users={this.state.users} deleteEvent={this.delete} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchUser()
        .then((data) => {
          let userArr = this.state.users;
          /***** Append the result to the existing users ******/
          let concatArr = userArr.concat(data);
          this.setState({users: this.removeDuplicate(concatArr)});
        })
        .catch((err) => {
            console.error('err', err);
        });
  }
}

/***** Refactor PearsonUsers.js to use a new component to render each user profile. ******/
export class List extends Component {  
    render() {
        return (
          <ul className="pearon-users-list">
            {this.props.users && this.props.users.map((item,index) => {
                return (
                  <li key={index}>
                    <figure><img src={item.avatar} alt="" title="" /></figure> 
                    <p>{item.first_name} {item.last_name}</p>
                    <button value={item.id} onClick={this.props.deleteEvent}>Delete</button>
                  </li>);
            })}
          </ul>   
        );
    }
}
