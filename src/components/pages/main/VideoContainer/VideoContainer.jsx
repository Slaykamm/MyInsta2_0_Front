import React from 'react'
import MovieDispatch from './MovieDispatch/MovieDispatch.tsx'
import cl from './VideoContainer.module.css'
import { clearDeletedVideo } from '../../../../services/filterQuery'

function VideoContainer({
    listFiles, 
    filteredVideo, 
    deleteMode, 
    addToSetListFilesVideosToDelete,
    deleteFromSetListFilesVideosToDelete,
    ...props
}) {

    const clearedVideo = clearDeletedVideo(filteredVideo)

    //video.title === video.description && isNumber(video.description) 

//    console.log('filteredVideo', filteredVideo)
    return (
        <>
        <div className={cl.BaseLayer}>
            <div className={cl.BaseFrame}>
                { listFiles ? 
                    <div className="container">
                        <div className="row">
                            { clearedVideo.map(video =>
                                <div key={video.id} className="col-6 col-md-4">
                                        <MovieDispatch 
                                            url={video.image} 
                                            id={video.id} 
                                            title={video.title} 
                                            description={video.description}
                                            create_at={video.create_at} 
                                            author={video.author}
                                            deleteMode={deleteMode}
                                            addToSetListFilesVideosToDelete={addToSetListFilesVideosToDelete}
                                            deleteFromSetListFilesVideosToDelete={deleteFromSetListFilesVideosToDelete}
                                        />      
                                </div>
                            )}
                        </div>
                    </div>
                : <p>Waiting for Data</p>
                }
            </div>
        </div>
        </>

    )
}

export default VideoContainer
