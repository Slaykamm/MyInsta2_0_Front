import { isNumber } from 'lodash'

export function filterQuery(listFiles, searchQuery) {
    
    if (listFiles && searchQuery.length > 2 ){
        var filtered = listFiles.filter(title=>
        {
                if (title.title){
                    return (title.title).toLowerCase().includes(searchQuery.toLowerCase())
                }
                if (title.username){
                    return (title.username).toLowerCase().includes(searchQuery.toLowerCase()) 
                }

        })
        return filtered
    }
    else {
        return listFiles
    }
}


export function clearDeletedVideo(listFiles) {
    if (listFiles){
        var filtered = listFiles.filter(file=>
            {
                if (file.title !== file.description &&  !isNumber(file.title)){
                    return (file.title)
                }
        })
        return filtered
    }
    else {
        return listFiles
    }
}



