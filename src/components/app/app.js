import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Victoria R', salary: 1500, increase: true, rise: false, id: 2},
        {name: 'Rayan W', salary: 4500, increase: false, rise: false, id: 3},
      ],
      term: '',
      filter: 'all'
    };
    this.maxId = 3;
  }

  onDelete = (id) => {
    this.setState(({data}) => ({
      data: data.filter(el => el.id !== id),
    }));
  }

  onAdd = (name, salary) => {
    this.maxId++;
    this.setState(({data}) => ({
      data: [...data, {name, salary, id: this.maxId}]
    }));
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(e => {
        return e.id === id ? {...e, [prop]: !e[prop]} : e;
      })
    }));
  }

  searchEmp = (data, term) => {
    return term.length > 0 ? data.filter(e => e.name.indexOf(term) > -1) : data;
  }

  onSearchUpdate = (term) => {
    this.setState({term});
  }

  filterEmp = (data, filter) => {
    switch(filter) {
      case 'rise':
        return data.filter(e => e.rise);
      case 'moreThen1000':
        return data.filter(e => e.salary > 1000);
      default :
        return data;
    }
  }

  onFilterUpdate = (filter) => {
    this.setState({filter});
  }
  
  onSalaryUpdate = (id, inpt) => {
    this.setState({
      data: this.state.data.map(e => e.id === id ? {...e, salary: inpt} : e)
    })
  }
  
  render() {

    const {data, term, filter} = this.state,
          totalEmployees = data.length,
          totalIncrease = data.filter(e => e.increase).length,
          visibleData = this.filterEmp(this.searchEmp(data, term), filter);
    
    return (
      <div className="app">
          <AppInfo 
            totalEmployees={totalEmployees}
            toRise={totalIncrease} />
  
          <div className="search-panel">
              <SearchPanel onSearchUpdate={this.onSearchUpdate} />
              <AppFilter 
                filter={filter} 
                onFilterUpdate={this.onFilterUpdate} />
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.onDelete}
            onToggleProp={this.onToggleProp}
            onSalaryUpdate={this.onSalaryUpdate} />

          <EmployeesAddForm onAdd={this.onAdd}/>
      </div>
    );
  }
}

export default App;
