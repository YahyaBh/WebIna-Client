import React, { useEffect } from 'react'
import './WallWord.scss'

const WallWord = () => {


    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleWindowResize);

        const spansSlow = document.querySelectorAll('.spanSlow');
        const spansFast = document.querySelectorAll('.spanFast');

        let width = window.innerWidth;

        function handleMouseMove(e) {
            let normalizedPosition = e.pageX / (width / 2) - 1;
            let speedSlow = 100 * normalizedPosition;
            let speedFast = 200 * normalizedPosition;
            spansSlow.forEach((span) => {
                span.style.transform = `translate(${speedSlow}px)`;
            });
            spansFast.forEach((span) => {
                span.style.transform = `translate(${speedFast}px)`
            })
        }
        //we need to recalculate width when the window is resized
        function handleWindowResize() {
            width = window.innerWidth;
        }
    }, [])

    return (


        <div className='wall-container'>
            <div className="wrap">
                <div className="line">
                    <div className="left">
                        <div className="content">
                            <span className="spanSlow">Creativity</span>
                        </div>
                    </div><div className="right">
                        <div className="content">
                            <span className="spanSlow">Creativity</span>
                        </div>
                    </div>
                </div>
                <div className="line">
                    <div className="left">
                        <div className="content">
                            <span className="spanSlow">Never</span>
                        </div>
                    </div><div className="right">
                        <div className="content">
                            <span className="spanSlow">Never</span>
                        </div>
                    </div>
                </div>
                <div className="line">
                    <div className="left">
                        <div className="content">
                            <span className="spanFast">End</span>
                        </div>
                    </div><div className="right">
                        <div className="content">
                            <span className="spanFast">End</span>
                        </div>
                    </div>
                </div>
                <div className="line">
                    <div className="left">
                        <div className="content">
                            <span className="spanSlow">WITH-US</span>
                        </div>
                    </div><div className="right">
                        <div className="content">
                            <span className="spanSlow">WITH-US</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default WallWord