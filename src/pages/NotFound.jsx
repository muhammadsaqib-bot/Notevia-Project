import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        }))

        let animId
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(67, 24, 255, ${p.alpha})`
                ctx.fill()
                p.x += p.dx
                p.y += p.dy
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1
            })
            animId = requestAnimationFrame(draw)
        }
        draw()

        const onResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', onResize)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

                .nf-root {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    background: #F4F7FE;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                }

                .orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(70px);
                    pointer-events: none;
                    animation: drift 8s ease-in-out infinite alternate;
                }
                .orb-1 {
                    width: 420px; height: 420px;
                    background: radial-gradient(circle, rgba(67,24,255,0.18), transparent 70%);
                    top: -100px; left: -100px;
                    animation-delay: 0s;
                }
                .orb-2 {
                    width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(99,66,255,0.14), transparent 70%);
                    bottom: -80px; right: -80px;
                    animation-delay: -4s;
                }
                .orb-3 {
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(163,174,208,0.25), transparent 70%);
                    top: 40%; left: 60%;
                    animation-delay: -2s;
                }

                @keyframes drift {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(40px, 30px) scale(1.08); }
                }

                .nf-card {
                    position: relative;
                    z-index: 10;
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(67,24,255,0.08);
                    border-radius: 28px;
                    padding: 56px 52px 52px;
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 8px 40px rgba(67,24,255,0.08), 0 2px 8px rgba(0,0,0,0.04);
                    animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(40px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                .nf-number {
                    font-family: 'Syne', sans-serif;
                    font-size: 130px;
                    font-weight: 800;
                    line-height: 1;
                    letter-spacing: -8px;
                    background: linear-gradient(135deg, #4318FF 0%, #868CFF 60%, #c7d0ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: numberPop 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both;
                    position: relative;
                    display: inline-block;
                    user-select: none;
                }

                .nf-number::after {
                    content: '404';
                    position: absolute;
                    inset: 0;
                    font-family: 'Syne', sans-serif;
                    font-size: 130px;
                    font-weight: 800;
                    letter-spacing: -8px;
                    -webkit-text-fill-color: transparent;
                    -webkit-text-stroke: 1.5px rgba(67,24,255,0.12);
                    transform: translate(4px, 6px);
                    z-index: -1;
                    background: none;
                    background-clip: unset;
                }

                @keyframes numberPop {
                    from { opacity: 0; transform: scale(0.7); }
                    to   { opacity: 1; transform: scale(1); }
                }

                .nf-astro {
                    font-size: 52px;
                    display: block;
                    animation: float 3.5s ease-in-out infinite, fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;
                    margin: 8px auto 16px;
                    filter: drop-shadow(0 8px 16px rgba(67,24,255,0.15));
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(-3deg); }
                    50%       { transform: translateY(-12px) rotate(3deg); }
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .nf-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                    color: #1B2559;
                    margin: 0 0 10px;
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both;
                }

                .nf-sub {
                    font-size: 14px;
                    color: #A3AED0;
                    line-height: 1.75;
                    margin: 0 0 32px;
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
                }

                .nf-dots {
                    display: flex;
                    gap: 6px;
                    justify-content: center;
                    margin-bottom: 28px;
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both;
                }
                .nf-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #E6EDFF;
                }
                .nf-dot.active {
                    background: #4318FF;
                    width: 20px;
                    border-radius: 3px;
                }

                .nf-btn {
                    display: block;
                    width: 100%;
                    padding: 14px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #4318FF, #6547ff);
                    color: white;
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    text-decoration: none;
                    letter-spacing: 0.2px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 4px 20px rgba(67,24,255,0.3);
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both;
                }
                .nf-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(67,24,255,0.4);
                }
                .nf-btn:active {
                    transform: translateY(0);
                }

                .nf-back {
                    display: inline-block;
                    margin-top: 16px;
                    font-size: 13px;
                    color: #A3AED0;
                    text-decoration: none;
                    transition: color 0.2s;
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s both;
                }
                .nf-back:hover { color: #4318FF; }

                .nf-tag {
                    display: inline-block;
                    background: #F0EFFE;
                    color: #4318FF;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    padding: 4px 12px;
                    border-radius: 20px;
                    margin-bottom: 16px;
                    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both;
                }

                .nf-canvas {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 1;
                }
            `}</style>

            <div className="nf-root">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                <canvas ref={canvasRef} className="nf-canvas" />

                <div className="nf-card">

                    <div className="nf-number">404</div>

                    <span className="nf-astro">🚀</span>

                    <span className="nf-tag">Error 404</span>

                    <h1 className="nf-title">Page Not Found</h1>

                    <p className="nf-sub">
                        Oops! Looks like this page drifted into deep space.<br />
                        Let's get you back to your journals.
                    </p>

                    <div className="nf-dots">
                        <div className="nf-dot active" />
                        <div className="nf-dot" />
                        <div className="nf-dot" />
                    </div>

                    <Link to='/' className='nf-btn'>
                        ← Back to Home
                    </Link>



                </div>
            </div>
        </>
    )
}

export default NotFound
