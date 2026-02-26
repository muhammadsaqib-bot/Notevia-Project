import React from 'react'
import happyEmoji from '../assets/emoji.PNG';
import sadEmoji from '../assets/sad.PNG';
import neutralEmoji from '../assets/neutral.PNG';

const Card = ({ title, date, mood, content, tags, emoji, eye, write, del }) => {
    const moodEmojis = {
        "Happy": happyEmoji,
        "Calm": happyEmoji,
        "Neutral": neutralEmoji,
        "Sad": sadEmoji
    };

    return (
        <div className="w-full">
            <div className="bg-white p-4 md:p-6 rounded-2xl mb-4 shadow-sm h-full">
                <div className="flex justify-between mb-2 flex-wrap gap-2">
                    <div>
                        <h3 className="font-semibold text-[#2B3674]">{title}</h3>
                        <p className="text-xs text-[#A3AED0] font-[500]">{date}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#F4F7FE] px-2 py-1 rounded-full text-sm">
                        <img src={moodEmojis[mood] || emoji} alt="" className="w-4 h-4 object-contain" />
                        {mood}
                    </div>
                </div>

                <p className="text-sm text-[#A3AED0] mb-2">
                    "{content?.substring(0, 60)}..."
                </p>
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex gap-2 text-xs text-[#A3AED0] flex-wrap">
                        {tags?.map((tag, index) => (
                            <span key={index} className="bg-[#F4F7FE] px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>


                    <div className="flex gap-2">
                        <img src={eye} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                        <img src={write} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                        <img src={del} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
