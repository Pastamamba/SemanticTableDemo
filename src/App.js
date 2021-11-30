import _ from 'lodash'
import React from 'react'
import './App.css'
import './mainConsole.css'
import {MainConsoleTable} from "./MainConsoleTable";
import SemanticPagination from "./SemanticPagination";

const tableDataa = [
    {
        name: 'Alva',
        state: 'ACT',
        date: '20.10.2021',
        test: 'Puu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.8.2021',
        test: 'Kuu',
    },
    {
        name: 'OOMI',
        state: 'ACT',
        date: '1.10.2021',
        test: 'Duu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2010',
        test: 'Suu',
    },
    {
        name: 'Alva',
        state: 'DIS',
        date: '10.10.2021',
        test: 'Jaa',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2017',
        test: 'Luu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2009',
        test: 'Tuu',
    },

    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2010',
        test: 'Suu',
    },
    {
        name: 'Alva',
        state: 'DIS',
        date: '10.10.2021',
        test: 'Jaa',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2017',
        test: 'Luu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2009',
        test: 'Tuu',
    },

    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2010',
        test: 'Suu',
    },
    {
        name: 'Alva',
        state: 'DIS',
        date: '10.10.2021',
        test: 'Jaa',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2017',
        test: 'Luu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2009',
        test: 'Tuu',
    },

    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2010',
        test: 'Suu',
    },
    {
        name: 'Alva',
        state: 'DIS',
        date: '10.10.2021',
        test: 'Jaa',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2017',
        test: 'Luu',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2009',
        test: 'Tuu',
    },

    {
        name: 'Elenia',
        state: 'ACT',
        date: '01.10.2009',
        test: 'Suu',
    },
    {
        name: 'Alva',
        state: 'DIS',
        date: '10.10.2011',
        test: 'Dee',
    },
    {
        name: 'Elenia',
        state: 'ACT',
        date: '20.10.2014',
        test: 'Tee',
    },
    {
        name: 'Oomi',
        state: 'ACT',
        date: '20.11.2009',
        test: 'Tuu',
    },
]

const columns = [{
    Header: "Users",
    columns: [
        {
            Header: "Name",
            accessor: 'name',
            filter: 'text',
            disableSortBy: true,
        },
        {
            Header: "State",
            accessor: 'state',
            filter: 'text',
            disableSortBy: true,
        },
        {
            Header: "Date",
            accessor: 'date',
            filter: 'text',
            disableSortBy: true,
        },
        {
            Header: "Info",
            accessor: 'test',
            filter: 'text',
            disableSortBy: true,
        },
    ]
}];
const tableData = [
    { name: 'Elenia', state: 'ACT', age: 15, gender: 'Testi' },
    { name: 'Fingrid', state: 'ACT', age: 40, gender: 'Pesti' },
    { name: 'Oomi', state: 'ACT', age: 25, gender: 'Kesti' },
    { name: 'Alva', state: 'ACT', age: 70, gender: 'Lesti' },
]

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            }
        default:
            throw new Error()
    }
}

function TableExampleSortable() {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        column: null,
        data: tableData,
        direction: null,
    })
    const { column, data, direction } = state

    return (
        <div>
        <table className={'semantic-table'}>
            <thead>
                <tr className={'table-row'}>
                    <th className={'table-header'}
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >
                        Name
                    </th>
                    <th className={'table-header'}
                        sorted={column === 'state' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'state' })}
                    >
                        State
                    </th>
                    <th className={'table-header'}
                        sorted={column === 'age' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'age' })}
                    >
                        Age
                    </th>
                    <th className={'table-header'}
                        sorted={column === 'gender' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'gender' })}
                    >
                        Test
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ age, state, gender, name }) => (
                    <tr key={name}>
                        <td className={'table-cell'}>{name}</td>
                        <td className={'table-cell'}>{state}</td>
                        <td className={'table-cell'}>{age}</td>
                        <td className={'table-cell'}>{gender}</td>

                    </tr>
                ))}
            </tbody>
        </table>


            <br/>
            <br/>
            <br/>
            <div className={'padding'}>
            <MainConsoleTable
                columns={columns}
                data={tableDataa}
                row = "SomeView"
            />
            </div>

            <br/>
            <div className={'semantic'}>
                <p>Asd</p>
            <SemanticPagination/>
            </div>
            </div>
    )
}

export default TableExampleSortable
