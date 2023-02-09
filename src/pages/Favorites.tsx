import React from 'react';
import {useAppSelector} from "../hooks/redux";
import RepoCard from "../components/RepoCard";

const Favorites = () => {
    const {favorites} = useAppSelector(state => state.github)

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>

            <div className='container px-4'>
                <h1 className='text-3xl mb-4 text-center'>Favorites</h1>
                {!favorites.length && <p className='text-center'>There are no favorite repos here for now.</p>}

                {
                    favorites?.map(repo => <RepoCard key={repo.id} repo={repo}/>)
                }
            </div>
        </div>
    );
};

export default Favorites;