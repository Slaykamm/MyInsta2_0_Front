export function filterQuery(listFiles, searchQuery) {
    
    if (listFiles && searchQuery.length > 2 ){
        var filtered = listFiles.filter(title=>
        {
            return(
                (title.title).toLowerCase().includes(searchQuery.toLowerCase())
            )
        })
       
        return filtered
    }
    else {
        return listFiles
    }
}
