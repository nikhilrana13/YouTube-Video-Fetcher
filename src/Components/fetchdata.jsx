
import axios from 'axios';
import React, { useState } from 'react';
import '../index.css'

function Fetchdata() {
    const [input, setsearchInput] = useState('');
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (input.trim() === '') {
            alert('Please enter a video ID');
            return;
        }

        setLoading(true);  // Start loading
        setError('');      // Reset any previous error
        setVideo(null);    // Clear previous video data
        await fetchVideodata(input);
    };

    const fetchVideodata = async (input) => {
        const options = {
            method: 'GET',
            url: 'https://yt-api.p.rapidapi.com/dl',
            params: { id: input },
            headers: {
                'x-rapidapi-key': '7c4fa6fe7emsh71e95b91cf2b31ap152661jsn4684e92fe08f', // Use your actual API key
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            if (response.data && response.data.thumbnail) {
                setVideo(response.data); // Set the video data if response is valid
                setError('');            // Clear any previous errors
            } else {
                // Handle case where response is valid but video not found
                setError('Invalid video ID or video not found.');
            }
        } catch (error) {
            console.error(error);
            setError('Invalid video ID or video not found.'); // Handle API errors
        } finally {
            setLoading(false); // Stop loading no matter what
        }
    };

    return (
        <div className=' w-full flex flex-col items-center'>
            <div className='input-field w-full flex flex-col sm:flex-row items-center gap-5 h-full'>
                <input
                    className=' flex-1 w-full sm:w-[500px] h-14 rounded-full px-4 border border-gray-300'
                    type='text'
                    placeholder='Enter YouTube video ID'
                    value={input}
                    onChange={(e) => setsearchInput(e.target.value)}
                />
                <button onClick={handleSearch} className='w-full h-10 sm:w-[100px] rounded-full bg-black text-white'>
                    Search
                </button>
            </div>

            <div className='w-full h-full mt-2 p-3 gap-3'>
                {loading ? (
                    <div>
                        <p className='text-[1rem] text-center font-[600]'>Loading...</p>
                    </div>
                ) : error ? (
                    <div>
                        <p className='text-[1rem] text-center font-[600]'>{error}</p>
                    </div>
                ) : (
                    video && (
                        <div className='flex flex-col gap-5 p-2'>
                            {video.thumbnail && video.thumbnail.length > 0 && (
                                <img className='rounded-lg' src={video.thumbnail[3].url} alt='thumbnail' />
                            )}
                            <p className='text-sm font-[500]'>{video.title}</p>
                            <span>
                                <a
                                    className='border-none rounded-[25px] bg-blue-800 text-white p-3 text-[.75rem] hover:bg-blue-600 transition duration-300'
                                    href={video.formats[0].url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Download Link
                                </a>
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Fetchdata;


