import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: this.props.salary
        }
    }
    onInput = (e) => {
        const val = e.target.value.replace(/\D/gi, '');
        this.setState({salary: val});
        
        this.props.onSalaryUpdate(this.props.id, val);
    }
    
    render () {
        const {name, onDelete, increase, rise, onToggleProp} = this.props;
    
        let classNames = 'list-group-item d-flex justify-content-between';
    
        if (increase) classNames += ' increase';
        if (rise) classNames += ' like';
    
    
        return (
            <li className={classNames}>
                <span onClick={onToggleProp} className="list-group-item-label" data-toggle="rise">{name}</span>
                <input 
                    type="text" 
                    className="list-group-item-input"
                    value={`${this.state.salary}$`}
                    onChange={this.onInput} />
                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                        onClick={onToggleProp} 
                        type="button"
                        className="btn-cookie btn-sm "
                        data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}


export default EmployeesListItem;