import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [noOfGuests, setNoOfGuests] = useState(1);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = { startDate, endDate, key: "selection" };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white dark:bg-gray-900 shadow-md p-5 md:px-10 ">
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://res.cloudinary.com/moh-x/image/upload/v1628243962/projects/airbnb/Airbnb_Logo_B%C3%A9lo.svg_be1egb.png"
          alt=""
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="flex items-center md:border-2 md:dark:border-gray-200 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 dark:text-gray-200 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 dark:bg-gray-100 text-white dark:text-red-600 rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex items-center justify-end space-x-4 text-gray-500 dark:text-gray-200">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="hidden sm:inline-flex h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>

          <div className="flex">
            <button
              onClick={() => setSearchInput("")}
              className="flex-grow text-gray-500"
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
