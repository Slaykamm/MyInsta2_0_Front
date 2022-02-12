export function filterQuery(listFiles, searchQuery) {
    if (listFiles && searchQuery.length > 2 ){
        var filtered = listFiles.filter(title=>title.title.includes(searchQuery))


        return filtered
    }
    else {
        return listFiles
    }
}
