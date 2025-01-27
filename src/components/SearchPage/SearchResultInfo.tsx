import { Link } from "react-router-dom";

type Props = {
    total: number;
    city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
    return (
        <div className="text-xl font-bold flex flex-col md:flex-row md:items-center gap-1   ">
            <p className="mb- lg:mb-0">
                {total} Restaurants found in <span className="">{city}</span>
            </p>
            <Link
                to="/"
                className="text-sm font-semibold underline cursor-pointer text-blue-500"
            >
                Change Location
            </Link>
        </div>
    );
};

export default SearchResultInfo;
