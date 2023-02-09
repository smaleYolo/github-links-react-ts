import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    const clearHandler = () => {
        setSearch('')
        setDropdown(false)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600'>Something went wrong...</p>}

            <div className='relative w-[560px] mx-4'>
                <div className='flex justify-between gap-2 mb-2 content-center'>
                    <input
                        type="text"
                        className='border rounded-md py-2 px-4 w-full h-[42px] mb-2 hover:shadow-md transition'
                        placeholder='Search for Github username... smaleYolo for check mine)'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={clearHandler}
                        className='border-2 bg-gray-300 text-center border-gray-400 text-gray-500 text-2xl
                    hover:text-red-500 hover:border-red-400 hover:bg-red-100 transition-all h-[40px] w-[40px] rounded-md'>
                        &times;
                    </button>
                </div>

                {dropdown && <ul
                    className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white rounded-md'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className='py-2 px-4 hover:bg-gray-300 hover:rounded-md hover:font-bold transition-all cursor-pointer'
                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}

                <div className="container">
                    { areReposLoading && <p className='text-center'>Repos are loading...</p>}
                    { repos?.map(repo => <RepoCard key={repo.id} repo={repo}/>)}
                </div>

            </div>
        </div>
    );
};

export default HomePage;