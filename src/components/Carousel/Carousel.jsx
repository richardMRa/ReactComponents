import React, { useState } from 'react';
import './Carousel.css';

const Carousel = (props) => {
    const images = props.images;
    const [state, setState] = useState(
        {
            currentIndex: 0,
            isTransitioning: false,
            goingLeft: false
        }
    );
    const { currentIndex, isTransitioning, goingLeft } = state;

    const showPrevSet = () => {
        if (currentIndex > 0) {
            setState({ currentIndex: currentIndex - 1 });
            return
        }
        setState({ currentIndex: images.length - 1 });
    }

    const showNextSet = () => {
        if (currentIndex < images.length - 1) {
            setState({ currentIndex: currentIndex + 1 });
            return
        }
        setState({ currentIndex: 0 });
    }
    return (
        <div className='carousel-wrapper'>
            <div className='carousel-images-container'>
                {images.map((item, index, array) => {
                    let active = '';
                    if (index === currentIndex) {
                        active = '.active'
                    }
                    console.log(index)
                    console.log('carousel-img' + active)
                    return <img src={item} key={`image:${index}`} className={'carousel-img' + active} />
                })}

            </div>
            <div className='carousel-index-container'>
                <div className='carousel-index'>
                    {`${currentIndex + 1} / ${images.length}`}
                </div>
            </div>

            <button className="carousel-button prev" onClick={showPrevSet}><span>{'<'}</span></button>
            <button className="carousel-button next" onClick={showNextSet}><span>{'>'}</span></button>

        </div>

    )
}

export default Carousel;
