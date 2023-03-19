import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  return (
    <div
      tabIndex={0}
      className="w-min-[200px] group flex max-w-[80%] items-center overflow-hidden rounded-[3px] bg-zinc-700 px-2 text-white focus-within:flex-1 focus-within:border focus-within:border-cyan-400 focus-within:bg-white">
      <label className="flex w-full items-center">
        <div className="flex w-[20px] shrink-0 justify-center">
          <BsSearch size={14} className="cursor-pointer group-focus-within:text-black" />
        </div>
        <input
          type="search"
          placeholder="Tìm kiếm"
          className="h-full w-full bg-transparent px-2 py-2 text-[14px] placeholder:text-white focus:w-full focus:text-black focus:outline-none"
        />
      </label>
    </div>
  );
};

export default Search;
