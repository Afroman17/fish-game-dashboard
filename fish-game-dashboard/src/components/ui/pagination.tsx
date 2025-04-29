import clsx from "clsx";
import Button from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstPlayer: number;
  indexOfLastPlayer: number;
  playersCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  indexOfFirstPlayer,
  indexOfLastPlayer,
  playersCount,
  onPageChange,
}: PaginationProps) => {
  const goToNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));
  const goToPrevPage = () => onPageChange(Math.max(currentPage - 1, 1));

  return (
    <div className="flex flex-col-reverse gap-2 sm:gap-0 sm:flex-row justify-between items-center mt-4">
      <div className="text-sm text-gray-500">
        Showing {indexOfFirstPlayer + 1}-
        {Math.min(indexOfLastPlayer, playersCount)} of {playersCount} players
      </div>
      <div className="flex gap-2">
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          label="<"
          labelClassName="text-smxº"
        />

        <div className="flex">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                size="sm"
                variant="outline"
                className={clsx(
                  "w-8 h-8 p-0 mx-0.5",
                  currentPage === pageNum && " border-solid border-4"
                )}
                label={pageNum.toString()}
                labelClassName="text-sm"
              />
            );
          })}
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          label=">"
          labelClassName="text-sm"
        />
      </div>
    </div>
  );
};

export default Pagination;
