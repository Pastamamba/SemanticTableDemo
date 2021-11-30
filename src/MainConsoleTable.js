import React, {useRef, useMemo} from 'react'
import "./mainConsole.css";
import {
    useTable,
    usePagination,
    useFilters,
    useSortBy,
} from 'react-table';
import {ColumnFilter} from "./ColumnFilter";
import {multiFilterText} from "./FilterText";

export const MainConsoleTable = ({columns, data}) => {
    const tableContent = useRef(null);
    const tableHeader = useRef(null);
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])
    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? multiFilterText(String(filterValue), String(rowValue))
                        : true
                })
            },
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        setPageSize,
        canPreviousPage,
        pageOptions,
        state,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: {pageSize: 30},
        },
        useFilters,
        useSortBy,
        usePagination,
    )
    const {pageIndex, pageSize} = state

    return (
        <>
            <div>
                <div>

                </div>
            </div>
            <div>
                <span>
                    Page{''}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [30, 10, 20, 40, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button className={'previous-next-buttons'} onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <p>{rows.length}</p>
            </div>
            <table {...getTableProps()}>
                <thead ref={tableHeader}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '+' : '-') : ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}
                       ref={tableContent}
                >
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
