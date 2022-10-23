import "./app-filter.css";

const AppFilter = (props) => {

    const btnsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'}
    ];

    const btns = btnsData.map(({name, label}, i) => {
        const active = name === props.filter ? 'btn-light' : 'btn-outline-light';

        return (
            <button 
                key={i}
                type="button"
                className={`btn ${active}`}
                name={name}
                onClick={() => props.onFilterUpdate(name)}>
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {btns}
        </div>
    )
}

export default AppFilter;