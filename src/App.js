import React, { Component }   from 'react';

import Articles               from './Components/Articles';
import Footer                 from './Components/Footer';
import Header                 from './Components/Header';
import Random                 from './Components/Random';
import Search                 from './Components/Search';

import './App.css';

import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      articles: []
     };
  }

  componentWillMount(){
    this.callAPI();
  }

  onUpdateQuery = (val) => {
    this.callAPI(val)
  }

  callAPI(q = " "){
    console.log("num", q.split(''))
    if( (q.split('').length) > 0){
      var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${q}&format=json&callback=?`
    }

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success:(data) => {
          this.setState({
            articles: data
          })
      }
    },  'jsonp')
  }

  handleClick(){
     window.open("https://en.wikipedia.org/wiki/Special:Random");
  }

  render() {
    return (
      <div className="App container col-xs-12">
        <Header />
        <Search onUpdate = {this.onUpdateQuery} />
        <Articles articles={this.state.articles} />
        <Random onClick ={this.handleClick} />
        <Footer medium ="iambonface" />
      </div>
    );
  }
}

export default App;
