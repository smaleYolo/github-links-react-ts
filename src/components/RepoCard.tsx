import React from 'react';
import {IRepo} from "../models/models";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

type RepoCardProps =  {
    repo: IRepo
}

const RepoCard = ({ repo }: RepoCardProps) => {

    const { favorites } = useAppSelector(state => state.github)

    console.log(favorites)


    const {addFavorite, removeFavorites} = useActions()

    const onAddFavorite = () => {
        addFavorite(repo)
    }

    const onRemoveFavorite = () => {
        removeFavorites(repo.id)
    }



    return (
        <>
            <div className='flex justify-between items-center border bg-white py-3 px-5 rounded-md mb-2 hover:scale-105 transition-all'>

                <div className='max-w-[70%]'>
                    <a href={repo.html_url} target='_blank'>
                        <h2 className='text-lg font-bold hover:text-blue-600 transition-all'>{repo.full_name}</h2>
                    </a>
                    <p className='text-sm'>
                        Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                        Watchers: <span className='font-bold mr-2'>{repo.watchers}</span>
                    </p>
                    <p className='text-sm font-thin'>
                        {repo?.description}
                    </p>
                    {repo.has_pages && <p>
                        Pages: <a href={`https://${repo.owner.login}.github.io/${repo.name}/`}
                                  className='font-bold hover:text-blue-600 transition-all'
                                  target='_blank'
                    >
                        {repo.name}
                    </a>
                    </p>}
                </div>

                <div className='flex items-center gap-3'>
                    {favorites.find(fav => fav.id === repo.id)
                        ? <AiFillStar onClick={onRemoveFavorite} size={30} color='gold' className='cursor-pointer'/>
                        : <AiOutlineStar onClick={onAddFavorite} size={30} color='gold' className='cursor-pointer'/>
                    }
                    <a href={repo.owner.html_url} target='_blank'>
                        <img src={repo.owner.avatar_url} alt="/" height={50} width={50} className='object-cover border-2 rounded-md'/>
                    </a>
                </div>
            </div>

        </>

    );
};

export default RepoCard;