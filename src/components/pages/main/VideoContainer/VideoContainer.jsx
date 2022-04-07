import React from 'react'
import MovieDispatch from '../../MovieDispatch/MovieDispatch'
import cl from './VideoContainer.module.css'

function VideoContainer({listFiles, filteredVideo,  ...props}) {

//    console.log('listFiles', listFiles)
//    console.log('filteredVideo', filteredVideo)
    return (
        <>
        <div className={cl.BaseLayer}>
            <div className={cl.BaseFrame}>
                { listFiles ? 
                    <div className="container">
                        <div className="row">
                            { filteredVideo.map(video =>
                                <div key={video.id} className="col-6 col-md-4">
                                        <MovieDispatch url={video.image} id={video.id} title={video.title} create_at={video.create_at} author={video.author}/>      
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
