export function multiFilterText(filter, val) {
    if (filter === '' || typeof val !== 'string') {
        return true;
    }
    if (filter === '-') {
        // match fields which are empty
        return (!val || val === '')
    } else if (filter === '--') {
        // match fields which are non empty
        return (val.length)
    }
    // '-' in front means exclusion
    let exclusive = filter.indexOf('-') === 0;
    if (exclusive) {
        filter = filter.substr(1)
    }
    let filters = filter.toLowerCase().split(',');
    for (let filterInd in filters) {
        let filterStr = filters[filterInd].trim();
        if (filterStr === '') {
            continue;
        }
        if (val.toLowerCase().includes(filterStr)) {
            return !exclusive
        }
    }
    return exclusive;
}
