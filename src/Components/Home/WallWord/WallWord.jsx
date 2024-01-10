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
            <div class="wrap">
                <div class="line">
                    <div class="left">
                        <div class="content">
                            <span class="spanSlow">Creativity</span>
                        </div>
                    </div><div class="right">
                        <div class="content">
                            <span class="spanSlow">Creativity</span>
                        </div>
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        <div class="content">
                            <span class="spanSlow">Never</span>
                        </div>
                    </div><div class="right">
                        <div class="content">
                            <span class="spanSlow">Never</span>
                        </div>
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        <div class="content">
                            <span class="spanFast">End</span>
                        </div>
                    </div><div class="right">
                        <div class="content">
                            <span class="spanFast">End</span>
                        </div>
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        <div class="content">
                            <span class="spanSlow">WITH-US</span>
                        </div>
                    </div><div class="right">
                        <div class="content">
                            <span class="spanSlow">WITH-US</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default WallWord